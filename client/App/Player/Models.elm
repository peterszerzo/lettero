module Player.Models exposing (..)

import Time exposing (Time)
import Json.Decode exposing (Decoder, (:=), object4, maybe, string, int, float, bool, list)

import Guess.Models exposing (Guess, guessDecoder)

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
