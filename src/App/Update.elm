module Update exposing (..)

import Navigation
import Models exposing (Model)
import Messages exposing (Msg(..))
import Router
import Game.Update
import Game.Messages
import RoomCreator.Update
import RoomCreator.Messages
import RoomManager.Update
import RoomManager.Messages
import Tutorial.Update
import Tutorial.Messages


updateGame : Game.Messages.Msg -> Model -> ( Model, Cmd Msg )
updateGame msg model =
    Game.Messages.newPath msg
        |> Maybe.map (\str -> model ! [ Navigation.newUrl str ])
        |> Maybe.withDefault
            (case model.route of
                Router.Game model_ ->
                    Game.Update.update msg model_
                        |> (\( md, cmd ) -> ( { model | route = Router.Game md }, Cmd.map GameMsg cmd ))

                _ ->
                    ( model, Cmd.none )
            )


updateRoomCreator : RoomCreator.Messages.Msg -> Model -> ( Model, Cmd Msg )
updateRoomCreator msg model =
    RoomCreator.Messages.newPath msg
        |> Maybe.map (\str -> model ! [ Navigation.newUrl str ])
        |> Maybe.withDefault
            (case model.route of
                Router.RoomCreator model_ ->
                    RoomCreator.Update.update msg model_
                        |> (\( md, cmd ) -> ( { model | route = Router.RoomCreator md }, Cmd.map RoomCreatorMsg cmd ))

                _ ->
                    ( model, Cmd.none )
            )


updateRoomManager : RoomManager.Messages.Msg -> Model -> ( Model, Cmd Msg )
updateRoomManager msg model =
    RoomManager.Messages.newPath msg
        |> Maybe.map (\str -> model ! [ Navigation.newUrl str ])
        |> Maybe.withDefault
            (case model.route of
                Router.RoomManager model_ ->
                    RoomManager.Update.update msg model_
                        |> (\( md, cmd ) -> ( { model | route = Router.RoomManager md }, Cmd.map RoomManagerMsg cmd ))

                _ ->
                    ( model, Cmd.none )
            )


updateTutorial : Tutorial.Messages.Msg -> Model -> ( Model, Cmd Msg )
updateTutorial msg model =
    Tutorial.Messages.newPath msg
        |> Maybe.map (\str -> model ! [ Navigation.newUrl str ])
        |> Maybe.withDefault
            (case model.route of
                Router.Tutorial model_ ->
                    Tutorial.Update.update msg model_
                        |> (\( md, cmd ) -> ( { model | route = Router.Tutorial md }, Cmd.map TutorialMsg cmd ))

                _ ->
                    ( model, Cmd.none )
            )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Navigate newUrl ->
            model ! [ Navigation.newUrl newUrl ]

        RouteChange route ->
            { model | route = route } ! [ Models.getCmdOnRouteChange route ]

        GameMsg msg ->
            updateGame msg model

        RoomCreatorMsg msg ->
            updateRoomCreator msg model

        RoomManagerMsg msg ->
            updateRoomManager msg model

        TutorialMsg msg ->
            updateTutorial msg model
