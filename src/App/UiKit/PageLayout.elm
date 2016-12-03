module UiKit.PageLayout exposing (..)

import Html exposing (Html, div)
import Html.Attributes exposing (class)


view : List (Html msg) -> Html msg
view children =
    div
        [ class "app__page"
        ]
        [ div
            [ class "app__page-content"
            ]
            [ div
                [ class "basic-content"
                ]
                children
            ]
        ]
