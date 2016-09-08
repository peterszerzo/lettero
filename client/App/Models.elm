module Models exposing (..)

import Player.Models exposing (Player, PlayerId)
import Room.Models exposing (Room, RoomId)

type alias Word = String

type alias Flags =
  { roomId : RoomId
  , playerId : PlayerId
  , host : String
  }

type alias Model =
  { room : Maybe Room
  , roomId : RoomId
  , playerId : PlayerId
  , angle : Int
  , host : String
  }
