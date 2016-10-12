module Models exposing (..)

import Game.Models.Main exposing (Game)
import Router
import Messages
import Helpers

type alias Flags =
  { websocketHost : String
  }

type alias Model =
  { route : Router.Route
  , websocketHost : String
  , game : Maybe Game
  }

setRoute : Router.Route -> Model -> (Model, Cmd Messages.Msg)
setRoute route model =
  let
    (gameModel, gameCmd) =
      case route of
        Router.GamePlay roomId playerId ->
          let (gm, cmd) =
            Helpers.initGame roomId playerId model.websocketHost
          in
            (Just gm, cmd)
        _ ->
          (Nothing, Cmd.none)
  in
    ( { model
          | route = route
          , game = gameModel
      }
    , Cmd.map Messages.GameMsg gameCmd
    )

init : Flags -> Router.Route -> (Model, Cmd Messages.Msg)
init flags route =
  let
    newModel =
      { route = route
      , websocketHost = flags.websocketHost
      , game = Nothing
      }
    (gameModel, gameCmd) =
      setRoute route newModel
  in
    ( gameModel
    , gameCmd
    )

initWithRoute : Flags -> Result a Router.Route -> (Model, Cmd Messages.Msg)
initWithRoute flags result =
  Router.routeFromResult result
    |> init flags
