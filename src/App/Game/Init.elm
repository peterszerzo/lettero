module Game.Init exposing (init)

import Game.Models.Main exposing (Model)
import Game.Messages exposing (Msg)
import Game.Commands exposing (requestRoomState)

init : {roomId : String, playerId : String} -> (Model, Cmd Msg)
init {roomId, playerId} =
  let
    model =
      { room = Nothing
      , roomId = roomId
      , playerId = playerId
      , currentRoundRandom = 0
      , currentRoundTime = 0
      }
  in
  ( model
  , requestRoomState model
  )
