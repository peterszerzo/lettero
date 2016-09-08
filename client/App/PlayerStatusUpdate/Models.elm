module PlayerStatusUpdate.Models exposing (..)

type alias PlayerStatusUpdate =
  { roomId : String
  , playerId : String
  , round : Int
  , guess : Maybe Int
  }
