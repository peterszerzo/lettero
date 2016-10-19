module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model)

import UiKit.Notification
import UiKit.Word

view : Model -> Html Msg
view model =
  let
    content = case model.stage of
      Tutorial.Models.Start ->
        "Heyyo. Ready for your word? Click me!"

      Tutorial.Models.ShowWord ->
        "Holy moly, who writes like that? It'll take decades to find the first letter of this word and click it!"

      Tutorial.Models.CorrectGuess ->
        "Right on, bud, right on. Honestly, there's nothing more to this game."

      Tutorial.Models.IncorrectGuess ->
        "Not quite, not quite. Give it one more go?"
  in
    div
      [ class "app__page"
      ]
      [ div
          [ onClick StartTutorial
          ]
          [ UiKit.Notification.view content True
          ]
      , if model.stage /= Tutorial.Models.Start
          then
            UiKit.Word.view "hedgehog" ClickLetter
          else div [] []
      ]
