module Update exposing (..)

import Navigation

import Models exposing (Model, setRoute)
import Messages exposing (Msg(..))
import Router exposing (Route)
import Game.Update
import CreateRoomForm.Update

urlUpdate : Result a Route -> Model -> (Model, Cmd Msg)
urlUpdate =
  setRoute << Router.routeFromResult

maybeLiftFirstInTuple : (a, b, c) -> (Maybe a, b, c)
maybeLiftFirstInTuple (a, b, c) =
  (Just a, b, c)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ChangeRoute newUrl ->
      ( model
      , Navigation.newUrl newUrl
      )

    GameMsg msg ->
      let
        (game, gameCmd, newRoute) =
          model.game
            |> Maybe.map (Game.Update.update msg)
            |> Maybe.map maybeLiftFirstInTuple
            |> Maybe.withDefault (model.game, Cmd.none, Nothing)
      in
        ( { model
              | game = game
          }
        , Cmd.batch
            [ Cmd.map GameMsg gameCmd
            , newRoute
                |> Maybe.map (Navigation.newUrl)
                |> Maybe.withDefault Cmd.none
            ]
        )

    CreateRoomFormMsg msg ->
      let
        (createRoomFormModel, createRoomFormCmd, newRoute) =
          model.createRoomForm
            |> Maybe.map (CreateRoomForm.Update.update msg)
            |> Maybe.map maybeLiftFirstInTuple
            |> Maybe.withDefault (model.createRoomForm, Cmd.none, Nothing)
      in
        ( { model
              | createRoomForm = createRoomFormModel
          }
        , Cmd.batch
            [ Cmd.map CreateRoomFormMsg createRoomFormCmd
            , newRoute
                |> Maybe.map (Navigation.newUrl)
                |> Maybe.withDefault Cmd.none
            ]
        )
