module RoomManager.Messages exposing (..)

type Msg
  = InputRoomId String
  | InputPlayer Int String
  | StartCreateForm
  | SubmitCreateForm
  | ReceiveFormStatus String
  | Navigate String
