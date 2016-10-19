module RoomManager.Update exposing (..)

import RoomManager.Messages exposing (Msg(..))
import RoomManager.Models exposing (Model, Status)

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

    ChangeStatus status ->
      ( { model | status = status }
      , Cmd.none
      , Nothing
      )

    Navigate newUrl ->
      ( model
      , Cmd.none
      , Just newUrl
      )
