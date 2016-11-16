port module Ports exposing (..)


port closeTab : (String -> msg) -> Sub msg


port createRoomRequest : String -> Cmd msg


port createRoomResponse : (String -> msg) -> Sub msg


port roomRequest : String -> Cmd msg


port roomResponse : (String -> msg) -> Sub msg
