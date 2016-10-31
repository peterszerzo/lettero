module Models.Room exposing (..)

import Dict
import Json.Decode exposing (Decoder, (:=), string, object5, int, maybe, null, bool)
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
  create {roomId = id_, playerIds = []}

create : RoomRaw -> Room
create {roomId, playerIds} =
  { id = roomId
  , round = 0
  , roundData = RoundData.getDummy "s"
  , hostId =
      List.head playerIds
        |> Maybe.withDefault ""
  , players =
      playerIds
        |> List.map (\id_ -> (id_, Player.getDummy id_))
        |> Dict.fromList
  }

setGuess : Guess.Guess -> String -> Room -> Room
setGuess guess playerId room =
  let
    previousWinnerId = Player.getWinnerId room.players
    players =
      Player.update (\p -> { p | guess = guess }) playerId room.players
    newWinnerId = Player.getWinnerId players
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
isRoundOver {players} =
  (Player.didSomeoneWin players) || (Player.didAllGuess players)

canGuess : String -> Room -> Bool
canGuess playerId room =
  let
    playerDidNotGuess =
      Player.unsafeFindById playerId room.players
        |> ((==) Guess.Pending << .value << .guess)
  in
    playerDidNotGuess && (not (isRoundOver room))

setReady : String -> Room -> Room
setReady playerId room =
  { room |
      players =
        Player.update (\p -> { p | isReady = True }) playerId room.players
  }


-- Encoders

roomEncoder : Room -> JE.Value
roomEncoder { id, round, roundData, hostId, players } =
  JE.object
    [ ( "id", JE.string id )
    , ( "round", JE.int round )
    , ( "roundData", RoundData.roundDataEncoder roundData )
    , ( "hostId", JE.string hostId )
    , ( "players", Player.playersEncoder players )
    ]

encodeRoom : Room -> String
encodeRoom =
  (JE.encode 0) << roomEncoder


-- Decoders

roomDecoder : Decoder Room
roomDecoder =
  object5 Room
    ("id" := string)
    ("round" := int)
    ("roundData" := RoundData.roundDataDecoder)
    ("hostId" := string)
    ("players" := Player.playersDecoder)
