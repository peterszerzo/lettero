module Messages exposing (..)

import Game.Messages
import CreateRoomForm.Messages

type Msg
  = ChangeRoute String
  | GameMsg Game.Messages.Msg
  | CreateRoomFormMsg CreateRoomForm.Messages.Msg
