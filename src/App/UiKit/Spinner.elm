module UiKit.Spinner exposing (view)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Svg exposing (svg, circle, g)
import Svg.Attributes exposing (cx, cy, r, width, height, viewBox, transform)

view : Html a
view =
  div
    [ class "spinner" ]
    [ svg
        [ width "50"
        , height "50"
        , viewBox "0 0 50 50"
        ]
        [ g
            [ transform "translate(25, 25)"
            ]
            [ circle
                [ cx "0"
                , cy "15"
                , r "3"
                ] []
            , circle
                [ cx "0"
                , cy "-15"
                , r "3"
                ] []
            ]
        ]
    ]
