module Subscriptions exposing (..)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Game.Subscriptions exposing (subscriptions)

subscriptions : Model -> Sub Msg
subscriptions model =
  case model.game of
    Just game ->
      Sub.map GameMsg (Game.Subscriptions.subscriptions game)

    Nothing ->
      Sub.none
