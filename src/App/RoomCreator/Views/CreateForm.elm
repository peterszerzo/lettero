module RoomCreator.Views.CreateForm exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button, input, form)
import Html.Attributes exposing (class, classList, type', disabled)
import Html.Events exposing (onClick, onWithOptions)

import UiKit.LabeledInput
import RoomCreator.Messages exposing (Msg(..))
import RoomCreator.Models exposing (Model, canSubmit)

view : Model -> Html Msg
view model =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text "Create a room in a jiffy" ]
    , p [] [ text "Now that’s a very short time, if you can lend us a hand: please use lowercase letters only." ]
    , div
        [ class "form" ]
        [ UiKit.LabeledInput.view
            { id = "roomId"
            , label = "Enter room name"
            , type' = "text"
            , autofocus = True
            , placeholder = "E.g. theroom"
            , onInput = InputRoomId
            }
        , UiKit.LabeledInput.view
            { id = "player1"
            , label = "Player 1"
            , type' = "text"
            , autofocus = False
            , placeholder = "E.g. alfred"
            , onInput = (InputPlayer 0)
            }
        , UiKit.LabeledInput.view
            { id = "player2"
            , label = "Player 2"
            , type' = "text"
            , autofocus = False
            , placeholder = "E.g. samantha"
            , onInput = (InputPlayer 1)
            }
        , input
            [ type' "submit"
            , disabled (canSubmit model |> not)
            , onClick SubmitCreateForm
            ]
            [ text "Submit" ]
        ]
    ]
