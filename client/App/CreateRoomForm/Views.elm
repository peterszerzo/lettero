module CreateRoomForm.Views exposing (..)

import Html exposing (Html, div, text ,h1, h2, p, a, button, form, label, input, fieldset)
import Html.Attributes exposing (class, type', id, name, for, required, autofocus, placeholder, href)
import Html.Events exposing (onInput, onClick)

import CreateRoomForm.Models exposing (Model, Status(..))
import CreateRoomForm.Messages exposing (Msg(..))

viewContent : Model -> List (Html Msg)
viewContent model =
  if model.status == Startup
    then
      [ p [] [ text "A warm welcome to Lettero gameplay." ]
      , p [] [ text "One day, you'll be able to create your very own game room and invite your friends to it. For now, though, we only have the test room open for you, where you can play as:" ]
      , a [ class "button", href "/rooms/theroom/alfred" ] [ text "alfred" ]
      , a [ class "button", href "/rooms/theroom/samantha" ] [ text "samantha" ]
      ]
    else
      [ h2 [] [ text "Go to your room!" ]
      , fieldset []
          [ label
              [ for "roomId"
              ]
              [ text "Ugh, manners.. What I meant to say is that you should create a new room or find an existing one:"
              ]
          , input
              [ type' "text"
              , id "roomId"
              , name "roomId"
              , onInput Input
              , autofocus True
              , placeholder "Enter name"
              ] []
          ]
      ]

view : Model -> Html Msg
view model =
  div
    [ class "basic-content"
    ]
    (viewContent model)
