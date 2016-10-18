module CreateRoomForm.Messages exposing (..)

import CreateRoomForm.Models exposing (Status)

type Msg
  = InputRoomId String
  | InputPlayer Int String
  | ChangeStatus Status
  | Navigate String
