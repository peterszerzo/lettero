module Messages exposing (..)

import Time exposing (Time)

import Models.Guess exposing (GuessValue)

type Msg =
    ReceiveRoomState String
  | MakeGuess GuessValue
  | ReceiveRandomAngle Int
  | Tick Time
  | SetReady
