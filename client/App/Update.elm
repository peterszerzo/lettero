module Update exposing (..)

import Json.Decode exposing (decodeString)
import Result

import Messages exposing (Msg(..))
import Models exposing (Model)
import Helpers exposing (setOwnGuess, getOwnGuess)
import Commands exposing (sendPlayerStatusUpdate, getRandomAngle)
import Room.Decoders exposing (roomDecoder)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ReceiveRoomState roomState ->
      let
        newRoom = decodeString roomDecoder roomState
          |> Result.toMaybe
        cmd = case model.room of
          Just room ->
            if ((Maybe.map (.round) model.room) /= (Maybe.map (.round) newRoom))
              then
                getRandomAngle ()
              else
                Cmd.none
          Nothing ->
            getRandomAngle ()
      in
      ( { model | room = newRoom }
      , cmd
      )
    ReceiveRandomAngle angle ->
      ( { model | angle = angle }
      , Cmd.none
      )
    Guess guess ->
      let
        canGuess = (getOwnGuess model) /= Just 0
        newModel = if canGuess then (setOwnGuess guess model) else model
        command  = if canGuess then (sendPlayerStatusUpdate newModel) else Cmd.none
      in
        (newModel, command)
