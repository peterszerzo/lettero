module UiKit.ScoreBoard exposing (view)

import Html exposing (Html, div, p, text, span)
import Html.Attributes exposing (class, classList)

viewItem : (String, Int, Bool) -> Html a
viewItem (id, score, isWinning) =
  p
    [ class "score-board__item"
    ]
    [ span [ class "score-board__player" ] [ text id ]
    , span [ class "score-board__score" ] [ text (toString score) ]
    , span [ class "score-board__mark" ] [ text (if isWinning then "♛" else "") ]
    ]

view : List (String, Int, Bool) -> Html a
view items =
  div
    [ class "score-board"
    ]
    [ div [ class "score-board__items" ]
        (
          List.map viewItem items
        )
    ]
