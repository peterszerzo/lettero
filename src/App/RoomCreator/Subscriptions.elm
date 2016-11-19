module RoomCreator.Subscriptions exposing (..)

import Ports exposing (createRoomResponse)
import RoomCreator.Models exposing (Model)
import RoomCreator.Messages exposing (Msg(..))


subscriptions : Model -> Sub Msg
subscriptions model =
    createRoomResponse ReceiveFormStatus
