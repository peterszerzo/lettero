module Messages exposing (..)

type Msg =
    ReceiveRoomState String
  | Guess Int
  | ReceiveRandomAngle Int
