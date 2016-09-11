module Messages exposing (..)

import Time exposing (Time)

type Msg =
    ReceiveRoomState String
  | Guess Int
  | ReceiveRandomAngle Int
  | Tick Time
