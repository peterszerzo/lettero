module RoomManager.Models exposing (..)

import String

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


-- Helpers

canSubmit : Model -> Bool
canSubmit {roomId, playerIds} =
  (
    String.length roomId > 0
  ) &&
  (
    playerIds
      |> List.map ((\i -> i > 0) << String.length)
      |> List.all identity
  )
