module CreateRoomForm exposing (..)

import Dict

type alias Model =
  { fields : List String
  , values : Dict.Dict String String
  , isActive : Bool
  , isSubmitted : Bool
  }

init : Model
init =
  { fields = [ "roomId", "player1", "player2" ]
  , values = Dict.empty
  , isActive = False
  , isSubmitted = False
  }
