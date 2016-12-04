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


init : ( Model, Cmd Msg )
init =
    { stage = Start
    , guess = Nothing
    }
        ! [ Cmd.none ]



-- Helpers


getNotificationState : Model -> ( String, Bool )
getNotificationState { stage, guess } =
    case stage of
        Start ->
            ( Content.tutorialStart, False )

        ShowWord ->
            case guess of
                Nothing ->
                    ( Content.tutorialShow, False )

                Just i ->
                    if i == 0 then
                        ( Content.tutorialCorrect, True )
                    else
                        ( Content.tutorialIncorrect, False )
