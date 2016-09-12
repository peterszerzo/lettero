module Helpers exposing (..)

import Models exposing (Model)
import Room.Helpers exposing (setGuess, getGuess)
import Guess.Models exposing (Guess, GuessValue)
import Models exposing (Model)

getWebSocketUrl : Model -> String
getWebSocketUrl model =
  model.host ++ "/ws/" ++ model.roomId

setOwnGuess : GuessValue -> Model -> Model
setOwnGuess guessValue model =
  { model
      | room =
          model.room
            |> Maybe.map (setGuess (Guess guessValue model.time) model.playerId)
  }

getOwnGuess : Model -> Maybe Guess
getOwnGuess model =
  model.room
    |> Maybe.map (getGuess model.playerId)
    |> Maybe.withDefault Nothing
