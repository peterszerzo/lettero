module Views.Spinner exposing (..)

import Html exposing (Html, p, text)

import Messages exposing (Msg(..))

viewSpinner : Html Msg
viewSpinner =
  p [] [text "hang in there..."]
