module Game.Views.Error exposing (view)

import Html exposing (Html, div, h2, text)
import Html.Attributes exposing (class)

import Game.Models exposing (Error(..))
import Game.Messages exposing (Msg(..))

view : Error -> List (Html Msg)
view error =
  [ div [ class "basic-content" ] [ h2 [] [ text "Hi, this is an error" ] ] ]
