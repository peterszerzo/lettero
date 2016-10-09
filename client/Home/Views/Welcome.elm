module Views.Welcome exposing (view)

import Html exposing (Html, div, text ,h1, p, button, nav)
import Html.Attributes exposing (class, classList)

view : Html a
view =
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
            , button [ class "button" ] [ text "About" ]
            ]
        ]
    ]
