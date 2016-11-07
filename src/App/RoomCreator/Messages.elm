module RoomCreator.Messages exposing (..)

type Msg
  = InputRoomId String
  | InputPlayer Int String
  | SubmitCreateForm
  | ReceiveFormStatus String
  | Navigate String
  | NoOp
