module CreateRoomForm.Update exposing (..)

import CreateRoomForm.Messages exposing (Msg(..))
import CreateRoomForm.Models exposing (Model, Status)

update : Msg -> Model -> Model
update msg model =
  case msg of
    Input v ->
      { model | roomId = v }

    ChangeStatus status ->
      { model | status = status }
