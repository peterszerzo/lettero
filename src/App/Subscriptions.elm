module Subscriptions exposing (..)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Game.Subscriptions
import RoomCreator.Subscriptions
import RoomManager.Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ model.game
            |> Maybe.map ((Sub.map GameMsg) << Game.Subscriptions.subscriptions)
            |> Maybe.withDefault Sub.none
        , model.roomCreator
            |> Maybe.map ((Sub.map RoomCreatorMsg) << RoomCreator.Subscriptions.subscriptions)
            |> Maybe.withDefault Sub.none
        , model.roomManager
            |> Maybe.map ((Sub.map RoomManagerMsg) << RoomManager.Subscriptions.subscriptions)
            |> Maybe.withDefault Sub.none
        ]
