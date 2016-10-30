module Models.RoundData exposing (..)

import Json.Decode exposing (Decoder, (:=), string, object1)

type alias RoundData =
  { word : String
  }


-- Decoders

roundDataDecoder : Decoder RoundData
roundDataDecoder =
  object1 RoundData
    ("word" := string)
