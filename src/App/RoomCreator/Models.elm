module RoomCreator.Models exposing (..)

import String
import RoomCreator.Messages exposing (Msg)


type Status
    = Editing
    | Processing
    | Success
    | Error


type alias Model =
    { roomId : String
    , playerIds : List String
    , status : Status
    }


init : ( Model, Cmd Msg )
init =
    { roomId = ""
    , playerIds = [ "", "" ]
    , status = Editing
    }
        ! []



-- Helpers


canSubmit : Model -> Bool
canSubmit { roomId, playerIds } =
    (String.length roomId > 0)
        && (playerIds
                |> List.map ((\i -> i > 0) << String.length)
                |> List.all identity
           )


stringifyCreateRoomRequest : Model -> String
stringifyCreateRoomRequest { roomId, playerIds } =
    ("{\"roomId\": \"" ++ roomId ++ "\", \"playerIds\": " ++ (toString playerIds) ++ "}")
