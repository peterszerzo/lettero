module Subscriptions exposing (..)

import WebSocket exposing (listen)
import Time exposing (every)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Helpers exposing (getWebSocketUrl)
import Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    webSocketUrl = getWebSocketUrl model
  in
    Sub.batch
      [ listen webSocketUrl ReceiveRoomState
      , every tickDuration Tick
      ]
