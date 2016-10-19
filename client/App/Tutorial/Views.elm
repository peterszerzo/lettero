module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model)

import UiKit.Notification

view : Model -> Html Msg
view model =
  div
    [ class "app__page"
    ]
    [ UiKit.Notification.view "Give me a spinning word!" True
    ]
