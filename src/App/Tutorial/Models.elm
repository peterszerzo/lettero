module Tutorial.Models exposing (..)

type Stage
  = Start
  | ShowWord

type alias Model =
  { stage : Stage
  , guess : Maybe Int
  }

init : Model
init =
  { stage = Start
  , guess = Nothing
  }


-- Helpers

getDummy : String -> Model
getDummy s =
  init

getDialogContent : Model -> String
getDialogContent {stage, guess} =
  case stage of
    Start ->
      "Heyyo. Ready for your word? Click me!"

    ShowWord ->
      case guess of
        Nothing ->
          "Holy moly, who writes like that? It’ll take decades to find the first letter of this word and click it!"

        Just i ->
          if i == 0 then
            "Hedgehog allright. Now make sure you beat your opponent to it. Click me to head back to the home screen."
          else
            "Not quite, not quite. Give it one more go?"
