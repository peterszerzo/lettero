module Main exposing (..)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Platform exposing (Program)

import Router exposing (Route, parser)

import Navigation exposing (program)

import Views.Home
import Views.About
import Views.NotFound
import Views.Rooms
import Views.Background
import Views.Room
import Views.Game

type alias Model =
  { route : Route
  }

init : Route -> (Model, Cmd Msg)
init route =
  ( { route = route
    }
  , Cmd.none
  )

initWithRoute : Result a Route -> (Model, Cmd Msg)
initWithRoute result =
  Router.routeFromResult result
    |> init

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

main : Program Never
main =
  Navigation.program parser
    { init = initWithRoute
    , view = view
    , update = update
    , subscriptions = subscriptions
    , urlUpdate = urlUpdate
    }
