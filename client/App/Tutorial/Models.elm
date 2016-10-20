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


-- Helpers

getDummy : String -> Model
getDummy s =
  init

getDialogContent : Model -> String
getDialogContent {stage} =
  case stage of
    Start ->
      "Heyyo. Ready for your word? Click me!"

    ShowWord ->
      "Holy moly, who writes like that? It'll take decades to find the first letter of this word and click it!"

    CorrectGuess ->
      "Right on, bud, right on. Honestly, there's nothing more to this game."

    IncorrectGuess ->
      "Not quite, not quite. Give it one more go?"
