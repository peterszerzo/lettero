module Room.Models exposing (..)

import Json.Decode exposing (Decoder, (:=), string, object4, int, maybe, null, bool)

import Player.Models exposing (Player, playersDecoder)

type alias RoomId = String

type alias Room =
  { id : RoomId
  , round : Int
  , word : String
  , players : List Player
  }

roomDecoder : Decoder Room
roomDecoder =
  object4 Room
    ("id" := string)
    ("round" := int)
    ("word" := string)
    ("players" := playersDecoder)
