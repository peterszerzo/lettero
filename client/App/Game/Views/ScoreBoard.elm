module Game.Views.ScoreBoard exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList)

import Game.Models.Player exposing (Player, PlayerId)
import Game.Messages exposing (Msg(..))

viewPlayer : Player -> Html Msg
viewPlayer { id, score } =
  div
    [ class "score-board__item"
    ]
    [ p [ class "score-board__player" ] [ text id ]
    , p [ class "score-board__score" ] [ text (toString score) ]
    ]

view : PlayerId -> List Player -> Html Msg
view playerId players =
  div
    [ class "score-board"
    ]
    [ div [ class "score-board__items" ]
        (List.map viewPlayer players)
    ]
