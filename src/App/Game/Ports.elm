port module Game.Ports exposing (..)

-- Inbound port
port roomStateUpdate : (String -> msg) -> Sub msg

-- Outbound port
port sendGameCommand : String -> Cmd msg
