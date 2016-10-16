module Game.Init exposing (init)

import Game.Models.Main exposing (Game, Flags)
import Game.Messages exposing (Msg)
import Game.Commands exposing (requestRoomState)

init : Flags -> (Game, Cmd Msg)
init {roomId, playerId, host} =
  let
    model =
      { room = Nothing
      , roomId = roomId
      , playerId = playerId
      , host = host
      , angle = 0
      , time = 0
      }
  in
  ( model
  , requestRoomState model
  )
