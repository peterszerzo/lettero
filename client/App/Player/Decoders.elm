module Player.Decoders exposing (..)

import Json.Decode exposing (Decoder, (:=), string, object4, int, maybe, null, bool, list)

import Player.Models exposing (Player)

playerDecoder : Decoder Player
playerDecoder =
  object4 Player
    ("id" := string)
    ("score" := int)
    (maybe ("guess" := int))
    ("isReady" := bool)

playersDecoder : Decoder (List Player)
playersDecoder =
  list playerDecoder
