module Views.Home exposing (view)

import Html exposing (Html, div, text ,h1, p, button, nav)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)

view : (String -> a) -> Html a
view navigate =
  div
    [ class "app__page"
    ]
    [ div
        [ classList
            [ ("home", True)
            ]
        ]
        [ h1 [] [ text "Lettero" ]
        , p [] [ text "Playground for the social wordnerd" ]
        , nav []
            [ button
                [ class "button"
                , onClick (navigate "/rooms")
                ]
                [ text "Play"
                ]
            , button
                [ class "button"
                , onClick (navigate "/about")
                ]
                [ text "About"
                ]
            ]
        ]
    ]
