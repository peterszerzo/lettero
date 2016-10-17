module CreateRoomForm.Messages exposing (..)

import CreateRoomForm.Models exposing (Status)

type Msg
  = Input String
  | ChangeStatus Status
