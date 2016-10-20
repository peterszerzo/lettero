module Root.Views.Background exposing (view)

import Html exposing (Html, div, text ,h1, p, button, nav)
import Html.Attributes exposing (class, style)
import Char
import String

randomCoordinates : List (List Float)
randomCoordinates =
  [ [
      0.39772362282305,
      0.13385055958664
    ]
  , [
      0.90265921437869,
      0.78826690018196
    ]
  , [
      0.68433962491747,
      0.92743311379723
    ]
  , [
      0.96803548800928,
      0.62107961570188
    ]
  , [
      0.87890461393535,
      0.53139456523985
    ]
  , [
      0.24938027198527,
      0.74117815378618
    ]
  , [
      0.53646111173265,
      0.59048200410966
    ]
  , [
      0.14002300353906,
      0.40275729602502
    ]
  , [
      0.13631679054516,
      0.79465177102886
    ]
  , [
      0.67248952440424,
      0.29879515278558
    ]
  , [
      0.19575529674038,
      0.54673568772673
    ]
  , [
      0.44673726784932,
      0.60767216257622
    ]
  , [
      0.48502237539388,
      0.45007984986623
    ]
  , [
      0.48637634837427,
      0.53214031228054
    ]
  , [
      0.63161102890469,
      0.67875845938348
    ]
  , [
      0.44880325506446,
      0.40418736632348
    ]
  , [
      0.79171103082767,
      0.89732391360877
    ]
  , [
      0.36894288887264,
      0.20537349730458
    ]
  , [
      0.94620846255249,
      0.47698619775852
    ]
  , [
      0.032908616405397,
      0.60566972751773
    ]
  ]

toPercent f =
  (toString (f * 100)) ++ "%"

toSeconds f =
  "-" ++ (toString (f * 3)) ++ "s"

viewLetter i coord =
  let
    styleAttributes = (
      List.indexedMap
        (\i f -> if (i == 0) then ("top", toPercent f) else ("left", toPercent f))
        coord
    ) ++ [ ("animation-delay", toSeconds (List.head coord |> Maybe.withDefault 0)) ]
  in
    p
      [ style styleAttributes
      ]
      [ text (Char.fromCode (i + 65) |> String.fromChar) ]

view : Html a
view =
  div [ class "background" ]
    (List.indexedMap viewLetter randomCoordinates)
