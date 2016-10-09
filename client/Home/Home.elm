module Home exposing (..)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Html.App exposing (program, map)
import Platform exposing (Program)

import Views.Welcome

type alias Model =
  {}

init : (Model, Cmd Msg)
init =
  ( {}
  , Cmd.none
  )

type Msg = NoOp

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

view : Model -> Html Msg
view model =
  div
    [ class "app"
    ]
    [ Views.Welcome.view
    ]

main : Program Never
main =
  program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
