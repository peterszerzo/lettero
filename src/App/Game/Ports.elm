port module Game.Ports exposing (..)


port roomStateUpdate : (String -> msg) -> Sub msg


port sendGameCommand : String -> Cmd msg
