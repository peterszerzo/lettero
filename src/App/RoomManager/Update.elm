module RoomManager.Update exposing (..)

import Json.Decode as JD
import Models.Room as Room
import RoomManager.Messages exposing (Msg(..))
import RoomManager.Models exposing (Model, Stage(..))


update : Msg -> Model -> ( Model, Cmd Msg, Maybe String )
update msg model =
    case msg of
        NoOp ->
            ( model
            , Cmd.none
            , Nothing
            )

        ReceiveRoom roomString ->
            let
                room =
                    JD.decodeString Room.roomDecoder roomString
                        |> Result.toMaybe
            in
                ( { model | room = room, stage = Base }
                , Cmd.none
                , Nothing
                )
