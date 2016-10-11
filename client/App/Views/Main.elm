module Views.Main exposing (view)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)

import Router
import Messages exposing (Msg)
import Models exposing (Model)

import Views.Home
import Views.About
import Views.NotFound
import Views.Rooms
import Views.Background
import Views.Room
import Views.Game

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
        Views.Rooms.view
      Router.Room roomId ->
        Views.Room.view
      Router.GamePlay roomId playerId ->
        Views.Game.view
  in
    div
      [ class "app"
      ]
      [ Views.Background.view
      , content
      ]
