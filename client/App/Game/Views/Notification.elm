module Game.Views.Notification exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (class, classList)

import Game.Models.App exposing (Model)
import Game.Models.Room exposing (Room)
import Game.Models.Player exposing (isDraw, getWinnerId)
import Game.Messages exposing (Msg)

view : Model -> Room -> Html Msg
view model room =
  let
    (isActive, content) =
      if isDraw room.players
        then
          (True, "It's a tie, folks")
        else
          (
            case getWinnerId room.players of
              Just id ->
                (True, "Nice going, " ++ id)
              Nothing ->
                (False, "")
          )
  in
    div
      [ classList [("notification", True), ("notification--active", isActive)]
      ]
      [ p [] [ text content ] ]
