module Game.Views.Main exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)

import Game.Constants exposing (roundDuration)

import Models.Room as Room
import Models.Player as Player
import Game.Models exposing (Model, getOwnGuess)
import Game.Messages exposing (Msg(..))
import Game.Views.ScoreBoard as ScoreBoard
import Game.Views.Word as Word
import Game.Views.ReadyScreen as ReadyScreen
import Game.Views.Notification as Notification

import UiKit.Spinner
import UiKit.TickTockTickTock

viewGame : Model -> Room.Room -> List (Html Msg)
viewGame model room =
  let
    timeRatioLeft =
      if (Room.isRoundOver room) then
        0
      else
        (1 - model.currentRoundTime / roundDuration) |> clamp 0 1
  in
    if Player.areAllReady room.players
      then
        [ Word.view model room
        , ScoreBoard.view model.playerId room.players
        , Notification.view model room
        , UiKit.TickTockTickTock.view timeRatioLeft
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
