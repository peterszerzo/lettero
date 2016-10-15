module CreateRoomForm.Update exposing (..)

import CreateRoomForm.Messages exposing (Msg(..))
import CreateRoomForm.Models exposing (CreateRoomForm)

update : Msg -> CreateRoomForm -> CreateRoomForm
update msg model =
  case msg of
    Input v ->
      { model | roomId = v } |> Debug.log "formState"
