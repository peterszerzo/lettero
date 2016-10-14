module Views.About exposing (view)

import Html exposing (Html, div, text ,h1, p, button, nav)
import Html.Attributes exposing (class, classList)
import Markdown

import Content

view : Html a
view =
  div
    [ class "app__page"
    ]
    [ Markdown.toHtml [ class "static-content" ] (Content.about)
    ]
