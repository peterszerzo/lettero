module Root.Views.NotFound exposing (view)

import Html exposing (Html, div, p, h2, text, button)
import Html.Attributes exposing (class, classList)
import Root.Messages exposing (Msg)


view : Html Msg
view =
    div
        [ class "app__page"
        ]
        [ div
            [ class "basic-content"
            ]
            [ h2 [] [ text "Not found :/" ]
            , p [] [ text "Uh, boy, looks like we sent you to the wrong place.." ]
            ]
        ]
