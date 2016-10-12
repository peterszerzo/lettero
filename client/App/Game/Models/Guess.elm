module Game.Models.Guess exposing (..)

import Time exposing (Time)
import Json.Encode as JE
import Json.Decode as JD exposing (Decoder, (:=), object2)

type GuessValue = Pending | Idle | Made Int

type alias Guess =
  { value : GuessValue
  , time : Time
  }

getDummy : String -> Guess
getDummy s =
  { value = Pending
  , time = 0
  }


-- Helpers

isCorrect : Guess -> Bool
isCorrect guess =
  guess.value == Made 0

isIncorrect : Guess -> Bool
isIncorrect guess =
  case guess.value of
    Pending -> False
    Idle -> True
    Made i -> i /= 0


-- Encoders

guessEncoder : Guess -> JE.Value
guessEncoder {value, time} =
  let
    encodedValue = case value of
      Pending -> JE.string "pending"
      Idle -> JE.string "idle"
      Made i -> JE.int i
  in
    JE.object
      [ ("value", encodedValue)
      , ("time", JE.float time)
      ]

encodeGuess : Guess -> String
encodeGuess guess =
  guess
    |> guessEncoder
    |> JE.encode 0


-- Decoders

guessDecoder : Decoder Guess
guessDecoder =
  object2 Guess
    ("value" := JD.oneOf [JD.int `JD.andThen` (\i -> Made i |> JD.succeed), JD.string `JD.andThen` (\s -> if s == "pending" then JD.succeed Pending else JD.succeed Idle)])
    ("time" := JD.float)