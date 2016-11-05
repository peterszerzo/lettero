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
    [ p [] [ text "Let’s get started! Wanna see a tutorial first?" ]
    , button
        [ class "button"
        , onClick (Navigate "/tutorial")
        ]
        [ text "Yes tutorial"
        ]
    , p [] [ text "If you’ve got the hang of it, create a room or look up an existing one. No login required." ]
    , button
        [ class "button"
        , onClick StartCreateForm
        ]
        [ text "Create room"
        ]
    , button
        [ class "button"
        , onClick StartCreateForm
        ]
        [ text "Find room"
        ]
    ]
