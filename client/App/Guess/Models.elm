module Guess.Models exposing (..)

import Time exposing (Time)
import Json.Encode as Encode exposing (encode, object)
import Json.Decode as Decode exposing (Decoder, (:=), object2)

type alias GuessValue = Int

type alias Guess =
  { value : GuessValue
  , time : Time
  }

guessEncoder {value, time} =
  object
    [ ("value", Encode.int value)
    , ("time", Encode.float time)
    ]

encodeGuess : Guess -> String
encodeGuess guess =
  guess
    |> guessEncoder
    |> encode 0

guessDecoder : Decoder Guess
guessDecoder =
  object2 Guess
    ("value" := Decode.int)
    ("score" := Decode.float)
