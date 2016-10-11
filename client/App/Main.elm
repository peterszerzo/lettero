module Main exposing (..)

import Platform exposing (Program)

import Router exposing (Route, parser)
import Views.Main exposing (view)

import Navigation
import Models exposing (Model, Flags, initWithRoute)
import Subscriptions exposing (subscriptions)
import Update exposing (update, urlUpdate)

main : Program Flags
main =
  Navigation.programWithFlags parser
    { init = initWithRoute
    , view = view
    , update = update
    , subscriptions = subscriptions
    , urlUpdate = urlUpdate
    }
