module Game.Views.ReadyScreen exposing (view)

import Html exposing (Html, div, p, h1, h2, text, button, span)
import Html.Attributes exposing (class, classList, disabled)
import Html.Events exposing (onClick)

import Game.Messages exposing (Msg(..))
import Game.Models.Player exposing (Player, PlayerId)

viewPlayer : PlayerId -> Player -> Html Msg
viewPlayer playerId player =
  let
    classAttributes =
      [ classList
          [ ("button", True)
          , ("button--disabled", (player.id /= playerId))
          ]
      , disabled (player.id /= playerId)
      ]
    eventAttributes =
      if player.id == playerId
        then
          [ onClick SetReady ]
        else
          []
    content = player.id ++ " " ++ (if player.isReady then "✓" else "...")
  in
    button
      (classAttributes ++ eventAttributes)
      [ text content
      ]

view : (List Player) -> PlayerId -> Html Msg
view players playerId =
  div
    []
    [ h2 [] [ text "Ready, buddy?" ]
    , p [] [ text "The game will start once all players marked ready." ]
    , div [] (List.map (viewPlayer playerId) players)
    ]
