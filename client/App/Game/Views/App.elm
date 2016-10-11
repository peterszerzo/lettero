module Game.Views.App exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)

import Game.Models.App exposing (Model, getOwnGuess)
import Game.Models.Room exposing (Room)
import Game.Models.Player exposing (areAllReady)
import Game.Messages exposing (Msg(..))

import Game.Views.ScoreBoard as ScoreBoard
import Game.Views.Spinner as Spinner
import Game.Views.Word as Word
import Game.Views.ReadyScreen as ReadyScreen
import Game.Views.Notification as Notification

viewGame : Model -> Room -> Html Msg
viewGame model room =
  let
    content =
      if areAllReady room.players
        then
          [ Word.view model room
          , ScoreBoard.view model.playerId room.players
          , Notification.view model room
          ]
        else
          [ ReadyScreen.view room.players model.playerId
          ]
  in
    div
      [ class "app__page" ]
      content

view : Model -> Html Msg
view model =
  let
    content = case model.room of
      Nothing ->
        div [ class "app__page" ] [ Spinner.view ]
      Just room ->
        viewGame model room
  in
    div
      [ class "app"
      ]
      [ content
      ]
