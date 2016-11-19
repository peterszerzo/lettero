module Messages exposing (..)

import Game.Messages
import RoomCreator.Messages
import RoomManager.Messages
import Tutorial.Messages
import Router


type Msg
    = Navigate String
    | RouteChange Router.Route
    | GameMsg Game.Messages.Msg
    | RoomCreatorMsg RoomCreator.Messages.Msg
    | RoomManagerMsg RoomManager.Messages.Msg
    | TutorialMsg Tutorial.Messages.Msg
