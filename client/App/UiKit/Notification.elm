module UiKit.Notification exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (class, classList)

view : String -> Bool -> Html a
view content isActive =
  div
    [ classList
        [ ("notification", True)
        , ("notification--active", isActive)
        ]
    ]
    [ p [] [ text content ]
    ]
