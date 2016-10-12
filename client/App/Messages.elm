module Messages exposing (..)

import Game.Messages

type Msg
  = ChangeRoute String
  | GameMsg Game.Messages.Msg
