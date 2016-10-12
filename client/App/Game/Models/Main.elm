module Game.Models.Main exposing (..)

import Time exposing (Time)

import Game.Models.Player exposing (Player, PlayerId)
import Game.Models.Room exposing (Room, RoomId, setGuess, getGuess)
import Game.Models.Guess as Guess

type alias Flags =
  { roomId : RoomId
  , playerId : PlayerId
  , host : String
  }

type alias Game =
  { room : Maybe Room
  , roomId : RoomId
  , playerId : PlayerId
  , angle : Int
  , host : String
  , time : Time
  }


-- Helpers

getDummy : String -> Game
getDummy s =
  { room = Nothing
  , roomId = "1"
  , playerId = "2"
  , angle = 0
  , host = "3"
  , time = 0
  }

getWebSocketUrl : Game -> String
getWebSocketUrl model =
  model.host ++ "/ws/" ++ model.roomId

setOwnGuess : Int -> Game -> Game
setOwnGuess guessValue model =
  { model
      | room =
          model.room
            |> Maybe.map (setGuess ({value = Guess.Made guessValue, time = model.time}) model.playerId)
  }

getOwnGuess : Game -> Maybe Guess.Guess
getOwnGuess model =
  model.room
    |> Maybe.map (getGuess model.playerId)
