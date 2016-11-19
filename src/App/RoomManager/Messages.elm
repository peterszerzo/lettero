module RoomManager.Messages exposing (..)


type Msg
    = ReceiveRoom String
    | Navigate String

newPath : Msg -> Maybe String
newPath msg =
    case msg of
        Navigate pth ->
            Just pth

        _ ->
            Nothing
