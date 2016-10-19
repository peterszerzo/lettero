module Tutorial.Update exposing (..)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model, Stage(..))

update : Msg -> Model -> (Model, Cmd Msg, Maybe String)
update msg model =
  case msg of
    StartTutorial ->
      ( { model
            | stage =
                if model.stage == Start
                  then
                    ShowWord
                  else
                    model.stage
        }
      , Cmd.none
      , Nothing
      )

    Navigate newUrl ->
      ( model, Cmd.none, Just newUrl )

    ClickLetter i ->
      ( { model | stage = if i == 0 then CorrectGuess else IncorrectGuess }, Cmd.none, Nothing )
