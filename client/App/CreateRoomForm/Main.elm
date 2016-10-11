module CreateRoomForm.Main exposing (..)

import Dict
import Html exposing (Html, div, text ,h1, p, button, form, label, input)
import Html.Attributes exposing (class, type', id, name, for, required)
import Html.Events exposing (onInput)


-- Model

type alias Model =
  { fields : List String
  , values : Dict.Dict String String
  , isActive : Bool
  , isSubmitted : Bool
  }

init : Model
init =
  { fields = [ "roomId", "player1", "player2" ]
  , values = Dict.empty
  , isActive = False
  , isSubmitted = False
  }


-- Messages

type Msg =
  Input String String |
  Activate |
  Deactivate


-- Update

update : Msg -> Model -> Model
update msg model =
  case msg of
    Input k v ->
      {model | values = Dict.insert k v model.values}
    Activate ->
      {model | isActive = True}
    Deactivate ->
      {model | isActive = False}


-- View

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
