module Root.Views.MobileNotification exposing (view)

import Html exposing (Html, div, text ,h2, p, button, nav)
import Html.Attributes exposing (class, classList)

view : Html a
view =
  div
    [ class "app__page app__page--mobile"
    ]
    [ div
        [ class "basic-content" ]
        [ h2 [] [ text "Please see me on desktop.." ]
        , p [] [ text "This is a tad embarrassing, but Lettero is not quite ready for mobile devices yet. Be with you shortly!" ]
        ]
    ]
