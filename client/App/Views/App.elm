module Views.App exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)
import Html.Events exposing (onClick)
import Styles
import String

import Models.App exposing (Model, getOwnGuess)
import Models.Room exposing (Room)
import Models.Player exposing (Player, PlayerId)
import Messages exposing (Msg(..))

import Views.ScoreBoard exposing (viewScoreBoard)
import Views.Spinner exposing (viewSpinner)
import Views.Word exposing (viewWord)

view : Model -> Html Msg
view model =
  let
    (word, scoreBoard) = case model.room of
      Nothing ->
        ( viewSpinner
        , div [] []
        )
      Just room ->
        ( viewWord model room
        , viewScoreBoard model.playerId room.players
        )
  in
    div
      [ class "container"
      ]
      [ word
      , scoreBoard
      ]
