module Init exposing (init)

import Models.App exposing (Flags, Model)
import Messages exposing (Msg)
import Commands exposing (requestRoomState)

init : Flags -> (Model, Cmd Msg)
init {roomId, playerId, host} =
  let
    model = Model Nothing roomId playerId 0 host 0
  in
  ( model
  , requestRoomState model
  )
