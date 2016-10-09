module Models.Room exposing (..)

import Json.Decode exposing (Decoder, (:=), string, object4, int, maybe, null, bool)

import Models.Player exposing (Player, PlayerId, playersDecoder)
import Models.Guess as Guess

type alias RoomId = String

type alias Room =
  { id : RoomId
  , round : Int
  , word : String
  , players : List Player
  }


-- Helpers

setGuess : Guess.Guess -> PlayerId -> Room -> Room
setGuess guess playerId room =
  let
    players =
      room.players
        |> List.map (\p -> if p.id == playerId then {p | guess = guess} else p)
  in
    {room | players = players}

getGuess : PlayerId -> Room -> Guess.Guess
getGuess playerId room =
  Models.Player.findById playerId room.players
    |> .guess

isRoundOver : Room -> Bool
isRoundOver room =
  let
    didSomeoneWin =
      room.players
        |> List.map (((==) (Guess.Made 0)) << .value << .guess)
        |> List.any identity
    didAllGuess =
      room.players
        |> List.map ((/=) (Guess.Pending) << .value << .guess)
        |> List.all identity
  in
    didSomeoneWin || didAllGuess

canGuess : PlayerId -> Room -> Bool
canGuess playerId room =
  let
    playerDidNotGuess =
      Models.Player.findById playerId room.players
        |> ((==) Guess.Pending << .value << .guess)
  in
    playerDidNotGuess && (not (isRoundOver room))

setReady : PlayerId -> Room -> Room
setReady playerId room =
  { room |
      players =
        List.map (\player -> if (playerId == player.id) then {player | isReady = True} else player) room.players
  }


-- Decoders

roomDecoder : Decoder Room
roomDecoder =
  object4 Room
    ("id" := string)
    ("round" := int)
    ("word" := string)
    ("players" := playersDecoder)
