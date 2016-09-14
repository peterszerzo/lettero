module Models.PlayerStatusUpdate exposing (..)

import Json.Encode exposing (encode, object, string, null, int, float, bool)

import Models.Guess exposing (Guess, guessEncoder)

type alias PlayerStatusUpdate =
  { roomId : String
  , playerId : String
  , round : Int
  , guess : Maybe Guess
  , isReady : Bool
  }

encodePlayerStatusUpdate : PlayerStatusUpdate -> String
encodePlayerStatusUpdate {roomId, playerId, round, guess, isReady} =
  let
    encodedGuess = case guess of
      Just guess' ->
        guessEncoder guess'
      Nothing ->
        null
  in
    object
      [ ("roomId", string roomId)
      , ("playerId", string playerId)
      , ("round", int round)
      , ("guess", encodedGuess)
      , ("isReady", bool isReady)
      ]
      |> encode 0
