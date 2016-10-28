port module Game.Ports exposing (..)

-- Inbound port
port getRoom : (String -> msg) -> Sub msg

-- Outbound port
port send : String -> Cmd msg
