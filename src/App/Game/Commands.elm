module Game.Commands exposing (..)

import Game.Ports exposing (send)
import Random

import Game.Messages exposing (Msg(..))
import Game.Models.Player as Player
import Game.Models.Main exposing (Model)

sendPlayerStatusUpdate : Model -> Cmd Msg
sendPlayerStatusUpdate model =
  let
    encodedPlayer =
      model.room
        |> Maybe.map .players
        |> Maybe.map (Player.unsafeFindById model.playerId)
        |> Maybe.map Player.encodePlayer
        |> Maybe.withDefault ""
  in
    send
      (
        "{\"type\": \"player\"" ++
        ", \"roomId\": \"" ++ model.roomId ++
        "\", \"payload\": " ++ encodedPlayer ++
        "}"
      )

requestRoomState : Model -> Cmd Msg
requestRoomState model =
  send ("{\"type\": \"requestRoomState\", \"roomId\": \"" ++ model.roomId ++ "\"}")

requestNewRound : Model -> Cmd Msg
requestNewRound model =
  send ("{\"type\": \"requestNewRound\", \"roomId\": \"" ++ model.roomId ++ "\"}")

requestRoundRandom : () -> Cmd Msg
requestRoundRandom _ =
  Random.int 0 1000
    |> Random.generate ReceiveRoundRandom
