module Router exposing (..)

import Navigation
import UrlParser exposing (..)


type Route
    = Home
    | Start
    | About
    | Tutorial
    | NewRoom
    | Room String
    | GamePlay String String
    | Ui
    | NotFound


tryPath : String
tryPath =
    "try"


uiPath : String
uiPath =
    "ui"


startPath : String
startPath =
    "start"


aboutPath : String
aboutPath =
    "about"


newPath : String
newPath =
    "new"


homePath : String
homePath =
    ""


roomsPath : String
roomsPath =
    "rooms"


defaultRouteUrl : ( Route, String )
defaultRouteUrl =
    ( Home, "" )


matchers : UrlParser.Parser (Route -> a) a
matchers =
    UrlParser.oneOf
        [ s homePath |> map Home
        , s startPath |> map Start
        , s aboutPath |> map About
        , s tryPath |> map Tutorial
        , s uiPath |> map Ui
        , s roomsPath </> string </> string |> map GamePlay
        , s roomsPath </> string |> map Room
        , s newPath |> map NewRoom
        ]


parse : Navigation.Location -> Route
parse location =
    location
        |> UrlParser.parsePath matchers
        |> Maybe.withDefault NotFound
