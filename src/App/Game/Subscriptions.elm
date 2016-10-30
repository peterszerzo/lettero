module Game.Subscriptions exposing (..)

import Time exposing (every)

import Game.Ports exposing (roomStateUpdate, leaveRoom)

import Game.Models exposing (Model)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ roomStateUpdate ReceiveRoomState
    , leaveRoom LeaveRoom
    , every tickDuration Tick
    ]
