module RoomCreator.Views.Main exposing (..)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)

import Models.Room as Room
import RoomCreator.Models exposing (Model, Status(..))
import RoomCreator.Messages exposing (Msg(..))
import RoomCreator.Views.CreateForm
import RoomCreator.Views.Welcome
import RoomCreator.Views.Overview

viewContent : Model -> Html Msg
viewContent model =
  case model.status of
    Startup ->
      RoomCreator.Views.Welcome.view

    RoomCreateSuccess ->
      model.room
        |> Maybe.withDefault (Room.getDummy "1")
        |> RoomCreator.Views.Overview.view

    _ ->
      RoomCreator.Views.CreateForm.view model


view : Model -> Html Msg
view model =
  div
    [ class "app__page"
    ]
    [ viewContent model
    ]
