module UiKit.Word exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)
import Html.Events exposing (onClick)
import String

type alias StyleDec = List (String, String)

type alias Options a =
  { word : String
  , onLetterClick : (Int -> a)
  , isDisabled : Bool
  }

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

viewLetter : (Int -> a) -> Int -> Int -> String -> Html a
viewLetter onLetterClick len index letter =
  let
    angle = 2 * pi * (toFloat index) / toFloat(len)
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
          , ("word__letter--highlighted", False)
          ]
      , onClick (onLetterClick index)
      , style
          (letterStyle left top rotate)
      ]
      [ text letter
      ]

view : Options a -> Html a
view { word, isDisabled, onLetterClick } =
  let
    letters = String.split "" word
  in
    div
      [ classList
          [ ("word", True)
          , ("word--disabled", isDisabled)
          ]
      ]
      (List.indexedMap (viewLetter onLetterClick (List.length letters)) letters)
