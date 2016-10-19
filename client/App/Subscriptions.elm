module Subscriptions exposing (..)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Game.Subscriptions exposing (subscriptions)

subscriptions : Model -> Sub Msg
subscriptions model =
  model.game
    |> Maybe.map (\g -> Sub.map GameMsg (Game.Subscriptions.subscriptions g))
    |> Maybe.withDefault Sub.none
