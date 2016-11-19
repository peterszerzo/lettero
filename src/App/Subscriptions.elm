module Subscriptions exposing (..)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Router
import Game.Subscriptions
import Tutorial.Subscriptions
import RoomCreator.Subscriptions
import RoomManager.Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.route of
        Router.Game model_ ->
            Game.Subscriptions.subscriptions model_
                |> Sub.map GameMsg

        Router.Tutorial model_ ->
            Tutorial.Subscriptions.subscriptions model_
                |> Sub.map TutorialMsg

        Router.RoomCreator model_ ->
            RoomCreator.Subscriptions.subscriptions model_
                |> Sub.map RoomCreatorMsg

        Router.RoomManager model_ ->
            RoomManager.Subscriptions.subscriptions model_
                |> Sub.map RoomManagerMsg

        _ ->
            Sub.none
