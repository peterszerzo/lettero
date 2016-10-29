module Game.Models.Player exposing (..)

import Dict
import Json.Decode as JD exposing ((:=))
import Json.Encode as JE

import Game.Models.Guess as Guess

type alias Player =
  { id : String
  , roomId : String
  , score : Int
  , guess : Guess.Guess
  , isReady : Bool
  }

type alias Players = Dict.Dict String Player


-- Helpers

getDummy : String -> Player
getDummy id' =
  { id = id'
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
  (List.map snd) << Dict.toList

update : (Player -> Player) -> String -> Players -> Players
update fn playerId players =
  let
    player = unsafeFindById playerId players
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
      (if time1 == time2 then EQ else GT)

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
    |> List.map snd
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
  JD.object5 Player
    ( "id" := JD.string )
    ( "roomId" := JD.string )
    ( "score" := JD.int )
    ( "guess" := Guess.guessDecoder )
    ( "isReady" := JD.bool )

playersDecoder : JD.Decoder Players
playersDecoder =
  JD.dict playerDecoder


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
