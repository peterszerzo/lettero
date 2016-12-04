module UiKit.Word exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)
import Html.Events exposing (onClick)
import String
import Dict


type alias StyleDec =
    List ( String, String )


type alias Options a =
    { word : String
    , onGuess : Int -> a
    , isDisabled : Bool
    , startAngle : Float
    , highlights : Dict.Dict Int String
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
        [ ( "top", topVal ++ "%" )
        , ( "left", leftVal ++ "%" )
        , ( "transform", "translate3d(-50%, -50%, 0) rotate(" ++ rotateVal ++ "deg)" )
        ]


viewLetter : Float -> Dict.Dict Int String -> (Int -> a) -> Int -> Int -> String -> Html a
viewLetter startAngle highlights onLetterClick len index letter =
    let
        angle =
            startAngle + 2 * pi * (toFloat index) / toFloat (len)

        top =
            (angle
                |> sin
                |> (*) 0.4
                |> (+) 0.5
            )

        left =
            (angle
                |> cos
                |> (*) 0.4
                |> (+) 0.5
            )

        rotate =
            angle + pi / 2

        highlightClassListItem =
            Dict.get index highlights
                |> Maybe.map (\s -> ( "word__letter--" ++ s, True ))
                |> Maybe.withDefault ( "", False )
    in
        p
            [ classList
                [ ( "word__letter", True )
                , highlightClassListItem
                ]
            , onClick (onLetterClick index)
            , style
                (letterStyle left top rotate)
            ]
            [ text letter
            ]


view : Options msg -> Html msg
view { word, startAngle, isDisabled, onGuess, highlights } =
    let
        letters =
            String.split "" word
    in
        div
            [ classList
                [ ( "word", True )
                , ( "word--disabled", isDisabled )
                ]
            ]
            (List.indexedMap (viewLetter startAngle highlights onGuess (List.length letters)) letters)
