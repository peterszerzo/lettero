module Views.NotFound exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (class, classList)

view : Html a
view =
  div
    [ class "app__page"
    ]
    [ p [] [ text "Not found" ]
    ]
