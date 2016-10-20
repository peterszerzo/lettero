module Game.Views.Word exposing (view)

import Html
import Dict

import Game.Models.Main exposing (Model, getOwnGuess)
import Game.Models.Room as Room
import Game.Models.Player as Player
import Game.Models.Guess as Guess
import Game.Messages exposing (Msg(..))

import UiKit.Word

view : Model -> Room.Room -> Html.Html Msg
view model room =
  let
    guessIndex =
      getOwnGuess model
        |> Maybe.map Guess.getMadeValue
        |> Maybe.withDefault (Just 0)
    isDisabled = (Player.isDraw room.players) || ((Player.getWinnerId room.players) /= Nothing)
    startAngle = (toFloat model.currentRoundRandom) / 1000 * 2 * pi
    highlights =
      guessIndex
        |> Maybe.map (\i -> Dict.fromList [ (i, "highlighted") ])
        |> Maybe.withDefault Dict.empty
  in
    UiKit.Word.view
      { word = room.roundData.word
      , startAngle = startAngle
      , highlights = highlights
      , isDisabled = isDisabled
      , onLetterClick = MakeGuess
      }
