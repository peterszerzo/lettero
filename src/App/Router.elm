module Router exposing (..)

import Navigation
import UrlParser exposing (..)
import String

type Route
  = Home
  | Start
  | About
  | Tutorial
  | NewRoom
  | Room String
  | GamePlay String String
  | NotFound

tryPath : String
tryPath =
  "try"

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

defaultRouteUrl : (Route, String)
defaultRouteUrl =
  (Home, "")

matchers : UrlParser.Parser (Route -> a) a
matchers =
  UrlParser.oneOf
    [ s homePath |> format Home
    , s startPath |> format Start
    , s aboutPath |> format About
    , s tryPath |> format Tutorial
    , s roomsPath </> string </> string |> format GamePlay
    , s roomsPath </> string |> format Room
    , s newPath |> format NewRoom
    ]

pathnameParser : Navigation.Location -> (Result String Route)
pathnameParser location =
  location.pathname
    |> String.dropLeft 1
    |> UrlParser.parse identity matchers

parser : Navigation.Parser (Result String Route)
parser =
  Navigation.makeParser pathnameParser

routeFromResult : Result a Route -> Route
routeFromResult result =
  case result of
    Ok route ->
      route

    Err string ->
      NotFound
