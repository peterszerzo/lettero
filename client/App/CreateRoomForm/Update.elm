module CreateRoomForm.Update exposing (..)

import CreateRoomForm.Messages exposing (Msg)
import CreateRoomForm.Models exposing (Model)

update : Msg -> Model -> Model
update msg model =
  case msg of
    Input k v ->
      {model | values = Dict.insert k v model.values}
    Activate ->
      {model | isActive = True}
    Deactivate ->
      {model | isActive = False}
