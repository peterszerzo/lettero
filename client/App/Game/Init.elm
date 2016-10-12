module Game.Init exposing (init)

import Game.Models.Main exposing (Game, Flags)
import Game.Messages exposing (Msg)
import Game.Commands exposing (requestRoomState)

init : Flags -> (Game, Cmd Msg)
init {roomId, playerId, host} =
  let
    model = Game Nothing roomId playerId 0 host 0
  in
  ( model
  , requestRoomState model
  )
