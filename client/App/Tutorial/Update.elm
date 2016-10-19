module Tutorial.Update exposing (..)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model)

update : Msg -> Model -> (Model, Cmd Msg, Maybe String)
update msg model =
  case msg of
    ChangeStage stage ->
      ( { model | stage = stage }, Cmd.none, Nothing )

    Navigate newUrl ->
      ( model, Cmd.none, Just newUrl )
