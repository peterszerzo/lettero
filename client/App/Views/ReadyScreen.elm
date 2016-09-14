module Views.ReadyScreen exposing (view)

import Html exposing (Html, div, p, h1, h2, text, button)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)

import Messages exposing (Msg(..))
import Models.Player exposing (Player, PlayerId)

viewPlayer : PlayerId -> Player -> Html Msg
viewPlayer playerId player =
  button
    ([ classList [("button", True), ("button--disabled", (player.id /= playerId))] ] ++ (if player.id == playerId then [onClick SetReady] else []))
    [ text player.id ]

view : (List Player) -> PlayerId -> Html Msg
view players playerId =
  div
    [ class "ready-screen"
    ]
    [ h2 [] [ text "Ready?" ]
    , div [] (List.map (viewPlayer playerId) players)
    ]
