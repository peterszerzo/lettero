module RoomManager.Views exposing (..)

import Html exposing (Html, div, text ,h1, h2, p, a, button, form, label, input, fieldset)
import Html.Attributes exposing (class, type', id, name, for, required, autofocus, placeholder, href)
import Html.Events exposing (onInput, onClick)

import RoomManager.Models exposing (Model, Status(..))
import RoomManager.Messages exposing (Msg(..))

viewContent : Model -> List (Html Msg)
viewContent model =
  if model.status == Startup
    then
      [ p [] [ text "Let's do it! Wanna see a tutorial?" ]
      , button
          [ class "button"
          , onClick (Navigate "/tutorial")
          ]
          [ text "Yes tutorial"
          ]
      , p [] [ text "One day, you'll be able to create your very own game room and invite your friends to it. For now, though, we only have the test room open for you, where you can play as:" ]
      , a
          [ class "button"
          , onClick (Navigate "/rooms/theroom/alfred")
          ]
          [ text "alfred"
          ]
      , a
          [ class "button"
          , onClick (Navigate "/rooms/theroom/samantha")
          ]
          [ text "samantha"
          ]
      ]
    else
      [ h2 [] [ text "Go to your room!" ]
      , p [] [ text "Enter the names for the room and its two players. Keep it simple - no spaces, no special characters." ]
      , fieldset []
          [ label
              [ for "roomId"
              ]
              [ text "Enter name"
              ]
          , input
              [ type' "text"
              , id "roomId"
              , name "roomId"
              , onInput InputRoomId
              , autofocus True
              , placeholder "Enter name"
              ] []
          ]
        , fieldset []
            [ label
                [ for "player1"
                ]
                [ text "Player 1"
                ]
            , input
                [ type' "text"
                , id "player1"
                , name "player1"
                , onInput (InputPlayer 0)
                , autofocus True
                , placeholder "Enter name"
                ] []
            ]
        , fieldset []
            [ label
                [ for "player2"
                ]
                [ text "Player 2"
                ]
            , input
                [ type' "text"
                , id "player2"
                , name "player2"
                , onInput (InputPlayer 1)
                , autofocus True
                , placeholder "Enter name"
                ] []
            ]
      ]

view : Model -> Html Msg
view model =
  div
    [ class "app__page"
    ]
    [ div
        [ class "basic-content"
        ]
        (viewContent model)
    ]
