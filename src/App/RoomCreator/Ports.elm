port module RoomCreator.Ports exposing (..)

port createRoomResponse : (String -> msg) -> Sub msg

port createRoomRequest : String -> Cmd msg
