module Models.Player exposing (..)

import Json.Decode exposing (Decoder, (:=), object4, maybe, string, int, float, bool, list)

import Models.Guess exposing (Guess, isCorrect, guessDecoder)

type alias PlayerId = String

type alias Player =
  { id : PlayerId
  , score : Int
  , guess : Maybe Guess
  , isReady : Bool
  }


-- Helpers

areAllReady : (List Player) -> Bool
areAllReady players =
  players
    |> List.map (.isReady)
    |> List.foldl (&&) True

hasCorrectGuess : Player -> Bool
hasCorrectGuess player =
  case player.guess of
    Just guess ->
      isCorrect guess
    Nothing ->
      False

hasIncorrectGuess : Player -> Bool
hasIncorrectGuess player =
  case player.guess of
    Just guess ->
      not (isCorrect guess)
    Nothing ->
      False

compareByGuessTime : Player -> Player -> Order
compareByGuessTime player1 player2 =
  let
    time1 =
      player1.guess
        |> Maybe.map (.time)
        |> Maybe.withDefault -1
    time2 =
      player2.guess
        |> Maybe.map (.time)
        |> Maybe.withDefault -1
  in
    if (time1 - time2 < 0) then LT else (if time1 == time2 then EQ else GT)

getWinnerId : (List Player) -> Maybe PlayerId
getWinnerId players =
  players
    |> List.filter hasCorrectGuess
    |> List.sortWith compareByGuessTime
    |> List.head
    |> Maybe.map (.id)

isDraw : (List Player) -> Bool
isDraw players =
  players
    |> List.map hasIncorrectGuess
    |> List.foldl (&&) True


-- Decoders

playerDecoder : Decoder Player
playerDecoder =
  object4 Player
    ("id" := string)
    ("score" := int)
    (maybe ("guess" := guessDecoder))
    ("isReady" := bool)

playersDecoder : Decoder (List Player)
playersDecoder =
  list playerDecoder
