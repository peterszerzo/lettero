module PlayerStatusUpdate.Encoders exposing (..)

import Json.Encode exposing (encode, object, string, null, int)

import PlayerStatusUpdate.Models exposing (PlayerStatusUpdate)

encodePlayerStatusUpdate : PlayerStatusUpdate -> String
encodePlayerStatusUpdate {roomId, playerId, round, guess} =
  object
    [ ("roomId", string roomId)
    , ("playerId", string playerId)
    , ("round", int round)
    , ("guess", if guess == Nothing then null else int (Maybe.withDefault 0 guess))
    ]
    |> encode 0
