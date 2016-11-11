module RoomCreator.Messages exposing (..)

type Msg
  = InputRoomId String
  | InputPlayer Int String
  | AddPlayer
  | SubmitCreateForm
  | ReceiveFormStatus String
  | Navigate String
  | NoOp
