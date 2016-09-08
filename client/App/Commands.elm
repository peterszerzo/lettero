module Commands exposing (..)

import WebSocket exposing (send)
import Messages exposing (Msg(..))
import Random

import Room.Helpers exposing (getPlayerStatusUpdate)
import PlayerStatusUpdate.Encoders exposing (encodePlayerStatusUpdate)
import Models exposing (Model)
import Helpers exposing (getWebSocketUrl)

sendPlayerStatusUpdate : Model -> Cmd Msg
sendPlayerStatusUpdate model =
  let
    encodedPlayerStatusUpdate = case model.room of
      Nothing ->
        ""
      Just room ->
        getPlayerStatusUpdate model.playerId room
          |> encodePlayerStatusUpdate
    webSocketUrl = getWebSocketUrl model
  in
    send webSocketUrl encodedPlayerStatusUpdate

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
