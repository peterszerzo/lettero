module Game.Messages exposing (..)

import Time exposing (Time)

type Msg
  = ReceiveRoomState String
  | MakeGuess Int
  | ReceiveRoundRandom Int
  | Tick Time
  | SetReady
