module Models exposing (..)

import Router
import Messages

type alias Flags =
  { websocketHost : String
  }

type alias Model =
  { route : Router.Route
  , websocketHost : String
  }

init : Flags -> Router.Route -> (Model, Cmd Messages.Msg)
init flags route =
  let
    newModel =
      { route = route
      , websocketHost = flags.websocketHost
      }
  in
    ( newModel, Cmd.none )

initWithRoute : Flags -> Result a Router.Route -> (Model, Cmd Messages.Msg)
initWithRoute flags result =
  Router.routeFromResult result
    |> init flags
