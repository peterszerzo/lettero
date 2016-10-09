module Router exposing (..)

import Navigation
import UrlParser
import String

type Route
  = Home
  | About
  | NotFound

routeUrls : List (Route, String)
routeUrls =
  [ (Home, "")
  , (About, "about")
  ]

defaultRouteUrl : (Route, String)
defaultRouteUrl =
  (Home, "")

matchers : UrlParser.Parser (Route -> a) a
matchers =
  routeUrls
    |> List.map (\(rt, url) -> (UrlParser.format rt (UrlParser.s url)))
    |> UrlParser.oneOf

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
