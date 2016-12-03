module Models.GuessValue exposing (..)

import Json.Encode as JE
import Json.Decode as JD exposing (Decoder, map2)


type alias GuessValue =
    Int


default : GuessValue
default =
    0


correct : GuessValue
correct =
    0


isCorrect : GuessValue -> Bool
isCorrect =
    (==) 0


encoder : GuessValue -> JE.Value
encoder =
    JE.int


decoder : JD.Decoder GuessValue
decoder =
    JD.int
