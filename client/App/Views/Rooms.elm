module Views.Rooms exposing (view)

import Html exposing (Html, div, text ,h2, p, button, nav)
import Html.Attributes exposing (class, classList)
import Html.App exposing (map)

import Messages exposing (Msg(CreateRoomFormMsg))
import CreateRoomForm.Views
import CreateRoomForm.Models

view : CreateRoomForm.Models.Model -> Html Msg
view createRoomForm =
  div
    [ class "app__page"
    ]
    [ map CreateRoomFormMsg (CreateRoomForm.Views.view createRoomForm)
    ]
