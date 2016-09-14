module Models.Player exposing (..)

import Json.Decode exposing (Decoder, (:=), object4, maybe, string, int, float, bool, list)

import Models.Guess exposing (Guess, guessDecoder)

type alias PlayerId = String

type alias Player =
  { id : PlayerId
  , score : Int
  , guess : Maybe Guess
  , isReady : Bool
  }

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

areAllReady : (List Player) -> Bool
areAllReady players =
  players
    |> List.map (.isReady)
    |> List.foldl (&&) True
