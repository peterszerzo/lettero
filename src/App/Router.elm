module Router exposing (..)

import Navigation
import UrlParser exposing (..)
import Game.Models
import RoomCreator.Models
import RoomManager.Models
import Tutorial.Models


type Route
    = Home
    | Start
    | About
    | Tutorial Tutorial.Models.Model
    | RoomCreator RoomCreator.Models.Model
    | RoomManager RoomManager.Models.Model
    | Game Game.Models.Model
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
        , s tryPath |> map (Tutorial <| Tuple.first Tutorial.Models.init)
        , s uiPath |> map Ui
        , s roomsPath
            </> string
            </> string
            |> map
                (\roomId playerId ->
                    Game.Models.init { roomId = roomId, playerId = playerId }
                        |> Tuple.first
                        |> Game
                )
        , s roomsPath </> string |> map (\roomId -> RoomManager (RoomManager.Models.init roomId |> Tuple.first))
        , s newPath |> map (RoomCreator <| Tuple.first RoomCreator.Models.init)
        ]


parse : Navigation.Location -> Route
parse location =
    location
        |> UrlParser.parsePath matchers
        |> Maybe.withDefault NotFound
