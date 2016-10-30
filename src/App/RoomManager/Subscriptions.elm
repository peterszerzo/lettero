module RoomManager.Subscriptions exposing (..)

import RoomManager.Ports exposing (createRoomResponse)
import RoomManager.Models exposing (Model)
import RoomManager.Messages exposing (Msg(..))

subscriptions : Model -> Sub Msg
subscriptions model =
  createRoomResponse ReceiveFormStatus
