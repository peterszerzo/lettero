module RoomCreator.Messages exposing (..)


type Msg
    = InputRoomId String
    | InputPlayer Int String
    | AddPlayer
    | RemovePlayer Int
    | SubmitCreateForm
    | ReceiveFormStatus String
    | Navigate String


newPath : Msg -> Maybe String
newPath msg =
    case msg of
        Navigate pth ->
            Just pth

        _ ->
            Nothing
