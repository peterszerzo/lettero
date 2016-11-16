module RoomCreator.Views.Main exposing (..)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)
import Models.Room as Room
import RoomCreator.Models exposing (Model, Status(..))
import RoomCreator.Messages exposing (Msg(..))
import RoomCreator.Views.CreateForm
import RoomCreator.Views.Success
import RoomCreator.Views.Error


viewContent : Model -> Html Msg
viewContent model =
    case model.status of
        Success ->
            model.room
                |> Maybe.withDefault (Room.getDummy "1")
                |> RoomCreator.Views.Success.view

        Error ->
            model.room
                |> Maybe.withDefault (Room.getDummy "1")
                |> RoomCreator.Views.Error.view

        _ ->
            RoomCreator.Views.CreateForm.view model


view : Model -> Html Msg
view model =
    div
        [ class "app__page"
        ]
        [ viewContent model
        ]
