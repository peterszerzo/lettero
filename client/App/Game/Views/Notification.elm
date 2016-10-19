module Game.Views.Notification exposing (view)

import Html exposing (Html)

import Game.Models.Main exposing (Model)
import Game.Models.Room exposing (Room)
import Game.Models.Player exposing (isDraw, getWinnerId)
import Game.Messages exposing (Msg)

import UiKit.Notification

view : Model -> Room -> Html Msg
view model room =
  let
    (isActive, content) =
      if isDraw room.players
        then
          (True, "It's a tie, folks")
        else
          getWinnerId room.players
            |> Maybe.map (\id -> (True, "Nice going, " ++ id))
            |> Maybe.withDefault (False, "")
  in
    UiKit.Notification.view content isActive
