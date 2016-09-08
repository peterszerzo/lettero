module Styles exposing (..)

type alias StyleDec = List (String, String)

letter : Float -> Float -> Float -> StyleDec
letter left top angle =
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
