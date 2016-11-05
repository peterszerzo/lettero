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
    , p [] [ text "That's exactly two flashes. We need your help for it, though - use lowercase letters only." ]
    , div
        [ class "form" ]
        [ UiKit.LabeledInput.view
            { id = "roomId"
            , label = "Enter room name"
            , type' = "text"
            , autofocus = True
            , placeholder = "theliving"
            , onInput = InputRoomId
            }
        , UiKit.LabeledInput.view
            { id = "player1"
            , label = "Player 1"
            , type' = "text"
            , autofocus = False
            , placeholder = "winwin"
            , onInput = (InputPlayer 0)
            }
        , UiKit.LabeledInput.view
            { id = "player2"
            , label = "Player 2"
            , type' = "text"
            , autofocus = False
            , placeholder = "winlose"
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
