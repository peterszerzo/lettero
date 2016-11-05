module Game.Subscriptions exposing (..)

import Time exposing (every)

import Ports exposing (closeTab)
import Game.Ports exposing (roomStateUpdate)

import Game.Models exposing (Model)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ roomStateUpdate ReceiveRoomState
    , closeTab LeaveRoom
    , every tickDuration Tick
    ]
