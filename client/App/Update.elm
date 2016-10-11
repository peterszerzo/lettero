module Update exposing (..)

import Navigation

import Models exposing (Model)
import Messages exposing (Msg(..))
import Router exposing (Route)

urlUpdate : Result a Route -> Model -> (Model, Cmd Msg)
urlUpdate result model =
  let
    newModel =
      { model
          | route = Router.routeFromResult result
      }
  in
  ( newModel
  , Cmd.none
  )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ChangeRoute newUrl ->
      ( model
      , Navigation.newUrl newUrl
      )
