module Tutorial.Subscriptions exposing (..)

import Tutorial.Models exposing (Model)
import Tutorial.Messages exposing (Msg)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
