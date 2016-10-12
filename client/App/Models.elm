module Models exposing (..)

import Game.Models.Main exposing (Game)
import Game.Messages
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

setRoute : Router.Route -> Model -> (Model, Cmd Game.Messages.Msg)
setRoute route model =
  let
    game =
      case route of
        Router.GamePlay roomId playerId ->
          Helpers.initGame roomId playerId model.websocketHost
            |> fst
            |> Just
        _ ->
          Nothing
  in
    ( { model
          | route = route
          , game = game
      }
    , Cmd.none
    )

init : Flags -> Router.Route -> (Model, Cmd Messages.Msg)
init flags route =
  let
    newModel =
      { route = route
      , websocketHost = flags.websocketHost
      , game = Nothing
      }
  in
    ( newModel, Cmd.none )

initWithRoute : Flags -> Result a Router.Route -> (Model, Cmd Messages.Msg)
initWithRoute flags result =
  Router.routeFromResult result
    |> init flags
