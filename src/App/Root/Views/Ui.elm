module Root.Views.Ui exposing (view)

import Html exposing (Html, div, p, h2, text, button)
import Html.Attributes exposing (class, classList)

import Root.Messages exposing (Msg(..))
import UiKit.Spinner
import UiKit.LabeledInput

view : Html Msg
view =
  div
    [ class "app__page"
    ]
    [ div
        [ class "basic-content"
        ]
        [ h2 [] [ text "Lettero UI kit" ]
        , p [] [ text "A list of UI elements used in the game." ]
        , div
            []
            [ p [] [ text "Spinner" ]
            , UiKit.Spinner.view
            ]
        ]
    ]
