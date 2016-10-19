module Models exposing (..)

import Game.Models.Main
import RoomManager.Models
import Tutorial.Models
import Router
import Messages
import Helpers

type alias Flags =
  { websocketHost : String
  }

type alias Model =
  { route : Router.Route
  , websocketHost : String
  , game : Maybe Game.Models.Main.Model
  , roomManager : Maybe RoomManager.Models.Model
  , tutorial : Maybe Tutorial.Models.Model
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

    (roomManagerModel, roomManagerCmd) =
      case route of
        Router.Rooms ->
          (Just RoomManager.Models.init, Cmd.none)

        _ ->
          (Nothing, Cmd.none)

    (tutorialModel, tutorialCmd) =
      case route of
        Router.Tutorial ->
          (Just Tutorial.Models.init, Cmd.none)

        _ ->
          (Nothing, Cmd.none)
  in
    ( { model
          | route = route
          , game = gameModel
          , roomManager = roomManagerModel
          , tutorial = tutorialModel
      }
    , Cmd.batch
        [ Cmd.map Messages.GameMsg gameCmd
        , Cmd.map Messages.RoomManagerMsg roomManagerCmd
        , Cmd.map Messages.TutorialMsg tutorialCmd
        ]
    )

init : Flags -> Router.Route -> (Model, Cmd Messages.Msg)
init flags route =
  setRoute route
    { route = route
    , websocketHost = flags.websocketHost
    , game = Nothing
    , roomManager = Nothing
    , tutorial = Nothing
    }

initWithRoute : Flags -> Result a Router.Route -> (Model, Cmd Messages.Msg)
initWithRoute flags result =
  Router.routeFromResult result
    |> init flags
