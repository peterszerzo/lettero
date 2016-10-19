module Tutorial.Messages exposing (..)

import Tutorial.Models

type Msg
  = ChangeStage Tutorial.Models.Stage
  | Navigate String
