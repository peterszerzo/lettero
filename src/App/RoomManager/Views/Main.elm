module RoomManager.Views.Main exposing (..)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)

import RoomManager.Models exposing (Model, Status(..))
import RoomManager.Messages exposing (Msg(..))
import RoomManager.Views.CreateForm
import RoomManager.Views.Welcome

viewContent : Model -> Html Msg
viewContent model =
  if model.status == Startup then
    RoomManager.Views.Welcome.view
  else
    RoomManager.Views.CreateForm.view model

view : Model -> Html Msg
view model =
  div
    [ class "app__page"
    ]
    [ viewContent model
    ]
