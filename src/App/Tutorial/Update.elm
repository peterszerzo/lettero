module Tutorial.Update exposing (..)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model, Stage(..))

update : Msg -> Model -> (Model, Cmd Msg, Maybe String)
update msg model =
  case msg of
    Proceed ->
      ( { model
            | stage =
                if model.stage == Start
                  then
                    ShowWord
                  else
                    model.stage
        }
      , Cmd.none
      , if (model.stage == ShowWord && model.guess == (Just 0)) then
          Just "/new"
        else
          Nothing
      )

    Navigate newUrl ->
      ( model, Cmd.none, Just newUrl )

    Guess i ->
      ( { model
            | guess =
                Just i
        }
      , Cmd.none
      , Nothing
      )
