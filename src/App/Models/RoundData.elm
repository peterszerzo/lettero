module Models.RoundData exposing (..)

import Json.Decode as JD
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
    JD.map RoundData
        (JD.field "word" JD.string)



-- Encoders


roundDataEncoder : RoundData -> JE.Value
roundDataEncoder { word } =
    JE.object
        [ ( "word", JE.string word )
        ]
