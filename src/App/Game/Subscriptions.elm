module Game.Subscriptions exposing (..)

import Time exposing (every)

import Ports exposing (getRoom)

import Game.Models.Main exposing (Model, getWebSocketUrl)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    webSocketUrl = getWebSocketUrl model
  in
    Sub.batch
      [ getRoom ReceiveRoomState
      , every tickDuration Tick
      ]
