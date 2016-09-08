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
      ( { model
            | room =
                decodeString roomDecoder roomState
                  |> Result.toMaybe
        }
      , getRandomAngle ()
      )
    ReceiveRandomAngle angle ->
      ( { model | angle = angle }
      , Cmd.none
      )
    Guess guess ->
      let
        canGuess = (getOwnGuess model) == Nothing
        newModel = if canGuess then (setOwnGuess guess model) else model
        command  = if canGuess then (sendPlayerStatusUpdate newModel) else Cmd.none
      in
        (newModel, command)
