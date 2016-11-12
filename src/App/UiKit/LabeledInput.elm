module UiKit.LabeledInput exposing (view)

import Html exposing (Html, Attribute, div, text ,h1, h2, p, a, button, form, label, input, fieldset)
import Html.Attributes exposing (class, classList, type', id, name, for, required, autofocus, placeholder, href, value)
import Html.Events exposing (onInput, onClick)

type alias Options a =
  { id : String
  , label : String
  , type' : String
  , value : String
  , autofocus : Bool
  , placeholder : String
  , onInput : String -> a
  , delete : Maybe a
  }

viewDeleteButton delete =
  case delete of
    Just del ->
      div
        [ classList
            [ ("textinput__remove", True)
            , ("textinput__remove--displayed", True)
            ]
        , onClick del
        ]
        [ text "✕" ]
    Nothing ->
      div [] []

view : Options a -> Html a
view options =
  div [ class "textinput" ]
    [ label
        [ for options.id
        , class "textinput__label"
        ]
        [ text options.label
        ]
    , input
        [ class "textinput__field"
        , type' "text"
        , value options.value
        , id options.id
        , name options.id
        , onInput options.onInput
        , autofocus options.autofocus
        , placeholder options.placeholder
        ] []
    , viewDeleteButton options.delete
    ]
