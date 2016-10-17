module Game.Subscriptions exposing (..)

import WebSocket exposing (listen)
import Time exposing (every)

import Game.Models.Main exposing (Model, getWebSocketUrl)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    webSocketUrl = getWebSocketUrl model
  in
    Sub.batch
      [ listen webSocketUrl ReceiveRoomState
      , every tickDuration Tick
      ]
