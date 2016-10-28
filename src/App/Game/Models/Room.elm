module Game.Models.Room exposing (..)

import Json.Decode exposing (Decoder, (:=), string, object5, int, maybe, null, bool)

import Game.Models.Player as Player
import Game.Models.Guess as Guess
import Game.Models.RoundData as RoundData

type alias Room =
  { id : String
  , round : Int
  , roundData : RoundData.RoundData
  , hostId : String
  , players : List Player.Player
  }


-- Helpers

setGuess : Guess.Guess -> String -> Room -> Room
setGuess guess playerId room =
  let
    previousWinnerId = Player.getWinnerId room.players
    players =
      room.players
        |> List.map (\p -> if p.id == playerId then {p | guess = guess} else p)
    newWinnerId = Player.getWinnerId players
    players' = if (previousWinnerId == Nothing && newWinnerId == (Just playerId))
      then
        players
          |> List.map (\p -> if p.id == playerId then {p | score = p.score + 1} else p)
      else
        players
  in
    { room | players = players' }

getGuess : String -> Room -> Guess.Guess
getGuess playerId room =
  Player.unsafeFindById playerId room.players
    |> .guess

isRoundOver : Room -> Bool
isRoundOver room =
  let
    didSomeoneWin =
      room.players
        |> List.map (Guess.isCorrect << .guess)
        |> List.any identity
    didAllGuess =
      room.players
        |> List.map (Guess.isPending << .guess)
        |> List.any identity
        |> not
  in
    didSomeoneWin || didAllGuess

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
        Player.setReady playerId room.players
  }


-- Decoders

roomDecoder : Decoder Room
roomDecoder =
  object5 Room
    ("id" := string)
    ("round" := int)
    ("roundData" := RoundData.roundDataDecoder)
    ("hostId" := string)
    ("players" := Player.playersDecoder)
