module Game.Views.ScoreBoard exposing (view)

import Html exposing (Html, div, p, span, text)
import Html.Attributes exposing (style, class, classList)

import Models.Player as Player
import Game.Messages exposing (Msg(..))

viewPlayer : Int -> Player.Player -> Html Msg
viewPlayer maxScore { id, score } =
  p
    [ class "score-board__item"
    ]
    [ span [ class "score-board__player" ] [ text id ]
    , span [ class "score-board__score" ] [ text (toString score) ]
    , span [ class "score-board__mark" ] [ text (if score == maxScore then "♛" else "") ]
    ]

view : String -> Player.Players -> Html Msg
view playerId players =
  let
    playersList = players |> Player.toList
    scores : List Int
    scores = playersList |> List.map .score
  in
    div
      [ class "score-board"
      ]
      [ div [ class "score-board__items" ]
          (
            playersList
              |> List.map (viewPlayer (List.maximum scores |> Maybe.withDefault 0))
          )
      ]
