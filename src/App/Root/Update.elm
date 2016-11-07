module Root.Update exposing (..)

import Navigation

import Root.Models exposing (Model, setRoute)
import Root.Messages exposing (Msg(..))
import Router exposing (Route)
import Game.Update
import RoomCreator.Update
import RoomManager.Update
import Tutorial.Update

urlUpdate : Result a Route -> Model -> (Model, Cmd Msg)
urlUpdate =
  setRoute << Router.routeFromResult

maybeLiftFirstInTuple : (a, b, c) -> (Maybe a, b, c)
maybeLiftFirstInTuple (a, b, c) =
  (Just a, b, c)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Navigate newUrl ->
      model ! [ Navigation.newUrl newUrl ]

    GameMsg msg ->
      let
        update = maybeLiftFirstInTuple << Game.Update.update msg
        default = (model.game, Cmd.none, Nothing)
        (game, gameCmd, newRoute) =
          model.game
            |> Maybe.map update
            |> Maybe.withDefault default
      in
        { model
            | game = game
        } !
        [ Cmd.map GameMsg gameCmd
        , newRoute
              |> Maybe.map (Navigation.newUrl)
              |> Maybe.withDefault Cmd.none
        ]

    RoomCreatorMsg msg ->
      let
        update = maybeLiftFirstInTuple << RoomCreator.Update.update msg
        default = (model.roomCreator, Cmd.none, Nothing)
        (roomCreator, roomCreatorCmd, newRoute) =
          model.roomCreator
            |> Maybe.map update
            |> Maybe.withDefault default
      in
        { model
            | roomCreator = roomCreator
        } !
        [ Cmd.map RoomCreatorMsg roomCreatorCmd
        , newRoute
            |> Maybe.map (Navigation.newUrl)
            |> Maybe.withDefault Cmd.none
        ]

    RoomManagerMsg msg ->
      let
        update = maybeLiftFirstInTuple << RoomManager.Update.update msg
        default = (model.roomManager, Cmd.none, Nothing)
        (roomManager, roomManagerCmd, newRoute) =
          model.roomManager
            |> Maybe.map update
            |> Maybe.withDefault default
      in
        { model
            | roomManager = roomManager
        } !
        [ Cmd.map RoomManagerMsg roomManagerCmd
        , newRoute
            |> Maybe.map (Navigation.newUrl)
            |> Maybe.withDefault Cmd.none
        ]

    TutorialMsg msg ->
      let
        update = maybeLiftFirstInTuple << Tutorial.Update.update msg
        default = (model.tutorial, Cmd.none, Nothing)
        (tutorial, tutorialCmd, newRoute) =
          model.tutorial
            |> Maybe.map update
            |> Maybe.withDefault default
      in
        { model
            | tutorial = tutorial
        } !
        [ Cmd.map TutorialMsg tutorialCmd
        , newRoute
            |> Maybe.map (Navigation.newUrl)
            |> Maybe.withDefault Cmd.none
        ]
