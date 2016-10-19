module Game.Views.Main exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)

import Game.Models.Main exposing (Model, getOwnGuess)
import Game.Models.Room exposing (Room)
import Game.Models.Player exposing (areAllReady)
import Game.Messages exposing (Msg(..))

import Game.Views.ScoreBoard as ScoreBoard
import Game.Views.Word as Word
import Game.Views.ReadyScreen as ReadyScreen
import Game.Views.Notification as Notification

import UiKit.Spinner

viewGame : Model -> Room -> List (Html Msg)
viewGame model room =
  if areAllReady room.players
    then
      [ Word.view model room
      , ScoreBoard.view model.playerId room.players
      , Notification.view model room
      ]
    else
      [ ReadyScreen.view room.players model.playerId
      ]

view : Model -> Html Msg
view model =
  div
    [ class "app__page"
    ]
    (
      model.room
        |> Maybe.map (viewGame model)
        |> Maybe.withDefault [ div [  ] [ UiKit.Spinner.view ] ]
    )
