module CreateRoomForm.Views exposing (..)

import Html exposing (Html, div, text ,h1, p, button, form, label, input)
import Html.Attributes exposing (class, type', id, name, for, required)
import Html.Events exposing (onInput)

import CreateRoomForm.Models exposing (Model)
import CreateRoomForm.Messages exposing (Msg)

view : Model -> Html Msg
view model =
  form []
    [ div []
        [ label [ for "roomId" ] [ text "Room name" ]
        , input
            [ type' "text"
            , id "roomId"
            , name "roomId"
            , onInput (Input "roomId")
            ] []
        ]
    , div []
        [ label [ for "player1" ] [ text "Player 1" ]
        , input
            [ type' "text"
            , id "players0"
            , name "player1"
            , onInput (Input "player1")
            , required True
            ] []
        ]
    , div []
        [ label [ for "player2" ] [ text "Player 2" ]
        , input
          [ type' "text"
          , id "player2"
          , name "player2"
          , onInput (Input "player2")
          , required True
          ] []
        ]
    , div []
        [ input [ type' "submit" ] []
        ]
    ]
