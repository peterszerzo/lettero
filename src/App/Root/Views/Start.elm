module Root.Views.Start exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Root.Messages exposing (Msg(..))
import Router exposing (tryPath, newPath)


view : Html Msg
view =
    div
        [ class "app__page" ]
        [ div
            [ class "basic-content"
            ]
            [ p [] [ text "Shall we start with a 15-second tutorial?" ]
            , button
                [ class "button"
                , onClick (Navigate ("/" ++ tryPath))
                ]
                [ text "Tutorial"
                ]
            , p [] [ text "If you’ve got the hang of it, create a room. No login required." ]
            , button
                [ class "button"
                , onClick (Navigate ("/" ++ newPath))
                ]
                [ text "Create room"
                ]
            ]
        ]
