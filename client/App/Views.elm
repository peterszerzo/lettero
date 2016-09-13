module Views exposing (view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (style, class, classList, attribute)
import Html.Events exposing (onClick)
import Styles
import String

import Models.App exposing (Model, getOwnGuess)
import Models.Room exposing (Room)
import Models.Player exposing (Player, PlayerId)
import Messages exposing (Msg(..))

viewLetter : Model -> Int -> Int -> String -> Html Msg
viewLetter model len index letter =
  let
    guessIndex =
      getOwnGuess model
        |> Maybe.map (.value)
    angle = 2 * pi * (toFloat index) / toFloat(len)
      |> (+) (toFloat(model.angle) * pi / 180)
    top =
      ( angle
          |> sin
          |> (*) 0.4
          |> (+) 0.5
      )

    left =
      ( angle
          |> cos
          |> (*) 0.4
          |> (+) 0.5
      )
    rotate = angle + pi / 2
  in
    p
      [ classList
          [ ("letter", True)
          , ("letter--highlighted", guessIndex == Just index)
          ]
      , onClick (MakeGuess index)
      , style
          (Styles.letter left top rotate)
      ]
      [ text letter
      ]

viewWord : Model -> Room -> Html Msg
viewWord model room =
  let
    letters : List String
    letters = String.split "" room.word
  in
    div
      [ class "rail"
      ]
      (List.indexedMap (viewLetter model (List.length letters)) letters)

viewSpinner : Html Msg
viewSpinner =
  p [] [text "hang in there..."]

viewPlayer : Player -> Html Msg
viewPlayer { id, score } =
  p [class "score-board__item"] [text (id ++ ": " ++ (toString score))]

viewScoreBoard : PlayerId -> Maybe (List Player) -> Html Msg
viewScoreBoard playerId players =
  let
    content = case players of
      Nothing ->
        []
      Just players ->
        (List.map viewPlayer players)
  in
  div
    [ class "score-board"
    ]
    content

view : Model -> Html Msg
view model =
  let
    content = case model.room of
      Nothing ->
        viewSpinner
      Just room ->
        viewWord model room
  in
    div
      [ class "container"
      ]
      [ content
      , viewScoreBoard model.playerId (Maybe.map (.players) model.room)
      ]
