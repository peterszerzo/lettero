module Game.Models.Player exposing (..)

import Json.Decode exposing (Decoder, (:=), object5, maybe, string, int, float, bool, list)
import Json.Encode as JE
import Game.Models.Guess as Guess


type alias PlayerId =
    String


type alias Player =
    { id : PlayerId
    , roomId : String
    , score : Int
    , guess : Guess.Guess
    , isReady : Bool
    }



-- Helpers


getDummy : String -> Player
getDummy t =
    Player "apples" "pears" 0 (Guess.getDummy "") False



-- Assumes the player is always found


findById : PlayerId -> List Player -> Player
findById playerId players =
    players
        |> List.filter ((==) playerId << .id)
        |> List.head
        |> Maybe.withDefault (getDummy "")


areAllReady : List Player -> Bool
areAllReady players =
    players
        |> List.map (.isReady)
        |> List.foldl (&&) True


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


getWinnerId : List Player -> Maybe String
getWinnerId players =
    players
        |> List.filter hasCorrectGuess
        |> List.sortWith compareByGuessTime
        |> List.head
        |> Maybe.map (.id)


isDraw : List Player -> Bool
isDraw players =
    players
        |> List.map hasIncorrectGuess
        |> List.foldl (&&) True



-- Decoders


playerDecoder : Decoder Player
playerDecoder =
    object5 Player
        ("id" := string)
        ("roomId" := string)
        ("score" := int)
        ("guess" := Guess.guessDecoder)
        ("isReady" := bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    list playerDecoder



-- Encoders


encodePlayer : Player -> String
encodePlayer { id, roomId, score, guess, isReady } =
    JE.object
        [ ( "roomId", JE.string roomId )
        , ( "id", JE.string id )
        , ( "score", JE.int score )
        , ( "guess", Guess.guessEncoder guess )
        , ( "isReady", JE.bool isReady )
        ]
        |> JE.encode 0
