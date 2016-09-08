module Subscriptions exposing (..)

import WebSocket exposing (listen)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Helpers exposing (getWebSocketUrl)

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    webSocketUrl = getWebSocketUrl model.roomId
  in
    Sub.batch
      [ listen (getWebSocketUrl model.roomId) ReceiveRoomState
      ]
