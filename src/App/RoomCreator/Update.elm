module RoomCreator.Update exposing (..)

import Models.Room as Room
import Ports exposing (createRoomRequest)
import RoomCreator.Messages exposing (Msg(..))
import RoomCreator.Models exposing (Model, Status(..), stringifyCreateRoomRequest)


lTake : Int -> List a -> List a
lTake i l =
    List.concat
        [ List.take i l
        , List.drop (i + 1) l
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InputRoomId v ->
            { model | roomId = v }
                ! [ Cmd.none ]

        InputPlayer index v ->
            { model
                | playerIds =
                    List.indexedMap
                        (\i val ->
                            if i == index then
                                v
                            else
                                val
                        )
                        model.playerIds
            }
                ! []

        AddPlayer ->
            { model | playerIds = List.append model.playerIds [ "" ] }
                ! []

        RemovePlayer i ->
            { model | playerIds = lTake i model.playerIds }
                ! []

        SubmitCreateForm ->
            let
                room =
                    Room.create { roomId = model.roomId, playerIds = model.playerIds }
            in
                { model
                    | status = Processing
                }
                    ! [ createRoomRequest (Room.encodeItem room) ]

        ReceiveFormStatus statusString ->
            { model
                | status =
                    if statusString == "success" then
                        Success
                    else
                        Error
            }
                ! []

        Navigate newUrl ->
            model ! []
