module Init exposing (init)

import Models exposing (Flags, Model)
import Messages exposing (Msg)
import Commands exposing (requestRoomState)

init : Flags -> (Model, Cmd Msg)
init {roomId, playerId, host, envPort} =
  let
    model = Model Nothing roomId playerId 0 host envPort
  in
  ( model
  , requestRoomState model
  )
