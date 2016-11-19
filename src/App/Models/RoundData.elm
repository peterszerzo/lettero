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


itemDecoder : JD.Decoder RoundData
itemDecoder =
    JD.map RoundData
        (JD.field "word" JD.string)


itemEncoder : RoundData -> JE.Value
itemEncoder { word } =
    JE.object
        [ ( "word", JE.string word )
        ]
