module RoomManager.Models exposing (..)

type Status
  = Startup
  | Editing
  | Processing
  | Success
  | Error String

type alias Model =
  { roomId : String
  , playerIds : List String
  , status : Status
  }

init : Model
init =
  { roomId = ""
  , playerIds = [ "", "" ]
  , status = Startup
  }

getDummy : String -> Model
getDummy s =
  init
