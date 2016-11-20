module RoomManager.Views exposing (view)

import Html exposing (Html, a, div, text, h2, p)
import Html.Attributes exposing (class, href)
import Content
import Utilities
import RoomManager.Models exposing (Model, Stage(..))
import RoomManager.Messages exposing (Msg)
import Models.Player as Player
import Models.Room as Room
import Constants exposing (baseUrl)
import UiKit.Spinner


viewPlayerPlay : String -> Player.Player -> Html Msg
viewPlayerPlay roomId player =
    a
        [ class "button"
        , href ("/rooms/" ++ roomId ++ "/" ++ player.id)
        ]
        [ text ("♟ " ++ player.id)
        ]


viewPlayerEmail : String -> Player.Player -> Html Msg
viewPlayerEmail roomId player =
    a
        [ class "button"
        , href ("mailto:?body=" ++ baseUrl ++ "/rooms/" ++ roomId ++ "/" ++ player.id)
        ]
        [ text ("✎ " ++ player.id)
        ]


viewPlayers : (String -> Player.Player -> Html Msg) -> Room.Room -> List (Html Msg)
viewPlayers viewPlayer room =
    room.players
        |> Player.toList
        |> List.map (viewPlayer room.id)


view : Model -> Html Msg
view model =
    let
        content =
            case model.stage of
                FetchingRoom ->
                    div []
                        [ UiKit.Spinner.view
                        ]

                Base ->
                    div []
                        ([ p [] [ text Content.roomManagerPagePlayLinksIntro ]
                         ]
                            ++ (model.room
                                    |> Maybe.map (viewPlayers viewPlayerPlay)
                                    |> Maybe.withDefault []
                               )
                            ++ [ p [] [ text Content.roomManagerPageInviteLinksIntro ]
                               ]
                            ++ (model.room
                                    |> Maybe.map (viewPlayers viewPlayerEmail)
                                    |> Maybe.withDefault []
                               )
                        )

                _ ->
                    div [] []
    in
        div
            [ class "app__page"
            ]
            [ div
                [ class "basic-content"
                ]
                [ h2 [] [ Utilities.textTemplate Content.roomManagerPageTitle model.roomId |> text ]
                , content
                ]
            ]
