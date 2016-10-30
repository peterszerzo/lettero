module RoomManager.Views.CreateForm exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class, classList)

import UiKit.LabeledInput
import RoomManager.Messages exposing (Msg(..))
import RoomManager.Models exposing (Model, canSubmit)

view : Model -> Html Msg
view model =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text "Create new room" ]
    , UiKit.LabeledInput.view
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
    , button
        [ classList
            [ ("button", True)
            , ("button--disabled", canSubmit model |> not)
            ]
        ] [ text "Submit" ]
    ]
