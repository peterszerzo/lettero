module Helpers exposing (..)

import Models exposing (Model)
import Room.Helpers exposing (setGuess, getGuess)
import Models exposing (Model)

getWebSocketUrl : Model -> String
getWebSocketUrl model =
  model.host ++ "/ws/" ++ model.roomId

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
