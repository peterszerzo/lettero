module Models.Guess exposing (..)

import Time exposing (Time)
import Json.Encode as JE
import Json.Decode as JD exposing (Decoder, map2)
import Models.GuessValue as GuessValue


type GuessStatus
    = Pending
    | Idle
    | Made GuessValue.GuessValue


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
    guess.status == (Made GuessValue.correct)


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


encoder : Guess -> JE.Value
encoder { status, time } =
    let
        encodedValue =
            case status of
                Pending ->
                    JE.string "pending"

                Idle ->
                    JE.string "idle"

                Made i ->
                    GuessValue.encoder i
    in
        JE.object
            [ ( "status", encodedValue )
            , ( "time", JE.float time )
            ]


encodeItem : Guess -> String
encodeItem guess =
    guess
        |> encoder
        |> JE.encode 0



-- Decoders


statusDecoder : Decoder GuessStatus
statusDecoder =
    JD.oneOf
        [ GuessValue.decoder
            |> JD.andThen (\i -> Made i |> JD.succeed)
        , JD.string
            |> JD.andThen (\s -> JD.succeed <| if s == "pending" then Pending else Idle)
        ]


decoder : Decoder Guess
decoder =
    JD.map2 Guess
        (JD.field "status" statusDecoder)
        (JD.field "time" JD.float)
