module Game.Init exposing (init)

import Game.Models.Main exposing (Model, Flags)
import Game.Messages exposing (Msg)
import Game.Commands exposing (requestRoomState)

init : Flags -> (Model, Cmd Msg)
init {roomId, playerId, websocketHost} =
  let
    model =
      { room = Nothing
      , roomId = roomId
      , playerId = playerId
      , websocketHost = websocketHost
      , roundRandom = 0
      , time = 0
      }
  in
  ( model
  , requestRoomState model
  )
