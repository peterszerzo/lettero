module Game.Subscriptions exposing (..)

import WebSocket exposing (listen)
import Time exposing (every)

import Game.Models.Main exposing (Game, getWebSocketUrl)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Game -> Sub Msg
subscriptions model =
  let
    webSocketUrl = getWebSocketUrl model
  in
    Sub.batch
      [ listen webSocketUrl ReceiveRoomState
      , every tickDuration Tick
      ]
