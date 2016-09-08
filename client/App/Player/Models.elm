module Player.Models exposing (..)

type alias PlayerId = String

type alias Player =
  { id : PlayerId
  , score : Int
  , guess : Maybe Int
  , isReady : Bool
  }
