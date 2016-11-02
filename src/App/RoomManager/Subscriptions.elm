module RoomManager.Subscriptions exposing (..)

import Ports exposing (roomResponse)

import RoomManager.Models exposing (Model)
import RoomManager.Messages exposing (Msg(..))

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ roomResponse ReceiveRoom
    ]
