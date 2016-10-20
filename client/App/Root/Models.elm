module Root.Models exposing (..)

import RoomManager.Models
import Tutorial.Models
import Router
import Root.Messages
import Game.Models.Main
import Game.Init

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

maybeLiftFirstInTuple : (a, b) -> (Maybe a, b)
maybeLiftFirstInTuple (a, b) =
  (Just a, b)

setRoute : Router.Route -> Model -> (Model, Cmd Root.Messages.Msg)
setRoute route model =
  let
    (gameModel, gameCmd) =
      case route of
        Router.GamePlay roomId playerId ->
          Game.Init.init
            { roomId = roomId
            , playerId = playerId
            , websocketHost = model.websocketHost
            }
            |> maybeLiftFirstInTuple

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
        [ Cmd.map Root.Messages.GameMsg gameCmd
        , Cmd.map Root.Messages.RoomManagerMsg roomManagerCmd
        , Cmd.map Root.Messages.TutorialMsg tutorialCmd
        ]
    )

init : Flags -> Router.Route -> (Model, Cmd Root.Messages.Msg)
init flags route =
  setRoute route
    { route = route
    , websocketHost = flags.websocketHost
    , game = Nothing
    , roomManager = Nothing
    , tutorial = Nothing
    }

initWithRoute : Flags -> Result a Router.Route -> (Model, Cmd Root.Messages.Msg)
initWithRoute flags result =
  Router.routeFromResult result
    |> init flags
