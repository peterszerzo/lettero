module RoomManager.Views.Welcome exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import RoomManager.Messages exposing (Msg(..))
import RoomManager.Models exposing (Status(..))

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
    , p [] [ text "Now, create your room in a little short of a minute. No login required." ]
    , button
        [ class "button"
        , onClick StartCreateForm
        ]
        [ text "Create Room"
        ]
    , p [] [ text "One day, you’ll be able to create your very own game room and invite your friends to it. For now, though, we only have the test room open for you, where you can play as:" ]
    , a
        [ class "button"
        , onClick (Navigate "/rooms/theroom/alfred")
        ]
        [ text "alfred"
        ]
    , a
        [ class "button"
        , onClick (Navigate "/rooms/theroom/samantha")
        ]
        [ text "samantha"
        ]
    ]
