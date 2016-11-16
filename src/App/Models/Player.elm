module Models.Player exposing (..)

import Dict
import Json.Decode as JD exposing (field, map5)
import Json.Encode as JE
import Models.Guess as Guess


type alias Player =
    { id : String
    , roomId : String
    , score : Int
    , guess : Guess.Guess
    , isReady : Bool
    }


type alias Players =
    Dict.Dict String Player



-- Helpers


getDummy : String -> Player
getDummy id_ =
    { id = id_
    , roomId = "pears"
    , score = 0
    , guess = Guess.getDummy ""
    , isReady = False
    }


unsafeFindById : String -> Players -> Player
unsafeFindById playerId players =
    players
        |> Dict.get playerId
        |> Maybe.withDefault (getDummy "")


toList : Players -> List Player
toList =
    (List.map Tuple.second) << Dict.toList


update : (Player -> Player) -> String -> Players -> Players
update fn playerId players =
    let
        player =
            unsafeFindById playerId players
    in
        Dict.insert playerId (fn player) players


areAllReady : Players -> Bool
areAllReady players =
    players
        |> toList
        |> List.map .isReady
        |> List.all identity


hasCorrectGuess : Player -> Bool
hasCorrectGuess =
    Guess.isCorrect << .guess


hasIncorrectGuess : Player -> Bool
hasIncorrectGuess =
    Guess.isIncorrect << .guess


compareByGuessTime : Player -> Player -> Order
compareByGuessTime player1 player2 =
    let
        time1 =
            player1.guess.time

        time2 =
            player2.guess.time
    in
        if (time1 - time2 < 0) then
            LT
        else
            (if time1 == time2 then
                EQ
             else
                GT
            )


getWinnerId : Players -> Maybe String
getWinnerId players =
    players
        |> toList
        |> List.filter hasCorrectGuess
        |> List.sortWith compareByGuessTime
        |> List.head
        |> Maybe.map (.id)


isDraw : Players -> Bool
isDraw players =
    players
        |> Dict.toList
        |> List.map Tuple.second
        |> List.map hasIncorrectGuess
        |> List.all identity


didSomeoneWin : Players -> Bool
didSomeoneWin players =
    (getWinnerId players) /= Nothing


didAllGuess : Players -> Bool
didAllGuess players =
    players
        |> toList
        |> List.map (Guess.isPending << .guess)
        |> List.any identity
        |> not



-- Decoders


playerDecoder : JD.Decoder Player
playerDecoder =
    JD.map5 Player
        (JD.field "id" JD.string)
        (JD.field "roomId" JD.string)
        (JD.field "score" JD.int)
        (JD.field "guess" Guess.guessDecoder)
        (JD.field "isReady" JD.bool)


playersDecoder : JD.Decoder Players
playersDecoder =
    JD.dict playerDecoder



-- Encoders


playerEncoder : Player -> JE.Value
playerEncoder { id, roomId, score, guess, isReady } =
    JE.object
        [ ( "roomId", JE.string roomId )
        , ( "id", JE.string id )
        , ( "score", JE.int score )
        , ( "guess", Guess.guessEncoder guess )
        , ( "isReady", JE.bool isReady )
        ]


playersEncoder : Players -> JE.Value
playersEncoder players =
    players
        |> Dict.toList
        |> List.map (\( key, player ) -> ( key, playerEncoder player ))
        |> JE.object


encodePlayer : Player -> String
encodePlayer =
    (JE.encode 0) << playerEncoder


encodePlayers : Players -> String
encodePlayers =
    (JE.encode 0) << playersEncoder
