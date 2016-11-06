module Game.Subscriptions exposing (..)

import Time exposing (every)

import Ports exposing (closeTab)
import Game.Ports exposing (roomStateUpdate)

import Models.Player as Player
import Game.Models exposing (Model)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    isTicking =
      model.room
        |> Maybe.map (Player.toList << .players)
        |> Maybe.map (List.map .isReady)
        |> Maybe.map (List.all identity)
        |> Maybe.withDefault False
  in
    Sub.batch
      [ roomStateUpdate ReceiveRoomState
      , closeTab LeaveRoom
      , if isTicking then (every tickDuration Tick) else Sub.none
      ]
