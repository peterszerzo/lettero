module CreateRoomForm.Models exposing (..)

type Status
  = Startup
  | Editing
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
  , status = Startup
  }

getDummy : String -> Model
getDummy s =
  init
