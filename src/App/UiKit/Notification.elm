module UiKit.Notification exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (class, classList)


view : String -> Bool -> Bool -> Html a
view content isActive isHighlighted =
    div
        [ classList
            [ ( "notification", True )
            , ( "notification--active", isActive )
            , ( "notification--highlighted", isHighlighted )
            ]
        ]
        [ p [] [ text content ]
        ]
