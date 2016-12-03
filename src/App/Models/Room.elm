module Models.Room exposing (..)

import Dict
import Json.Decode as JD
import Json.Encode as JE
import Models.Player as Player
import Models.Guess as Guess
import Models.RoundData as RoundData


type alias RoomRaw =
    { playerIds : List String
    , roomId : String
    }


type alias Room =
    { id : String
    , round : Int
    , roundData : RoundData.RoundData
    , hostId : String
    , players : Player.Players
    }



-- Helpers


getDummy : String -> Room
getDummy id_ =
    create { roomId = id_, playerIds = [] }


create : RoomRaw -> Room
create { roomId, playerIds } =
    { id = roomId
    , round = 0
    , roundData = RoundData.getDummy "s"
    , hostId =
        List.head playerIds
            |> Maybe.withDefault ""
    , players =
        playerIds
            |> List.map (\id_ -> ( id_, Player.getDummy id_ ))
            |> Dict.fromList
    }


setGuess : Guess.Guess -> String -> Room -> Room
setGuess guess playerId room =
    let
        previousWinnerId =
            Player.getWinnerId room.players

        players =
            Player.update (\p -> { p | guess = guess }) playerId room.players

        newWinnerId =
            Player.getWinnerId players
    in
        { room
            | players =
                if (previousWinnerId == Nothing && newWinnerId == (Just playerId)) then
                    Player.update (\p -> { p | score = p.score + 1 }) playerId players
                else
                    players
        }


getGuess : String -> Room -> Guess.Guess
getGuess playerId room =
    Player.unsafeFindById playerId room.players
        |> .guess


isRoundOver : Room -> Bool
isRoundOver { players } =
    (Player.didSomeoneWin players) || (Player.didAllGuess players)


setNewRound : Room -> Room
setNewRound room =
    { room
        | round = room.round + 1
        , players = Dict.map (\id p -> { p | guess = { time = 0, status = Guess.Pending } }) room.players
    }


canGuess : String -> Room -> Bool
canGuess playerId room =
    let
        playerDidNotGuess =
            Player.unsafeFindById playerId room.players
                |> ((==) Guess.Pending << .status << .guess)
    in
        playerDidNotGuess && (not (isRoundOver room))


setReady : String -> Room -> Room
setReady playerId room =
    { room
        | players =
            Player.update (\p -> { p | isReady = True }) playerId room.players
    }



-- Encoders


itemEncoder : Room -> JE.Value
itemEncoder { id, round, roundData, hostId, players } =
    JE.object
        [ ( "id", JE.string id )
        , ( "round", JE.int round )
        , ( "roundData", RoundData.itemEncoder roundData )
        , ( "hostId", JE.string hostId )
        , ( "players", Player.itemsEncoder players )
        ]


encodeItem : Room -> String
encodeItem =
    (JE.encode 0) << itemEncoder



-- Decoders


itemDecoder : JD.Decoder Room
itemDecoder =
    JD.map5 Room
        (JD.field "id" JD.string)
        (JD.field "round" JD.int)
        (JD.field "roundData" RoundData.itemDecoder)
        (JD.field "hostId" JD.string)
        (JD.field "players" Player.itemsDecoder)
