module Tutorial.Update exposing (..)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Start ->
            (if model == Intro then
                Show
             else
                model
            )
                ! []

        Guess i ->
            (Guessed i) ! []

        Navigate newUrl ->
            model ! []
