module Views.App exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)

import Models.App exposing (Model, getOwnGuess)
import Models.Room exposing (Room)
import Models.Player exposing (areAllReady)
import Messages exposing (Msg(..))

import Views.ScoreBoard as ScoreBoard
import Views.Spinner as Spinner
import Views.Word as Word
import Views.ReadyScreen as ReadyScreen
import Views.Notification as Notification

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
