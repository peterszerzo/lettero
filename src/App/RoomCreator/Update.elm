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
                ! [ Cmd.none ]

        AddPlayer ->
            { model | playerIds = List.append model.playerIds [ "" ] }
                ! [ Cmd.none ]

        RemovePlayer i ->
            { model | playerIds = lTake i model.playerIds }
                ! [ Cmd.none ]

        SubmitCreateForm ->
            let
                room =
                    Room.create { roomId = model.roomId, playerIds = model.playerIds }
            in
                { model
                    | status = Processing
                    , room = Just room
                }
                    ! [ createRoomRequest (Room.encodeRoom room) ]

        ReceiveFormStatus statusString ->
            { model
                | status =
                    if statusString == "success" then
                        Success
                    else
                        Error
            }
                ! [ Cmd.none ]

        Navigate newUrl ->
            model ! [ Cmd.none ]
