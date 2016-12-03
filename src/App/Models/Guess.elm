module Models.Guess exposing (..)

import Time exposing (Time)
import Json.Encode as JE
import Json.Decode as JD exposing (Decoder, map2)


type alias GuessValue = Int


type GuessStatus
    = Pending
    | Idle
    | Made Int


type alias Guess =
    { status : GuessStatus
    , time : Time
    }


getDummy : String -> Guess
getDummy s =
  Guess Pending 0



-- Helpers


isCorrect : Guess -> Bool
isCorrect guess =
    guess.status == (Made 0)


isPending : Guess -> Bool
isPending guess =
    guess.status == Pending


isIncorrect : Guess -> Bool
isIncorrect guess =
    not (isCorrect guess) && not (isPending guess)


toMaybe : Guess -> Maybe Int
toMaybe guess =
    case guess.status of
        Made i ->
            Just i

        _ ->
            Nothing



-- Encoders


itemEncoder : Guess -> JE.Value
itemEncoder { status, time } =
    let
        encodedValue =
            case status of
                Pending ->
                    JE.string "pending"

                Idle ->
                    JE.string "idle"

                Made i ->
                    JE.int i
    in
        JE.object
            [ ( "status", encodedValue )
            , ( "time", JE.float time )
            ]


encodeItem : Guess -> String
encodeItem guess =
    guess
        |> itemEncoder
        |> JE.encode 0



-- Decoders


valueDecoder : String -> JD.Decoder GuessStatus
valueDecoder s =
    if s == "pending" then
        JD.succeed Pending
    else
        JD.succeed Idle


statusDecoder : Decoder GuessStatus
statusDecoder =
    JD.oneOf
        [ JD.int
            |> JD.andThen (\i -> Made i |> JD.succeed)
        , JD.string
            |> JD.andThen valueDecoder
        ]


itemDecoder : Decoder Guess
itemDecoder =
    JD.map2 Guess
        (JD.field "status" statusDecoder)
        (JD.field "time" JD.float)
