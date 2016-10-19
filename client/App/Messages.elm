module Messages exposing (..)

import Game.Messages
import RoomManager.Messages

type Msg
  = ChangeRoute String
  | GameMsg Game.Messages.Msg
  | RoomManagerMsg RoomManager.Messages.Msg
