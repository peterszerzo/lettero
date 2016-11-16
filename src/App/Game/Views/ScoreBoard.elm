module Game.Views.ScoreBoard exposing (view)

import Html exposing (Html)
import Models.Player as Player
import Game.Messages exposing (Msg(..))
import UiKit.ScoreBoard


view : String -> Player.Players -> Html Msg
view playerId players =
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
