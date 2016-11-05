module RoomCreator.Views.Welcome exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import RoomCreator.Messages exposing (Msg(..))

view : Html Msg
view =
  div
    [ class "basic-content"
    ]
    [ p [] [ text "Shall we start with a 15-second tutorial?" ]
    , button
        [ class "button"
        , onClick (Navigate "/tutorial")
        ]
        [ text "Tutorial"
        ]
    , p [] [ text "If you’ve got the hang of it, create a room. No login required." ]
    , button
        [ class "button"
        , onClick StartCreateForm
        ]
        [ text "Create room"
        ]
    ]
