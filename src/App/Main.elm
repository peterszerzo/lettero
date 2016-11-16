module Main exposing (..)

import Platform exposing (Program)
import Navigation
import Router
import Root.Models exposing (Model, init)
import Root.Views.Main exposing (view)
import Root.Update exposing (update)
import Root.Messages exposing (Msg(RouteChange))
import Root.Subscriptions exposing (subscriptions)


main : Program Never Model Msg
main =
    Navigation.program (RouteChange << Router.parse)
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
