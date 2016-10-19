module Tutorial.Models exposing (..)

type Stage
  = Start
  | ShowWord
  | CorrectGuess
  | IncorrectGuess

type alias Model =
  { stage : Stage
  }

init : Model
init =
  { stage = Start
  }

getDummy : String -> Model
getDummy s =
  init
