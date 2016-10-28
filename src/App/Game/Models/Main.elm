module Game.Models.Main exposing (..)

import Time exposing (Time)

import Game.Models.Room as Room
import Game.Models.Guess as Guess

type alias Model =
  { room : Maybe Room.Room
  , roomId : String
  , playerId : String
  , currentRoundRandom : Int
  , currentRoundTime : Time
  }


-- Helpers

getDummy : String -> Model
getDummy s =
  { room = Nothing
  , roomId = "1"
  , playerId = "2"
  , currentRoundRandom = 0
  , currentRoundTime = 0
  }

setOwnGuess : Int -> Model -> Model
setOwnGuess guessValue model =
  let
    guess =
      { value = Guess.Made guessValue
      , time = model.currentRoundTime
      }
  in
    { model
        | room =
            model.room
              |> Maybe.map (Room.setGuess guess model.playerId)
    }

getOwnGuess : Model -> Maybe Guess.Guess
getOwnGuess model =
  model.room
    |> Maybe.map (Room.getGuess model.playerId)

isRoundJustOver : Model -> Model -> Bool
isRoundJustOver oldModel newModel =
  Maybe.map2
    (\oldRm newRm -> (not (Room.isRoundOver oldRm)) && (Room.isRoundOver newRm))
    oldModel.room
    newModel.room
      |> (==) (Just True)
