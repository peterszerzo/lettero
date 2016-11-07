module RoomCreator.Views.Error exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class, href)
import Html.Events exposing (onClick)

import Models.Room as Room
import RoomCreator.Messages exposing (Msg(..))

view : Room.Room -> Html Msg
view room =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text "Well that didn’t go so well.." ]
    , p [] [ text "Things go wrong from time to time.. anyways, care to try again?" ]
    , button
        [ class "button"
        , onClick (Navigate "/new")
        ]
        [ text "Yes"
        ]
    , button
        [ class "button"
        , onClick (Navigate "/new")
        ]
        [ text "No"
        ]
    ]
