module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)

import UiKit.Notification

view : Html a
view =
  div
    [ class "app__page"
    ]
    [ UiKit.Notification.view "Give me a spinning word!" True
    ]
