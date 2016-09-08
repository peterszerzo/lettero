module Helpers exposing (..)

import Models exposing (Model)
import Room.Helpers exposing (setGuess, getGuess)
import Room.Models exposing (RoomId)
import Constants exposing (host)

getWebSocketUrl : RoomId -> String
getWebSocketUrl roomId =
  "ws://" ++ host ++ "/ws/" ++ roomId

setOwnGuess : Int -> Model -> Model
setOwnGuess guess model =
  { model
      | room =
          model.room
            |> Maybe.map (setGuess guess model.playerId)
  }

getOwnGuess : Model -> Maybe Int
getOwnGuess model =
  model.room
    |> Maybe.map (getGuess model.playerId)
    |> Maybe.withDefault Nothing
