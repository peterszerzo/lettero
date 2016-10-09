module Game exposing (main)

import Html.App exposing (programWithFlags)
import Views.App exposing (view)
import Update exposing (update)
import Models.App exposing (Flags)
import Init exposing (init)
import Subscriptions exposing (subscriptions)

main : Program Flags
main =
  programWithFlags
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
