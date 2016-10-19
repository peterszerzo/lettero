module RoomManager.Messages exposing (..)

import RoomManager.Models exposing (Status)

type Msg
  = InputRoomId String
  | InputPlayer Int String
  | ChangeStatus Status
  | Navigate String
