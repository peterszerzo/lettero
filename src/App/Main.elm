module Main exposing (..)

import Platform exposing (Program)
import Navigation

import Router exposing (Route, parser)
import Root.Views.Main exposing (view)
import Root.Models exposing (Flags, initWithRoute)
import Root.Subscriptions exposing (subscriptions)
import Root.Update exposing (update, urlUpdate)

main : Program Flags
main =
  Navigation.programWithFlags parser
    { init = initWithRoute
    , view = view
    , update = update
    , subscriptions = subscriptions
    , urlUpdate = urlUpdate
    }
