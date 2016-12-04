module Tutorial.Models exposing (..)

import Tutorial.Messages exposing (Msg)
import Models.GuessValue as GuessValue


type Model
    = Intro
    | Show
    | Guessed GuessValue.GuessValue


init : ( Model, Cmd Msg )
init =
    Intro ! [ Cmd.none ]


isCorrectGuess : Model -> Bool
isCorrectGuess model =
    case model of
        Guessed val ->
            GuessValue.isCorrect val

        _ ->
            False
