module Game.Models.Main exposing (..)

import Time exposing (Time)

import Game.Models.Player exposing (Player, PlayerId)
import Game.Models.Room exposing (Room, RoomId, setGuess, getGuess)
import Game.Models.Guess as Guess

type alias Flags =
  { roomId : RoomId
  , playerId : PlayerId
  , websocketHost : String
  }

type alias Model =
  { room : Maybe Room
  , roomId : RoomId
  , playerId : PlayerId
  , roundRandom : Int
  , websocketHost : String
  , time : Time
  }


-- Helpers

getDummy : String -> Model
getDummy s =
  { room = Nothing
  , roomId = "1"
  , playerId = "2"
  , roundRandom = 0
  , websocketHost = "3"
  , time = 0
  }

getWebSocketUrl : Model -> String
getWebSocketUrl model =
  model.websocketHost ++ "/ws/" ++ model.roomId

setOwnGuess : Int -> Model -> Model
setOwnGuess guessValue model =
  let
    guess =
      { value = Guess.Made guessValue
      , time = model.time
      }
  in
    { model
        | room =
            model.room
              |> Maybe.map (setGuess guess model.playerId)
    }

getOwnGuess : Model -> Maybe Guess.Guess
getOwnGuess model =
  model.room
    |> Maybe.map (getGuess model.playerId)
