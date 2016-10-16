module CreateRoomForm.Models exposing (..)

type Status
  = Editing
  | Processing
  | Error String
  | Success

type alias Model =
  { roomId : String
  , playerIds : List String
  , status : Status
  }

init : Model
init =
  { roomId = ""
  , playerIds = []
  , status = Editing
  }

getDummy : String -> Model
getDummy s =
  init
