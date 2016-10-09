module Messages exposing (..)

import Time exposing (Time)

type Msg =
    ReceiveRoomState String
  | MakeGuess Int
  | ReceiveRandomAngle Int
  | Tick Time
  | SetReady
