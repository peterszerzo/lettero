module Game.Commands exposing (..)

import WebSocket exposing (send)
import Random

import Game.Messages exposing (Msg(..))
import Game.Models.Player exposing (encodePlayer)
import Game.Models.App exposing (Model, getWebSocketUrl)

sendPlayerStatusUpdate : Model -> Cmd Msg
sendPlayerStatusUpdate model =
  let
    encodedPlayer = case model.room of
      Nothing ->
        ""
      Just room ->
        room.players
          |> List.filter (\p -> p.id == model.playerId)
          |> List.head
          |> Maybe.map encodePlayer
          |> Maybe.withDefault ""
    webSocketUrl = getWebSocketUrl model
  in
    send webSocketUrl encodedPlayer

requestRoomState : Model -> Cmd Msg
requestRoomState model =
  let
    webSocketUrl = getWebSocketUrl model
  in
    send webSocketUrl "requestRoomState"

getRandomAngle : () -> Cmd Msg
getRandomAngle _ =
  Random.int 0 360
    |> Random.generate ReceiveRandomAngle
