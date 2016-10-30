module Game.Views.ScoreBoard exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList)
import Dict

import Models.Player as Player
import Game.Messages exposing (Msg(..))

viewPlayer : Player.Player -> Html Msg
viewPlayer { id, score } =
  div
    [ class "score-board__item"
    ]
    [ p [ class "score-board__player" ] [ text id ]
    , p [ class "score-board__score" ] [ text (toString score) ]
    ]

view : String -> Player.Players -> Html Msg
view playerId players =
  div
    [ class "score-board"
    ]
    [ div [ class "score-board__items" ]
        (
          players
            |> Dict.toList
            |> List.map snd
            |> List.map viewPlayer
        )
    ]
