module RoomCreator.Views exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button, input, span)
import Html.Attributes exposing (class, classList, type_, disabled, href)
import Html.Events exposing (onClick, onWithOptions)
import Router
import Content
import Utilities
import RoomCreator.Models exposing (Model, Status(..), canSubmit)
import RoomCreator.Messages exposing (Msg(..))
import UiKit.LabeledInput
import UiKit.PageLayout
import UiKit.Form


view : Model -> Html Msg
view model =
    viewContent model
        |> UiKit.PageLayout.view


viewContent : Model -> List (Html Msg)
viewContent model =
    case model.status of
        Success ->
            viewSuccess model

        Error ->
            viewError

        _ ->
            viewCreateForm model


viewPlayers : List String -> List (Html Msg)
viewPlayers playerIds =
    playerIds
        |> List.indexedMap
            (\i playerId ->
                (UiKit.LabeledInput.view
                    { id = "player" ++ (toString i)
                    , label = "Player " ++ (toString (i + 1))
                    , type_ = "text"
                    , value = playerId
                    , autofocus = False
                    , placeholder = "E.g. alfred"
                    , onInput = InputPlayer i
                    , delete =
                        if (List.length playerIds > 2) then
                            Just <| RemovePlayer i
                        else
                            Nothing
                    }
                )
            )


viewCreateForm : Model -> List (Html Msg)
viewCreateForm model =
    [ h2 [] [ text Content.roomCreatorPageTitle ]
    , p [] [ text Content.roomCreatorPageBody ]
    , UiKit.Form.view
        (if model.status == Processing then
            UiKit.Form.Processing
         else
            UiKit.Form.Enabled
        )
        Nothing
      <|
        [ UiKit.LabeledInput.view
            { id = "roomId"
            , label = "Room name"
            , type_ = "text"
            , value = model.roomId
            , autofocus = False
            , placeholder = "E.g. theroom"
            , onInput = InputRoomId
            , delete = Nothing
            }
        ]
            ++ (viewPlayers model.playerIds)
            ++ [ button
                    [ onClick AddPlayer
                    , class "form__button"
                    ]
                    [ span [] [ text Content.roomCreatorPageAddPlayerPrompt ] ]
               , button
                    [ classList
                        [ ( "form__button", True )
                        , ( "form__button--disabled", canSubmit model |> not )
                        ]
                    , onClick SubmitCreateForm
                    ]
                    [ text "Submit" ]
               ]
    ]


viewSuccess : Model -> List (Html Msg)
viewSuccess model =
    [ h2 [] [ text Content.roomCreatorPageSuccessTitle ]
    , p [] [ Utilities.textTemplate Content.roomCreatorPageSuccessBody model.roomId |> text ]
    , button
        [ class "button"
        , onClick (Navigate ("/" ++ Router.roomsPath ++ "/" ++ model.roomId))
        ]
        [ text Content.roomCreatorPageSuccessButtonText
        ]
    ]


viewError : List (Html Msg)
viewError =
    [ h2 [] [ text Content.roomCreatorPageErrorTitle ]
    , p [] [ text Content.roomCreatorPageErrorBody ]
    , button
        [ class "button"
        , onClick (Navigate ("/" ++ Router.newPath))
        ]
        [ text "Yes"
        ]
    , button
        [ class "button"
        , onClick (Navigate ("/" ++ Router.newPath))
        ]
        [ text "No"
        ]
    ]
