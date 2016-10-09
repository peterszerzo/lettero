module Views.Home exposing (view)

import Html exposing (Html, div, text ,h1, p, button, nav)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)

view : a -> Html a
view goToAbout =
  div
    [ class "app__page"
    ]
    [ div
        [ classList
            [ ("start", True)
            ]
        ]
        [ h1 [] [ text "Lettero" ]
        , p [] [ text "Playground for the social wordnerd" ]
        , nav []
            [ button
                [ class "button"
                ]
                [ text "Play"
                ]
            , button [ class "button", onClick goToAbout ] [ text "About" ]
            ]
        ]
    ]
