module Root.Views.About exposing (view)

import Html exposing (Html, div, text, h1, p, button, nav)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)
import Markdown
import Content
import Root.Messages exposing (Msg(..))
import Router


view : Html Msg
view =
    div
        [ class "app__page"
        ]
        [ div
            [ class "basic-content" ]
            [ Markdown.toHtml [] (Content.about)
            , button
                [ class "button"
                , onClick (Navigate <| "/" ++ Router.homePath)
                ]
                [ text "☜ Back" ]
            , button
                [ class "button"
                , onClick (Navigate <| "/" ++ Router.startPath)
                ]
                [ text "Play ☞" ]
            ]
        ]
