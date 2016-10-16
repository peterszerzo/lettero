module Game.Update exposing (..)

import Json.Decode exposing (decodeString)
import Result

import Game.Messages exposing (Msg(..))
import Game.Models.Main exposing (Model, setOwnGuess, getOwnGuess, isRoundJustOver)
import Game.Models.Room as Room
import Game.Commands exposing (sendPlayerStatusUpdate, getRoundRandom, requestNewRound)
import Game.Constants exposing (tickDuration)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ReceiveRoomState roomState ->
      let
        newRoom = decodeString Room.roomDecoder roomState
          |> Result.toMaybe
        didRoundChange = (Maybe.map (.round) model.room) /= (Maybe.map (.round) newRoom)
        newTime = if didRoundChange then 0 else model.time

        newModel = { model | room = newRoom, time = newTime }
        shouldCloseRound =
          (isRoundJustOver model newModel) && (Just model.playerId == Maybe.map (.hostId) model.room)
        cmd = case model.room of
          Just room ->
            if didRoundChange
              then
                getRoundRandom ()
              else
                Cmd.none
          Nothing ->
            getRoundRandom ()
        cmd' = Cmd.batch [cmd, if shouldCloseRound then (requestNewRound model) else Cmd.none]
      in
        ( newModel
        , cmd'
        )

    ReceiveRoundRandom roundRandom ->
      ( { model | roundRandom = roundRandom }
      , Cmd.none
      )

    MakeGuess guessValue ->
      let
        canMakeGuess =
          model.room
            |> Maybe.map (Room.canGuess model.playerId)
            |> Maybe.withDefault False
        newModel = if canMakeGuess then (setOwnGuess guessValue model) else model
        cmd  = if canMakeGuess then (sendPlayerStatusUpdate newModel) else Cmd.none
        shouldCloseRound =
          (isRoundJustOver model newModel) && (Just model.playerId == Maybe.map (.hostId) model.room)
        cmd' = Cmd.batch [cmd, if shouldCloseRound then (requestNewRound model) else Cmd.none]
      in
        ( newModel
        , cmd'
        )

    Tick tick ->
      ({ model | time = model.time + tickDuration }, Cmd.none)

    SetReady ->
      let
        newRoom =
          model.room
            |> Maybe.map (Room.setReady model.playerId)
        newModel =
          {model | room = newRoom}
        command = sendPlayerStatusUpdate newModel
      in
        (newModel, command)
