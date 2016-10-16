module Helpers exposing (..)

import Game.Init
import Game.Models.Main exposing (Model)
import Game.Messages exposing (Msg)

initGame : String -> String -> String -> (Model, Cmd Msg)
initGame roomId playerId websocketHost =
  Game.Init.init
    { roomId = roomId
    , playerId = playerId
    , websocketHost = websocketHost
    }
