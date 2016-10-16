module Game.Update exposing (..)

import Json.Decode exposing (decodeString)
import Result

import Game.Messages exposing (Msg(..))
import Game.Models.Main exposing (Model, setOwnGuess, getOwnGuess)
import Game.Models.Room exposing (roomDecoder, setReady, canGuess)
import Game.Commands exposing (sendPlayerStatusUpdate, getRoundRandom)
import Game.Constants exposing (tickDuration)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ReceiveRoomState roomState ->
      let
        newRoom = decodeString roomDecoder roomState
          |> Result.toMaybe
        didRoundChange = (Maybe.map (.round) model.room) /= (Maybe.map (.round) newRoom)
        newTime = if didRoundChange then 0 else model.time
        cmd = case model.room of
          Just room ->
            if didRoundChange
              then
                getRoundRandom ()
              else
                Cmd.none
          Nothing ->
            getRoundRandom ()
      in
        ( { model | room = newRoom, time = newTime }
        , cmd
        )

    ReceiveRoundRandom roundRandom ->
      ( { model | roundRandom = roundRandom }
      , Cmd.none
      )

    MakeGuess guessValue ->
      let
        canMakeGuess =
          model.room
            |> Maybe.map (canGuess model.playerId)
            |> Maybe.withDefault False
        newModel = if canMakeGuess then (setOwnGuess guessValue model) else model
        command  = if canMakeGuess then (sendPlayerStatusUpdate newModel) else Cmd.none
      in
        (newModel, command)

    Tick tick ->
      ({ model | time = model.time + tickDuration }, Cmd.none)

    SetReady ->
      let
        newRoom =
          model.room
            |> Maybe.map (setReady model.playerId)
        newModel =
          {model | room = newRoom}
        command = sendPlayerStatusUpdate newModel
      in
        (newModel, command)
