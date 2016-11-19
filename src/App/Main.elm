module Main exposing (..)

import Platform exposing (Program)
import Navigation
import Router
import Models exposing (Model, init)
import Views exposing (view)
import Update exposing (update)
import Messages exposing (Msg(RouteChange))
import Subscriptions exposing (subscriptions)


main : Program Never Model Msg
main =
    Navigation.program (RouteChange << Router.parse)
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
