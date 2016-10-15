module CreateRoomForm.Models exposing (..)

type Status
  = Editing
  | Processing
  | Error String
  | Success

type alias CreateRoomForm =
  { roomId : String
  , playerIds : List String
  , status : Status
  }

init : CreateRoomForm
init =
  { roomId = ""
  , playerIds = []
  , status = Editing
  }

getDummy : String -> CreateRoomForm
getDummy s =
  init
