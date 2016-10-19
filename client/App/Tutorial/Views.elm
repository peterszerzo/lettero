module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)

view : Html a
view =
  div
    [ class "app__page"
    ]
    [ h2 [] [ text "Lettero Learn" ]
    ]
