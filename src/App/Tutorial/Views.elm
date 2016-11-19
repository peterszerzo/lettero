module Tutorial.Views exposing (..)

import Html exposing (Html, div, text, h2)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Dict
import Router
import Tutorial.Messages exposing (Msg(..))
import Tutorial.Models exposing (Model, getDialogContent)
import UiKit.Notification
import UiKit.Word


view : Model -> Html Msg
view model =
    let
        highlights =
            case model.guess of
                Just i ->
                    Dict.fromList [ ( i, "highlighted" ) ]

                Nothing ->
                    Dict.empty

        clickHandler =
            if (model.guess == Just 0) then
                (Navigate Router.newPath)
            else
                Proceed
    in
        div
            [ class "app__page"
            ]
            [ div
                [ onClick clickHandler
                ]
                [ UiKit.Notification.view (getDialogContent model) True
                ]
            , if model.stage /= Tutorial.Models.Start then
                UiKit.Word.view
                    { word = "berry"
                    , onLetterClick = Guess
                    , isDisabled = False
                    , startAngle = 0
                    , highlights = highlights
                    }
              else
                div [] []
            ]
