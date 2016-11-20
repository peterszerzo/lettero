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
import UiKit.PageLayout


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


viewHome : Html Msg
viewHome =
    UiKit.PageLayout.view
        [ h1 [] [ text Content.homePageTitle ]
        , h3 [] [ text Content.homePageSubtitle ]
        , div
            [ class "basic-content__nav"
            ]
            [ button
                [ class "button"
                , onClick (Navigate ("/" ++ Router.startPath))
                ]
                [ text Content.homePagePlayButtonText
                ]
            , button
                [ class "button"
                , onClick (Navigate ("/" ++ Router.aboutPath))
                ]
                [ text Content.homePageAboutButtonText
                ]
            ]
        ]


viewNotFound : Html Msg
viewNotFound =
    UiKit.PageLayout.view
        [ h2 [] [ text Content.notFoundPageTitle ]
        , p [] [ text Content.notFoundPageBody ]
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
    UiKit.PageLayout.view
        [ p [] [ text Content.startPageTutorialPrompt ]
        , button
            [ class "button"
            , onClick (Navigate ("/" ++ Router.tryPath))
            ]
            [ text "Tutorial"
            ]
        , p [] [ text Content.startPageCreateRoomPrompt ]
        , button
            [ class "button"
            , onClick (Navigate ("/" ++ Router.newPath))
            ]
            [ text "Create room"
            ]
        ]


viewAbout : Html Msg
viewAbout =
    UiKit.PageLayout.view
        [ Markdown.toHtml [] (Content.aboutPageContent)
        , button
            [ class "button"
            , onClick (Navigate <| "/" ++ Router.homePath)
            ]
            [ text Content.aboutPageBackButtonText ]
        , button
            [ class "button"
            , onClick (Navigate <| "/" ++ Router.startPath)
            ]
            [ text Content.aboutPagePlayButtonText ]
        ]


viewUi : Html Msg
viewUi =
    UiKit.PageLayout.view
        [ h2 [] [ text "Lettero UI kit" ]
        , p [] [ text "A list of UI elements used in the game." ]
        , div
            []
            [ p [] [ text "Spinner" ]
            , UiKit.Spinner.view
            ]
        ]
