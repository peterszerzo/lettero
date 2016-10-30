module Root.Subscriptions exposing (..)

import Root.Models exposing (Model)
import Root.Messages exposing (Msg(..))
import Game.Subscriptions
import RoomManager.Subscriptions

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ model.game
        |> Maybe.map (\g -> Sub.map GameMsg (Game.Subscriptions.subscriptions g))
        |> Maybe.withDefault Sub.none
    , model.roomManager
        |> Maybe.map (\rm -> Sub.map RoomManagerMsg (RoomManager.Subscriptions.subscriptions rm))
        |> Maybe.withDefault Sub.none
    ]
