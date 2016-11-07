module Root.Views.Main exposing (view)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Html.App exposing (map)

import Router
import Root.Messages exposing (Msg(..))
import Root.Models exposing (Model)

import Root.Views.Home
import Root.Views.Nav
import Root.Views.About
import Root.Views.NotFound
import Root.Views.Background
import Root.Views.Start

import Game.Views.Main
import Game.Models
import RoomCreator.Views.Main
import RoomCreator.Models
import RoomManager.Models
import RoomManager.Views
import Tutorial.Views
import Tutorial.Models

view : Model -> Html Msg
view model =
  let
    content = case model.route of
      Router.Home ->
        Root.Views.Home.view

      Router.Start ->
        Root.Views.Start.view

      Router.About ->
        Root.Views.About.view

      Router.NotFound ->
        Root.Views.NotFound.view

      Router.NewRoom ->
        model.roomCreator
          |> Maybe.withDefault (RoomCreator.Models.getDummy "1")
          |> RoomCreator.Views.Main.view
          |> map RoomCreatorMsg

      Router.Room roomId ->
        model.roomManager
          |> Maybe.withDefault (RoomManager.Models.getDummy "1")
          |> RoomManager.Views.view
          |> map RoomManagerMsg

      Router.GamePlay roomId playerId ->
        model.game
          |> Maybe.withDefault (Game.Models.getDummy "1")
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
      [ Root.Views.Nav.view model
      , Root.Views.Background.view
      , content
      ]
