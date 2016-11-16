module RoomCreator.Messages exposing (..)


type Msg
    = InputRoomId String
    | InputPlayer Int String
    | AddPlayer
    | RemovePlayer Int
    | SubmitCreateForm
    | ReceiveFormStatus String
    | Navigate String
    | NoOp
