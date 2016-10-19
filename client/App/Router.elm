module Router exposing (..)

import Navigation
import UrlParser exposing (..)
import String

type Route
  = Home
  | About
  | Tutorial
  | Rooms
  | Room String
  | GamePlay String String
  | NotFound

defaultRouteUrl : (Route, String)
defaultRouteUrl =
  (Home, "")

matchers : UrlParser.Parser (Route -> a) a
matchers =
  UrlParser.oneOf
    [ format Home (s "")
    , format About (s "about")
    , format Tutorial (s "tutorial")
    , format GamePlay (s "rooms" </> string </> string)
    , format Room (s "rooms" </> string)
    , format Rooms (s "rooms")
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
