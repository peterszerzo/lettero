module Root.Views.Home exposing (view)

import Html exposing (Html, div, text ,h1, h3, button)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)

view : (String -> a) -> Html a
view navigate =
  div
    [ class "app__page"
    ]
    [ div
        [ classList
            [ ("basic-content", True)
            ]
        ]
        [ h1 [] [ text "Lettero" ]
        , h3 [] [ text "Playground for the social wordnerd" ]
        , div
            [ class "basic-content__nav"
            ]
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
