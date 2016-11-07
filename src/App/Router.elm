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
    [ format Home (s homePath)
    , format Start (s startPath)
    , format About (s aboutPath)
    , format Tutorial (s tryPath)
    , format GamePlay (s roomsPath </> string </> string)
    , format Room (s roomsPath </> string)
    , format NewRoom (s newPath)
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
