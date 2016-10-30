module RoomManager.Update exposing (..)

import Models.Room as Room
import RoomManager.Messages exposing (Msg(..))
import RoomManager.Models exposing (Model, Status(..), stringifyCreateRoomRequest)
import RoomManager.Ports exposing (createRoomRequest)

update : Msg -> Model -> (Model, Cmd Msg, Maybe String)
update msg model =
  case msg of
    InputRoomId v ->
      ( { model | roomId = v }
      , Cmd.none
      , Nothing
      )

    InputPlayer index v ->
      ( { model | playerIds = List.indexedMap (\i val -> if i == index then v else val) model.playerIds }
      , Cmd.none
      , Nothing
      )

    SubmitCreateForm ->
      let
        room =
          Room.create {roomId = model.roomId, playerIds = model.playerIds}
      in
        ( { model
              | status = RoomCreateProcessing
              , room = Just room
          }
        , createRoomRequest (Room.encodeRoom room)
        , Nothing
        )

    StartCreateForm ->
      ( { model | status = RoomCreateEditing }
      , Cmd.none
      , Nothing
      )

    ReceiveFormStatus statusString ->
      let
        status =
          if statusString == "success" then RoomCreateSuccess else RoomCreateError
      in
        ( { model | status = status }
        , Cmd.none
        , Nothing
        )

    Navigate newUrl ->
      ( model
      , Cmd.none
      , Just newUrl
      )
