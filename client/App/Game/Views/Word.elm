module Game.Views.Word exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)
import Html.Events exposing (onClick)
import String

import Game.Models.Main exposing (Game, getOwnGuess)
import Game.Models.Room exposing (Room)
import Game.Models.Player exposing (isDraw, getWinnerId)
import Game.Models.Guess as Guess
import Game.Messages exposing (Msg(..))

type alias StyleDec = List (String, String)

letterStyle : Float -> Float -> Float -> StyleDec
letterStyle left top angle =
  let
    leftVal =
      left
        |> (*) 100
        |> toString
    topVal =
      top
        |> (*) 100
        |> toString
    rotateVal =
      angle
        |> (*) (180 / pi)
        |> toString
  in
    [ ("top", topVal ++ "%")
    , ("left", leftVal ++ "%")
    , ("transform", "translate3d(-50%, -50%, 0) rotate(" ++ rotateVal ++ "deg)")
    ]

viewLetter : Game -> Int -> Int -> String -> Html Msg
viewLetter model len index letter =
  let
    guessIndex =
      getOwnGuess model
        |> Maybe.map .value
        |> Maybe.map (
              \val ->
                case val of
                  Guess.Pending -> Nothing
                  Guess.Idle -> Nothing
                  Guess.Made i -> Just i
            )
        |> Maybe.withDefault (Just 0)
    angle = 2 * pi * (toFloat index) / toFloat(len)
      |> (+) (toFloat(model.angle) * pi / 180)
    top =
      ( angle
          |> sin
          |> (*) 0.4
          |> (+) 0.5
      )

    left =
      ( angle
          |> cos
          |> (*) 0.4
          |> (+) 0.5
      )
    rotate = angle + pi / 2
  in
    p
      [ classList
          [ ("word__letter", True)
          , ("word__letter--highlighted", guessIndex == Just index)
          ]
      , onClick (MakeGuess index)
      , style
          (letterStyle left top rotate)
      ]
      [ text letter
      ]

view : Game -> Room -> Html Msg
view model room =
  let
    letters : List String
    letters = String.split "" room.roundData.word
    isDisabled = (isDraw room.players) || ((getWinnerId room.players) /= Nothing)
  in
    div
      [ classList
          [ ("word", True)
          , ("word--disabled", isDisabled)
          ]
      ]
      (List.indexedMap (viewLetter model (List.length letters)) letters)
