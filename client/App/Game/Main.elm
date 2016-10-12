module Game.Main exposing (main)

import Html.App exposing (programWithFlags)

import Game.Views.Main exposing (view)
import Game.Update exposing (update)
import Game.Models.Main exposing (Flags)
import Game.Init exposing (init)
import Game.Subscriptions exposing (subscriptions)

main : Program Flags
main =
  programWithFlags
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
