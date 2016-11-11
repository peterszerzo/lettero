module RoomCreator.Update exposing (..)

import Models.Room as Room
import Ports exposing (createRoomRequest)
import RoomCreator.Messages exposing (Msg(..))
import RoomCreator.Models exposing (Model, Status(..), stringifyCreateRoomRequest)

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

    AddPlayer ->
      ( { model | playerIds = List.append model.playerIds [""] }
      , Cmd.none
      , Nothing
      )

    SubmitCreateForm ->
      let
        room =
          Room.create {roomId = model.roomId, playerIds = model.playerIds}
      in
        ( { model
              | status = Processing
              , room = Just room
          }
        , createRoomRequest (Room.encodeRoom room)
        , Nothing
        )

    ReceiveFormStatus statusString ->
      let
        status =
          if statusString == "success" then Success else Error
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

    NoOp ->
      ( model
      , Cmd.none
      , Nothing
      )
