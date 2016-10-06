module Models.Guess exposing (..)

import Time exposing (Time)
import Json.Encode as Encode exposing (Value, encode, object)
import Json.Decode as Decode exposing (Decoder, (:=), object2)

type alias GuessValue = Int

type alias Guess =
  { value : GuessValue
  , time : Time
  }


-- Helpers

isCorrect : Guess -> Bool
isCorrect guess =
  guess.value == 0


-- Encoders

guessEncoder : Guess -> Value
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


-- Decoders

guessDecoder : Decoder Guess
guessDecoder =
  object2 Guess
    ("value" := Decode.int)
    ("time" := Decode.float)
