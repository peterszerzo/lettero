module UiKit.Form exposing (view, State(..))

import Html exposing (Html, div)
import Html.Attributes exposing (class, classList, disabled, href)
import UiKit.Spinner


type State
    = Enabled
    | Disabled
    | Processing


view : State -> List (Html msg) -> Html msg
view state children =
    div
        [ classList
            [ ( "form", True )
            , ( "form--inactive", state /= Enabled )
            ]
        ]
    <|
        [ div [ class "form__content" ] children
        ]
            ++ (if state == Processing then
                    [ div [ class "form__spinner" ] [ UiKit.Spinner.view ] ]
                else
                    []
               )
