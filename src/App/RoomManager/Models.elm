module RoomManager.Models exposing (..)

import Models.Room as Room
import RoomManager.Messages exposing (Msg)
import Ports exposing (roomRequest)

type Stage
  = FetchingRoom
  | Base
  | InvitePlayer
  | AboutToDeleteRoom
  | DeletingRoom

type alias Model =
  { roomId : String
  , room : Maybe Room.Room
  , stage : Stage
  }

init : String -> (Model, Cmd Msg)
init roomId =
  { roomId = roomId
  , room = Nothing
  , stage = FetchingRoom
  } !
  [ roomRequest roomId ]

getDummy : String -> Model
getDummy roomId =
  { roomId = roomId
  , room = Nothing
  , stage = FetchingRoom
  }
