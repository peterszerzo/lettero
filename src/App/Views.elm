module Views exposing (view)

import Html exposing (Html, div, text, h1, h2, h3, p, button, nav, map)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)
import Markdown
import Router
import Messages exposing (Msg(..))
import Models exposing (Model)
import Game.Views
import RoomCreator.Views
import RoomManager.Views
import Tutorial.Views
import Content
import UiKit.Background
import UiKit.Spinner
import UiKit.Icons exposing (logo)


view : Model -> Html Msg
view model =
    let
        content =
            case model.route of
                Router.Home ->
                    viewHome

                Router.Start ->
                    viewStart

                Router.About ->
                    viewAbout

                Router.NotFound ->
                    viewNotFound

                Router.Ui ->
                    viewUi

                Router.RoomCreator rc ->
                    rc
                        |> RoomCreator.Views.view
                        |> map RoomCreatorMsg

                Router.RoomManager rm ->
                    rm
                        |> RoomManager.Views.view
                        |> map RoomManagerMsg

                Router.Game gm ->
                    gm
                        |> Game.Views.view
                        |> map GameMsg

                Router.Tutorial tut ->
                    tut
                        |> Tutorial.Views.view
                        |> map TutorialMsg
    in
        div
            [ class "app"
            ]
            [ viewNav model
            , UiKit.Background.view
            , content
            ]


layout : List (Html Msg) -> Html Msg
layout children =
    div
        [ class "app__page"
        ]
        [ div
            [ class "basic-content"
            ]
            children
        ]


viewHome : Html Msg
viewHome =
    layout
        [ h1 [] [ text "Lettero" ]
        , h3 [] [ text "Playground for the social wordnerd" ]
        , div
            [ class "basic-content__nav"
            ]
            [ button
                [ class "button"
                , onClick (Navigate ("/" ++ Router.startPath))
                ]
                [ text "Play"
                ]
            , button
                [ class "button"
                , onClick (Navigate ("/" ++ Router.aboutPath))
                ]
                [ text "About"
                ]
            ]
        ]


viewNotFound : Html Msg
viewNotFound =
    layout
        [ h2 [] [ text "Not found :/" ]
        , p [] [ text "Uh, boy, looks like we sent you to the wrong place.." ]
        ]


viewNav : Model -> Html Msg
viewNav model =
    nav
        [ classList [ ( "nav", True ), ( "nav--hidden", model.route == Router.Home ) ]
        , onClick (Navigate "/")
        ]
        [ div
            [ class "nav__item nav__item--left"
            ]
            [ logo ]
        ]


viewStart : Html Msg
viewStart =
    layout
        [ p [] [ text "Shall we start with a 15-second tutorial?" ]
        , button
            [ class "button"
            , onClick (Navigate ("/" ++ Router.tryPath))
            ]
            [ text "Tutorial"
            ]
        , p [] [ text "If you’ve got the hang of it, create a room. No login required." ]
        , button
            [ class "button"
            , onClick (Navigate ("/" ++ Router.newPath))
            ]
            [ text "Create room"
            ]
        ]


viewAbout : Html Msg
viewAbout =
    layout
        [ Markdown.toHtml [] (Content.about)
        , button
            [ class "button"
            , onClick (Navigate <| "/" ++ Router.homePath)
            ]
            [ text "☜ Back" ]
        , button
            [ class "button"
            , onClick (Navigate <| "/" ++ Router.startPath)
            ]
            [ text "Play ☞" ]
        ]


viewUi : Html Msg
viewUi =
    layout
        [ h2 [] [ text "Lettero UI kit" ]
        , p [] [ text "A list of UI elements used in the game." ]
        , div
            []
            [ p [] [ text "Spinner" ]
            , UiKit.Spinner.view
            ]
        ]
