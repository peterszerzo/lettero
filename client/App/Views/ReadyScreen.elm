module Views.ReadyScreen exposing (view)

import Html exposing (Html, div, p, text, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import Messages exposing (Msg(..))
import Models.Player exposing (Player)

view : (List Player) -> Html Msg
view players =
  div
    [ class "ready-screen"
    ]
    [ p [] [ text "Ready?" ]
    , button
        [ class "button"
        , onClick SetReady
        ]
        [ text "Bring it on!" ]
    ]
