module Room.Models exposing (..)

import Player.Models exposing (Player)

type alias RoomId = String

type alias Room =
  { id : RoomId
  , round : Int
  , word : String
  , players : List Player
  }
