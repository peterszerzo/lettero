module RoomManager.Views exposing (..)

import Html exposing (Html, div, text, h1, h2, p, a, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onInput, onClick)

import RoomManager.Models exposing (Model, Status(..))
import RoomManager.Messages exposing (Msg(..))

import UiKit.LabeledInput

viewContent : Model -> List (Html Msg)
viewContent model =
  if model.status == Startup
    then
      [ p [] [ text "Let’s do it! Wanna see a tutorial?" ]
      , button
          [ class "button"
          , onClick (Navigate "/tutorial")
          ]
          [ text "Yes tutorial"
          ]
      , p [] [ text "One day, you’ll be able to create your very own game room and invite your friends to it. For now, though, we only have the test room open for you, where you can play as:" ]
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
