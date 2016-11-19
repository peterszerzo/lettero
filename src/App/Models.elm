module Models exposing (..)

import Router
import Messages exposing (Msg(..))
import Navigation
import Game.Models
import RoomCreator.Models
import RoomManager.Models
import Tutorial.Models


type alias Model =
    { route : Router.Route
    }


getCmdOnRouteChange : Router.Route -> Cmd Msg
getCmdOnRouteChange rt =
    case rt of
        Router.Game gm ->
            Game.Models.init { roomId = gm.roomId, playerId = gm.playerId }
                |> Tuple.second
                |> Cmd.map GameMsg

        Router.RoomCreator newrm ->
            RoomCreator.Models.init
                |> Tuple.second
                |> Cmd.map RoomCreatorMsg

        Router.RoomManager rm ->
            RoomManager.Models.init rm.roomId
                |> Tuple.second
                |> Cmd.map RoomManagerMsg

        Router.Tutorial tut ->
            Tutorial.Models.init
                |> Tuple.second
                |> Cmd.map TutorialMsg

        _ ->
            Cmd.none


init : Navigation.Location -> ( Model, Cmd Msg )
init loc =
    let
        route =
            Router.parse loc

        cmd =
            getCmdOnRouteChange route
    in
        ( Model route, cmd )
