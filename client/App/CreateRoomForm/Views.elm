module CreateRoomForm.Views exposing (..)

import Html exposing (Html, div, text ,h1, h2, p, button, form, label, input)
import Html.Attributes exposing (class, type', id, name, for, required, autofocus)
import Html.Events exposing (onInput)

import CreateRoomForm.Models exposing (CreateRoomForm)
import CreateRoomForm.Messages exposing (Msg(..))

view : CreateRoomForm -> Html Msg
view model =
  div []
    [ h2 [] [ text "Your very own room?" ]
    , label
        [
        ]
        [ text "Enter name:"
        ]
    , input
        [ type' "text"
        , id "roomId"
        , name "roomId"
        , onInput Input
        , autofocus True
        ] []
    ]
