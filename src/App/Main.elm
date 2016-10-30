module Main exposing (..)

import Platform exposing (Program)
import Navigation

import Router exposing (Route, parser)
import Root.Views.Main exposing (view)
import Root.Models exposing (initWithRoute)
import Root.Subscriptions exposing (subscriptions)
import Root.Update exposing (update, urlUpdate)

main : Program Never
main =
  Navigation.program parser
    { init = initWithRoute
    , view = view
    , update = update
    , subscriptions = subscriptions
    , urlUpdate = urlUpdate
    }
