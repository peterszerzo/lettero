module RoomManager.Update exposing (..)

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
      ( { model | status = Processing }
      , createRoomRequest (stringifyCreateRoomRequest model)
      , Nothing
      )

    StartCreateForm ->
      ( { model | status = Editing }
      , Cmd.none
      , Nothing
      )

    ReceiveFormStatus s ->
      ( model
      , Cmd.none
      , Nothing
      )

    Navigate newUrl ->
      ( model
      , Cmd.none
      , Just newUrl
      )
