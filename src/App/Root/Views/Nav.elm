module Root.Views.Nav exposing (..)

import Html exposing (Html, nav, div)
import Html.Attributes exposing (classList, class)
import Html.Events exposing (onClick)

import Root.Messages exposing (Msg(..))
import Root.Models exposing (Model)
import Router

import UiKit.Icons exposing (logo)

view : Model -> Html Msg
view model =
  nav
    [ classList [ ("nav", True), ("nav--hidden", model.route == Router.Home) ]
    , onClick (Navigate "/")
    ]
    [ div
        [ class "nav__item nav__item--left"
        ]
        [ logo ]
    ]
