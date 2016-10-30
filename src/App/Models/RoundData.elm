module Models.RoundData exposing (..)

import Json.Decode as JD exposing ((:=))
import Json.Encode as JE

type alias RoundData =
  { word : String
  }

getDummy : String -> RoundData
getDummy s =
  { word = "hedgehog"
  }

-- Decoders

roundDataDecoder : JD.Decoder RoundData
roundDataDecoder =
  JD.object1 RoundData
    ("word" := JD.string)

-- Encoders

roundDataEncoder : RoundData -> JE.Value
roundDataEncoder { word } =
  JE.object
    [ ( "word", JE.string word )
    ]
