module RoomCreator.Views.CreateForm exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button, fieldset, input)
import Html.Attributes exposing (class, classList, type', disabled)
import Html.Events exposing (onClick, onWithOptions)

import UiKit.LabeledInput
import RoomCreator.Messages exposing (Msg(..))
import RoomCreator.Models exposing (Model, canSubmit)

view : Model -> Html Msg
view model =
  div
    [ class "basic-content"
    ]
    [ h2 [] [ text "Create a room in a jiffy" ]
    , p [] [ text "Now that’s a very short time, if you care to lend us a hand: please use lowercase letters only." ]
    , div
        [ class "form" ]
        [ fieldset
            []
            [ UiKit.LabeledInput.view
                { id = "roomId"
                , label = "Room name"
                , type' = "text"
                , autofocus = True
                , placeholder = "E.g. theroom"
                , onInput = InputRoomId
                }
            ]
        , fieldset
            []
            (
              model.playerIds
                |> List.indexedMap
                    (
                      \i playerId ->
                        (
                          UiKit.LabeledInput.view
                            { id = "player" ++ (toString i)
                            , label = "Player " ++ (toString (i + 1))
                            , type' = "text"
                            , autofocus = False
                            , placeholder = "E.g. alfred"
                            , onInput = (InputPlayer i)
                            }
                        )
                    )
            )
        , button
            [ onClick AddPlayer ]
            [ text "Add" ]
        , input
            [ type' "submit"
            , disabled (canSubmit model |> not)
            , onClick SubmitCreateForm
            ]
            [ text "Submit" ]
        ]
    ]
