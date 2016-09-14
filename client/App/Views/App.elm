module Views.App exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)

import Models.App exposing (Model, getOwnGuess)
import Messages exposing (Msg(..))

import Views.ScoreBoard as Sd
import Views.Spinner as Sr
import Views.Word as Wd

view : Model -> Html Msg
view model =
  let
    (word, scoreBoard) = case model.room of
      Nothing ->
        ( Sr.view
        , div [] []
        )
      Just room ->
        ( Wd.view model room
        , Sd.view model.playerId room.players
        )
  in
    div
      [ class "container"
      ]
      [ word
      , scoreBoard
      ]
