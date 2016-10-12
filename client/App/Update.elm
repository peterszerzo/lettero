module Update exposing (..)

import Navigation

import Models exposing (Model, setRoute)
import Messages exposing (Msg(..))
import Router exposing (Route)
import Game.Update

urlUpdate : Result a Route -> Model -> (Model, Cmd Msg)
urlUpdate =
  setRoute << Router.routeFromResult

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ChangeRoute newUrl ->
      ( model
      , Navigation.newUrl newUrl
      )

    GameMsg msg ->
      let
        (gameModel, gameCmd) = case model.game of
          Just game ->
            let
              (gm, cmd) = Game.Update.update msg game
            in
              (Just gm, cmd)
          Nothing ->
            (model.game, Cmd.none)
      in
        ( { model
              | game = gameModel
          }
        , Cmd.map GameMsg gameCmd
        )
