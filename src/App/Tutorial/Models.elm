module Tutorial.Models exposing (..)

import Tutorial.Messages exposing (Msg)
import Content

type Stage
    = Start
    | ShowWord


type alias Model =
    { stage : Stage
    , guess : Maybe Int
    }


init : (Model, Cmd Msg)
init =
    { stage = Start
    , guess = Nothing
    } ! [ Cmd.none ]



-- Helpers


getDialogContent : Model -> String
getDialogContent { stage, guess } =
    case stage of
        Start ->
            Content.tutorialStart

        ShowWord ->
            case guess of
                Nothing ->
                    Content.tutorialShow

                Just i ->
                    if i == 0 then
                        Content.tutorialCorrect
                    else
                        Content.tutorialIncorrect
