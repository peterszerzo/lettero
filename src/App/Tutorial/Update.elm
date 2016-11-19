module Tutorial.Update exposing (..)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model, Stage(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Proceed ->
            { model
                | stage =
                    if model.stage == Start then
                        ShowWord
                    else
                        model.stage
            }
                ! [ Cmd.none ]

        Navigate newUrl ->
            model ! [ Cmd.none ]

        Guess i ->
            { model
                | guess =
                    Just i
            }
                ! [ Cmd.none ]
