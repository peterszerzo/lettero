module Root.Views.Main exposing (view)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Html.App exposing (map)

import Router
import Root.Messages exposing (Msg(..))
import Root.Models exposing (Model)

import Root.Views.Home
import Root.Views.About
import Root.Views.NotFound
import Root.Views.Background
import Root.Views.Room

import Game.Views.Main
import Game.Models.Main
import RoomManager.Views
import RoomManager.Models
import Tutorial.Views
import Tutorial.Models

view : Model -> Html Msg
view model =
  let
    content = case model.route of
      Router.Home ->
        Root.Views.Home.view Root.Messages.ChangeRoute

      Router.About ->
        Root.Views.About.view

      Router.NotFound ->
        Root.Views.NotFound.view

      Router.Rooms ->
        model.roomManager
          |> Maybe.withDefault (RoomManager.Models.getDummy "1")
          |> RoomManager.Views.view
          |> map RoomManagerMsg

      Router.Room roomId ->
        Root.Views.Room.view

      Router.GamePlay roomId playerId ->
        model.game
          |> Maybe.withDefault (Game.Models.Main.getDummy "1")
          |> Game.Views.Main.view
          |> map GameMsg

      Router.Tutorial ->
        model.tutorial
          |> Maybe.withDefault (Tutorial.Models.getDummy "1")
          |> Tutorial.Views.view
          |> map TutorialMsg

  in
    div
      [ class "app"
      ]
      [ Root.Views.Background.view
      , content
      ]
