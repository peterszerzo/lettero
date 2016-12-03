module Game.Views exposing (view)

import Dict
import Html exposing (Html, div, p, h1, h2, text, button, span)
import Html.Lazy exposing (lazy, lazy2)
import Html.Attributes exposing (style, class, classList, attribute, disabled)
import Html.Events exposing (onClick)
import Content
import Utilities
import Game.Constants exposing (roundDuration)
import Models.Room as Room
import Models.Guess as Guess
import Models.Player as Player
import Game.Models exposing (Model, Error, getOwnGuess)
import Game.Messages exposing (Msg(..))
import UiKit.Spinner
import UiKit.TickTockTickTock
import UiKit.Notification
import UiKit.ScoreBoard
import UiKit.Word


view : Model -> Html Msg
view model =
    div
        [ class "app__page"
        ]
        (case model.error of
            Just err ->
                viewError err

            Nothing ->
                model.room
                    |> Maybe.map (viewGame model)
                    |> Maybe.withDefault [ div [] [ UiKit.Spinner.view ] ]
        )


viewGame : Model -> Room.Room -> List (Html Msg)
viewGame model room =
    let
        timeRatioLeft =
            if (Room.isRoundOver room) then
                0
            else
                (1 - model.currentRoundTime / roundDuration) |> clamp 0 1
    in
        if Player.areAllReady room.players then
            [ viewWord model room
            , viewScoreBoard model.playerId room.players
            , viewNotification model room
            , UiKit.TickTockTickTock.view timeRatioLeft
            ]
        else
            [ viewReadyScreen room.players model.playerId
            ]


viewError : Error -> List (Html Msg)
viewError error =
    [ div [ class "basic-content" ] [ h2 [] [ text Content.defaultErrorMessage ] ] ]


getNotificationContent : String -> String -> String
getNotificationContent winner self =
    if winner == self then
        Utilities.textTemplate Content.gameRoundWinNotification winner
    else
        Utilities.textTemplate Content.gameRoundLoseNotification winner


viewNotification : Model -> Room.Room -> Html Msg
viewNotification model room =
    let
        ownGuess =
            getOwnGuess model

        ( isActive, content ) =
            if Player.isDraw room.players then
                ( True, Content.gameTieNotification )
            else if (Player.getWinnerId room.players /= Nothing) then
                Player.getWinnerId room.players
                    |> Maybe.map (\id -> ( True, getNotificationContent id model.playerId ))
                    |> Maybe.withDefault ( False, "" )
            else if (ownGuess |> Maybe.map .status |> (==) (Just Guess.Idle)) then
                ( True, Content.gameIdleNotification )
            else if (ownGuess |> Maybe.map Guess.isIncorrect |> (==) (Just True)) then
                ( True, Content.gameIncorrectGuessNotification )
            else
                ( False, "" )
    in
        UiKit.Notification.view content isActive


viewScoreBoard : String -> Player.Players -> Html Msg
viewScoreBoard playerId players =
    let
        playersList =
            players
                |> Player.toList

        scores =
            playersList
                |> List.map .score

        maxScore =
            scores
                |> List.maximum
                |> Maybe.withDefault 0

        maxCount =
            scores
                |> List.foldl
                    (\a i ->
                        if a == maxScore then
                            i + 1
                        else
                            i
                    )
                    0

        viewData =
            playersList
                |> List.map
                    (\p ->
                        ( p.id
                        , p.score
                        , if maxCount < 2 then
                            p.score == maxScore
                          else
                            False
                        )
                    )
    in
        UiKit.ScoreBoard.view viewData


viewReadyScreenPlayer : String -> Player.Player -> Html Msg
viewReadyScreenPlayer playerId player =
    let
        classAttributes =
            [ classList
                [ ( "button", True )
                , ( "button--disabled", (player.id /= playerId) )
                ]
            , disabled (player.id /= playerId)
            ]

        eventAttributes =
            if player.id == playerId then
                [ onClick SetReady ]
            else
                []

        content =
            player.id
                ++ " "
                ++ (if player.isReady then
                        "✓"
                    else
                        "..."
                   )
    in
        button
            (classAttributes ++ eventAttributes)
            [ text content
            ]


viewReadyScreen : Player.Players -> String -> Html Msg
viewReadyScreen players playerId =
    div
        [ class "basic-content" ]
        [ h2
            []
            [ text Content.gameReadyScreenTitle
            ]
        , p
            []
            [ text Content.gameReadyScreenBody
            ]
        , div []
            (players
                |> Player.toList
                |> List.map (viewReadyScreenPlayer playerId)
            )
        ]


viewWord : Model -> Room.Room -> Html.Html Msg
viewWord model room =
    let
        guessIndex =
            getOwnGuess model
                |> Maybe.map Guess.toMaybe
                |> Maybe.withDefault (Just 0)

        startAngle =
            (toFloat model.currentRoundRandom) / 1000 * 2 * pi

        isRoundOver =
            Room.isRoundOver room

        highlights =
            guessIndex
                |> Maybe.map (\i -> [ ( i, "highlighted" ) ])
                |> Maybe.map
                    ((++)
                        (if isRoundOver then
                            [ ( 0, "marked" ) ]
                         else
                            []
                        )
                    )
                |> Maybe.map Dict.fromList
                |> Maybe.withDefault Dict.empty
    in
        lazy UiKit.Word.view
            { word = room.roundData.word
            , startAngle = startAngle
            , highlights = highlights
            , isDisabled = isRoundOver
            , onLetterClick = MakeGuess
            }
