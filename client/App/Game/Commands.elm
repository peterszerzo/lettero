module Game.Commands exposing (..)

import WebSocket exposing (send)
import Random

import Game.Messages exposing (Msg(..))
import Game.Models.Player as Player
import Game.Models.Main exposing (Game, getWebSocketUrl)

sendPlayerStatusUpdate : Game -> Cmd Msg
sendPlayerStatusUpdate model =
  let
    encodedPlayer =
      model.room
        |> Maybe.map .players
        |> Maybe.map (Player.unsafeFindById model.playerId)
        |> Maybe.map Player.encodePlayer
        |> Maybe.withDefault ""
    webSocketUrl = getWebSocketUrl model
  in
    send webSocketUrl encodedPlayer

requestRoomState : Game -> Cmd Msg
requestRoomState model =
  send (getWebSocketUrl model) "requestRoomState"

getRandomAngle : () -> Cmd Msg
getRandomAngle _ =
  Random.int 0 360
    |> Random.generate ReceiveRandomAngle
