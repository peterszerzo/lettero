module Game.Messages exposing (..)

import Time exposing (Time)


type Msg
    = ReceiveRoomState String
    | MakeGuess Int
    | ReceiveRoundRandom Int
    | Tick Time
    | SetReady
    | LeaveRoom String
    | Navigate String


newPath : Msg -> Maybe String
newPath msg =
    case msg of
        Navigate pth ->
            Just pth

        _ ->
            Nothing
