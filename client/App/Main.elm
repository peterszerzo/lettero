module Main exposing (..)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Platform exposing (Program)

import Router exposing (Route, parser)

import Navigation

import Views.Home
import Views.About
import Views.NotFound
import Views.Rooms
import Views.Background
import Views.Room
import Views.Game

type alias Flags =
  { websocketHost : String
  }

type alias Model =
  { route : Route
  , websocketHost : String
  }

init : Flags -> Route -> (Model, Cmd Msg)
init flags route =
  ( { route = route
    , websocketHost = flags.websocketHost
    }
  , Cmd.none
  )

initWithRoute : Flags -> Result a Route -> (Model, Cmd Msg)
initWithRoute flags result =
  Router.routeFromResult result
    |> init flags

urlUpdate : Result a Route -> Model -> (Model, Cmd Msg)
urlUpdate result model =
  ({model | route = (Router.routeFromResult result)}, Cmd.none)

type Msg
  = NoOp
  | ChangeRoute String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)
    ChangeRoute newUrl ->
      ( model
      , Navigation.newUrl newUrl
      )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

view : Model -> Html Msg
view model =
  let
    content = case model.route of
      Router.Home ->
        Views.Home.view ChangeRoute
      Router.About ->
        Views.About.view
      Router.NotFound ->
        Views.NotFound.view
      Router.Rooms ->
        Views.Rooms.view
      Router.Room roomId ->
        Views.Room.view
      Router.Game roomId playerId ->
        Views.Game.view
  in
    div
      [ class "app"
      ]
      [ Views.Background.view
      , content
      ]

main : Program Flags
main =
  Navigation.programWithFlags parser
    { init = initWithRoute
    , view = view
    , update = update
    , subscriptions = subscriptions
    , urlUpdate = urlUpdate
    }
