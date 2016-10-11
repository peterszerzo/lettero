module Helpers exposing (..)

import Router exposing (Route(..))
import Game.Init

initGame model =
  case model.route of
    GamePlay roomId playerId ->
      Game.Init.init {roomId = roomId, playerId = playerId, host = model.websocketHost}
        |> Just
    Home ->
      Nothing
    Rooms ->
      Nothing
    Room roomId ->
      Nothing
    About ->
      Nothing
    NotFound ->
      Nothing
