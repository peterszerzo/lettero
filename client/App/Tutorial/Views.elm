module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Dict

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model, getDialogContent)

import UiKit.Notification
import UiKit.Word

view : Model -> Html Msg
view model =
  let
    highlights = case model.stage of
      Tutorial.Models.CorrectGuess ->
        Dict.fromList [ (0, "highlighted") ]

      _ ->
        Dict.empty
  in
    div
      [ class "app__page"
      ]
      [ div
          [ onClick StartTutorial
          ]
          [ UiKit.Notification.view (getDialogContent model) True
          ]
      , if model.stage /= Tutorial.Models.Start
          then
            UiKit.Word.view
              { word = "hedgehog"
              , onLetterClick = ClickLetter
              , isDisabled = False
              , startAngle = 0
              , highlights = highlights
              }
          else div [] []
      ]
