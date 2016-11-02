port module Ports exposing (..)

port roomResponse : (String -> msg) -> Sub msg

port roomRequest : String -> Cmd msg
