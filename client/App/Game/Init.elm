module Game.Init exposing (init)

import Game.Models.App exposing (Flags, Model)
import Game.Messages exposing (Msg)
import Game.Commands exposing (requestRoomState)

init : Flags -> (Model, Cmd Msg)
init {roomId, playerId, host} =
  let
    model = Model Nothing roomId playerId 0 host 0
  in
  ( model
  , requestRoomState model
  )
