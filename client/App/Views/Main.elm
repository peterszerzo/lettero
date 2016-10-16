module Views.Main exposing (view)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Html.App exposing (map)

import Router
import Messages exposing (Msg(..))
import Models exposing (Model)

import Views.Home
import Views.About
import Views.NotFound
import Views.Rooms
import Views.Background
import Views.Room
import Game.Views.Main
import Game.Models.Main
import CreateRoomForm.Models

view : Model -> Html Msg
view model =
  let
    content = case model.route of
      Router.Home ->
        Views.Home.view Messages.ChangeRoute

      Router.About ->
        Views.About.view

      Router.NotFound ->
        Views.NotFound.view

      Router.Rooms ->
        model.createRoomForm
          |> Maybe.withDefault (CreateRoomForm.Models.getDummy "1")
          |> Views.Rooms.view

      Router.Room roomId ->
        Views.Room.view

      Router.GamePlay roomId playerId ->
        model.game
          |> Maybe.withDefault (Game.Models.Main.getDummy "1")
          |> Game.Views.Main.view
          |> map GameMsg
  in
    div
      [ class "app"
      ]
      [ Views.Background.view
      , content
      ]
