module RoomManager.Views.CreateForm exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)

import UiKit.LabeledInput
import RoomManager.Messages exposing (Msg(..))

view : Html Msg
view =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text "Go to your room!" ]
    , p [] [ text "Enter the names for the room and its two players. Keep it simple - no spaces, no special characters." ]
    , UiKit.LabeledInput.view
        { id = "roomId"
        , label = "Enter room name"
        , type' = "text"
        , autofocus = True
        , placeholder = "Enter name"
        , onInput = InputRoomId
        }
    , UiKit.LabeledInput.view
        { id = "player1"
        , label = "Player 1"
        , type' = "text"
        , autofocus = True
        , placeholder = "Enter name"
        , onInput = (InputPlayer 0)
        }
    , UiKit.LabeledInput.view
        { id = "player2"
        , label = "Player 2"
        , type' = "text"
        , autofocus = True
        , placeholder = "Enter name"
        , onInput = (InputPlayer 1)
        }
    ]
