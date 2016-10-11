module Game.Models.App exposing (..)

import Time exposing (Time)

import Game.Models.Player exposing (Player, PlayerId)
import Game.Models.Room exposing (Room, RoomId, setGuess, getGuess)
import Game.Models.Guess as Guess

type alias Flags =
  { roomId : RoomId
  , playerId : PlayerId
  , host : String
  }

type alias Model =
  { room : Maybe Room
  , roomId : RoomId
  , playerId : PlayerId
  , angle : Int
  , host : String
  , time : Time
  }


-- Helpers

getWebSocketUrl : Model -> String
getWebSocketUrl model =
  model.host ++ "/ws/" ++ model.roomId

setOwnGuess : Int -> Model -> Model
setOwnGuess guessValue model =
  { model
      | room =
          model.room
            |> Maybe.map (setGuess ({value = Guess.Made guessValue, time = model.time}) model.playerId)
  }

getOwnGuess : Model -> Maybe Guess.Guess
getOwnGuess model =
  model.room
    |> Maybe.map (getGuess model.playerId)
