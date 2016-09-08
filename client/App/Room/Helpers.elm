module Room.Helpers exposing (..)

import Player.Models exposing (PlayerId)
import Room.Models exposing (Room)
import PlayerStatusUpdate.Models exposing (PlayerStatusUpdate)

areAllPlayersReady : Room -> Bool
areAllPlayersReady room =
  room.players
    |> List.map (.isReady)
    |> List.foldl (&&) True

getPlayerStatusUpdate : PlayerId -> Room -> PlayerStatusUpdate
getPlayerStatusUpdate playerId room =
  let
    guess =
      room.players
        |> List.filter (\player -> player.id == playerId)
        |> List.head
        |> Maybe.map (.guess)
        |> Maybe.withDefault (Just 0)
  in
    { roomId = room.id
    , playerId = playerId
    , round = room.round
    , guess = guess
    }

setGuess : Int -> PlayerId -> Room -> Room
setGuess guess playerId room =
  let
    players =
      room.players
        |> List.map (\player -> if player.id == playerId then {player | guess = Just guess} else player)
  in
    {room | players = players}

getGuess : PlayerId -> Room -> Maybe Int
getGuess playerId room =
  room.players
    |> List.filter (\player -> player.id == playerId)
    |> List.head
    |> Maybe.map .guess
    |> Maybe.withDefault Nothing
