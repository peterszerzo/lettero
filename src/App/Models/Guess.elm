module Models.Guess exposing (..)

import Time exposing (Time)
import Json.Encode as JE
import Json.Decode as JD exposing (Decoder, map2)


type GuessValue
    = Pending
    | Idle
    | Made Int


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
    guess.value == (Made 0)


isPending : Guess -> Bool
isPending guess =
    guess.value == Pending


isIncorrect : Guess -> Bool
isIncorrect guess =
    not (isCorrect guess) && not (isPending guess)


toMaybe : Guess -> Maybe Int
toMaybe guess =
    case guess.value of
        Made i ->
            Just i

        _ ->
            Nothing



-- Encoders


itemEncoder : Guess -> JE.Value
itemEncoder { value, time } =
    let
        encodedValue =
            case value of
                Pending ->
                    JE.string "pending"

                Idle ->
                    JE.string "idle"

                Made i ->
                    JE.int i
    in
        JE.object
            [ ( "value", encodedValue )
            , ( "time", JE.float time )
            ]


encodeItem : Guess -> String
encodeItem guess =
    guess
        |> itemEncoder
        |> JE.encode 0



-- Decoders


valueStringDecoder : String -> JD.Decoder GuessValue
valueStringDecoder s =
    if s == "pending" then
        JD.succeed Pending
    else
        JD.succeed Idle


valueDecoder : Decoder GuessValue
valueDecoder =
    JD.oneOf
        [ JD.int
            |> JD.andThen (\i -> Made i |> JD.succeed)
        , JD.string
            |> JD.andThen valueStringDecoder
        ]


itemDecoder : Decoder Guess
itemDecoder =
    JD.map2 Guess
        (JD.field "value" valueDecoder)
        (JD.field "time" JD.float)
