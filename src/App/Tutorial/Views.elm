module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Dict
import Router
import Content
import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model(..), isCorrectGuess)
import UiKit.Notification
import UiKit.Word


view : Model -> Html Msg
view model =
    let
        highlights =
            case model of
                Guessed i ->
                    Dict.fromList [ ( i, "highlighted" ) ]

                _ ->
                    Dict.empty

        isCorrectGuess_ = isCorrectGuess model

        onNotificationClick =
            if isCorrectGuess_ then
                (Navigate Router.newPath)
            else
                Start


        notificationContent =
          case model of
            Intro ->
              Content.tutorialStart
            Show ->
              Content.tutorialShow
            Guessed _ ->
              if isCorrectGuess_ then Content.tutorialCorrect else Content.tutorialIncorrect

    in
        div
            [ class "app__page"
            ]
            [ div
                [ onClick onNotificationClick
                ]
                [ UiKit.Notification.view notificationContent True isCorrectGuess_
                ]
            , if model /= Intro then
                UiKit.Word.view
                    { word = "berry"
                    , onGuess = Guess
                    , isDisabled = False
                    , startAngle = 0
                    , highlights = highlights
                    }
              else
                div [] []
            ]
