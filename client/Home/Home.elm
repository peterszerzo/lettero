module Home exposing (..)

import Html exposing (Html, div, text ,h1, p, button)
import Html.Attributes exposing (class, classList)
import Platform exposing (Program)

import Router exposing (Route, parser)

import Navigation exposing (program)

import Views.Home
import Views.About
import Views.NotFound

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
  | ChangeRoute Router.Route

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)
    ChangeRoute newRoute ->
      let
        newUrl =
          Router.routeUrls
            |> List.filter (\(rt, url) -> rt == newRoute)
            |> List.head
            |> Maybe.withDefault Router.defaultRouteUrl
            |> snd
      in
        ( model
        , Navigation.newUrl ("/" ++ newUrl)
        )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

view : Model -> Html Msg
view model =
  let
    _ = Debug.log "rt" model.route
    content = case model.route of
      Router.Home -> Views.Home.view (ChangeRoute Router.About)
      Router.About -> Views.About.view
      Router.NotFound -> Views.NotFound.view
  in
    div
      [ class "app"
      ]
      [ content
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
