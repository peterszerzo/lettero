module UiKit.TickTockTickTock exposing (view)

import Html exposing (Html, div)
import Html.Attributes exposing (class, style)

view : Float -> Html a
view timeRatioLeft =
  div
    [ class "ticktockticktock"
    ]
    [ div
        [ class "ticktockticktock__content"
        , style
            [ ("width", timeRatioLeft * 100 |> toString |> (\s -> s ++ "%"))
            ]
        ] []
    ]
