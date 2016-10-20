module Game.Views.Notification exposing (view)

import Html exposing (Html)

import Game.Models.Main exposing (Model, getOwnGuess)
import Game.Models.Room exposing (Room)
import Game.Models.Guess as Guess
import Game.Models.Player as Player
import Game.Messages exposing (Msg)

import UiKit.Notification

getContent : String -> String -> String
getContent winner self =
  if winner == self
    then
      "Nice going, " ++ winner
    else
      "Looks like this one goes to " ++ winner

view : Model -> Room -> Html Msg
view model room =
  let
    (isActive, content) =
      if Player.isDraw room.players then
        (True, "It’s a tie, folks")
      else if (Player.getWinnerId room.players /= Nothing) then
        Player.getWinnerId room.players
          |> Maybe.map (\id -> (True, getContent id model.playerId))
          |> Maybe.withDefault (False, "")
      else if (getOwnGuess model |> Maybe.map .value |> (==) (Just Guess.Idle)) then
        (True, "You’ve gone idle")
      else
        (False, "")
  in
    UiKit.Notification.view content isActive
