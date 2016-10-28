module Game.Subscriptions exposing (..)

import Time exposing (every)

import Game.Ports exposing (getRoom)

import Game.Models.Main exposing (Model)
import Game.Messages exposing (Msg(..))
import Game.Constants exposing (tickDuration)

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ getRoom ReceiveRoomState
    , every tickDuration Tick
    ]
