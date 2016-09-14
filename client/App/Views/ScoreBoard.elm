module Views.ScoreBoard exposing (..)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList)

import Models.Player exposing (Player, PlayerId)
import Messages exposing (Msg(..))

viewPlayer : Player -> Html Msg
viewPlayer { id, score } =
  div
    [ class "score-board__item"
    ]
    [ p [ class "score-board__player" ] [ text id ]
    , p [ class "score-board__score" ] [ text (toString score) ]
    ]

viewScoreBoard : PlayerId -> List Player -> Html Msg
viewScoreBoard playerId players =
  div
    [ class "score-board"
    ]
    (List.map viewPlayer players)
