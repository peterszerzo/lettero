module Views.App exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)

import Models.App exposing (Model, getOwnGuess)
import Models.Room exposing (Room)
import Models.Player exposing (areAllReady)
import Messages exposing (Msg(..))

import Views.ScoreBoard as Sd
import Views.Spinner as Sr
import Views.Word as Wd
import Views.ReadyScreen as Rn

viewGame : Model -> Room -> Html Msg
viewGame model room =
  let
    content =
      if areAllReady room.players
        then
          [ Wd.view model room
          , Sd.view model.playerId room.players
          ]
        else
          [ Rn.view room.players model.playerId
          ]
  in
    div
      [ class "app__page" ]
      content

view : Model -> Html Msg
view model =
  let
    content = case model.room of
      Nothing ->
        div [ class "app__page" ] [ Sr.view ]
      Just room ->
        viewGame model room
  in
    div
      [ class "app"
      ]
      [ content
      ]
