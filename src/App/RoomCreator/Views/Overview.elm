module RoomCreator.Views.Overview exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class, href)

import Models.Room as Room
import Models.Player as Player
import RoomCreator.Messages exposing (Msg(..))

viewPlayer : Player.Player -> Html Msg
viewPlayer player =
  a
    [ class "button"
    , href "mailto:?body="
    ]
    [ text player.id
    ]

view : Room.Room -> Html Msg
view room =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text (room.id ++ " ready to go") ]
    , p [] [ text "Navigate to the following links to play:" ]
    , div []
        (
          room.players
            |> Player.toList
            |> List.map viewPlayer
        )

    ]
