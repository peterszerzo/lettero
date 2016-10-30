module RoomManager.Views.Main exposing (..)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)

import Models.Room as Room
import RoomManager.Models exposing (Model, Status(..))
import RoomManager.Messages exposing (Msg(..))
import RoomManager.Views.CreateForm
import RoomManager.Views.Welcome
import RoomManager.Views.Overview

viewContent : Model -> Html Msg
viewContent model =
  case model.status of
    Startup ->
      RoomManager.Views.Welcome.view

    RoomCreateSuccess ->
      model.room
        |> Maybe.withDefault (Room.getDummy "1")
        |> RoomManager.Views.Overview.view

    _ ->
      RoomManager.Views.CreateForm.view model


view : Model -> Html Msg
view model =
  div
    [ class "app__page"
    ]
    [ viewContent model
    ]
