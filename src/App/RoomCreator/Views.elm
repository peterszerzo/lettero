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
                    , placeholder =
                        if (i % 2 == 0) then
                            "e.g. alfred"
                        else
                            "e.g. samantha"
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
    let
        isValidInput =
            Utilities.isAllLowercaseLetter model.roomId
                && (model.playerIds
                        |> List.map Utilities.isAllLowercaseLetter
                        |> List.all identity
                   )
    in
        [ h2 [] [ text Content.roomCreatorPageTitle ]
        , UiKit.Form.view
            (if model.status == Processing then
                UiKit.Form.Processing
             else
                UiKit.Form.Enabled
            )
            (if isValidInput then
                Nothing
             else
                Just Content.roomCreatorFormValidationError
            )
          <|
            [ UiKit.LabeledInput.view
                { id = "roomId"
                , label = "Room name"
                , type_ = "text"
                , value = model.roomId
                , autofocus = False
                , placeholder = "e.g. mycoolroomxyz"
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
        , p [] [ text Content.roomCreatorPageBody ]
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
