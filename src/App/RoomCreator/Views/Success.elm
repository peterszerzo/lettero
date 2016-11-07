module RoomCreator.Views.Success exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class, href)
import Html.Events exposing (onClick)

import Models.Room as Room
import Router exposing (roomsPath)
import RoomCreator.Messages exposing (Msg(..))

view : Room.Room -> Html Msg
view room =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text "Success!" ]
    , p [] [ text "Alright, now, we hate to be like your parents, but there’s no other way to say it:" ]
    , button
        [ class "button"
        , onClick (Navigate ("/" ++ roomsPath ++ "/" ++ room.id))
        ]
        [ text "Go to your room ☞"
        ]
    ]
