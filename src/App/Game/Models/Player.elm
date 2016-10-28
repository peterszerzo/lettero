module Game.Models.Player exposing (..)

import Json.Decode exposing (Decoder, (:=), object5, maybe, string, int, float, bool, list)
import Json.Encode as JE
import Game.Models.Guess as Guess

type alias Player =
  { id : String
  , roomId : String
  , score : Int
  , guess : Guess.Guess
  , isReady : Bool
  }


-- Helpers

getDummy : String -> Player
getDummy t =
  Player "apples" "pears" 0 (Guess.getDummy "") False


-- Assumes the player is always found

unsafeFindById : String -> List Player -> Player
unsafeFindById playerId players =
  players
    |> List.filter ((==) playerId << .id)
    |> List.head
    |> Maybe.withDefault (getDummy "")

setReady : String -> List Player -> List Player
setReady playerId =
  List.map
    (\player -> if (playerId == player.id) then { player | isReady = True } else player)

areAllReady : List Player -> Bool
areAllReady players =
  players
    |> List.map (.isReady)
    |> List.all identity

hasCorrectGuess : Player -> Bool
hasCorrectGuess =
    Guess.isCorrect << .guess

hasIncorrectGuess : Player -> Bool
hasIncorrectGuess =
    Guess.isIncorrect << .guess

compareByGuessTime : Player -> Player -> Order
compareByGuessTime player1 player2 =
  let
    time1 =
      player1.guess.time
    time2 =
      player2.guess.time
  in
    if (time1 - time2 < 0) then
      LT
    else
      (if time1 == time2 then EQ else GT)

getWinnerId : List Player -> Maybe String
getWinnerId players =
  players
    |> List.filter hasCorrectGuess
    |> List.sortWith compareByGuessTime
    |> List.head
    |> Maybe.map (.id)


isDraw : List Player -> Bool
isDraw players =
  players
    |> List.map hasIncorrectGuess
    |> List.all identity


-- Decoders

playerDecoder : Decoder Player
playerDecoder =
  object5 Player
    ( "id" := string )
    ( "roomId" := string )
    ( "score" := int )
    ( "guess" := Guess.guessDecoder )
    ( "isReady" := bool )

playersDecoder : Decoder (List Player)
playersDecoder =
  list playerDecoder


-- Encoders

encodePlayer : Player -> String
encodePlayer { id, roomId, score, guess, isReady } =
  JE.object
    [ ( "roomId", JE.string roomId )
    , ( "id", JE.string id )
    , ( "score", JE.int score )
    , ( "guess", Guess.guessEncoder guess )
    , ( "isReady", JE.bool isReady )
    ]
      |> JE.encode 0
