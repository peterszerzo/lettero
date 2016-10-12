module Helpers exposing (..)

import Game.Init
import Game.Models.Main exposing (Game)
import Game.Messages exposing (Msg)

initGame : String -> String -> String -> (Game, Cmd Msg)
initGame roomId playerId websocketHost =
  Game.Init.init
    { roomId = roomId
    , playerId = playerId
    , host = websocketHost
    }
