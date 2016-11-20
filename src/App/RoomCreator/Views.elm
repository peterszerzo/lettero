module RoomCreator.Views exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button, fieldset, input, span)
import Html.Attributes exposing (class, classList, type_, disabled, href)
import Html.Events exposing (onClick, onWithOptions)
import Models.Room as Room
import Router
import Content
import Utilities
import RoomCreator.Models exposing (Model, Status(..), canSubmit)
import RoomCreator.Messages exposing (Msg(..))
import UiKit.LabeledInput
import UiKit.PageLayout


view : Model -> Html Msg
view model =
    viewContent model
        |> UiKit.PageLayout.view


viewContent : Model -> List (Html Msg)
viewContent model =
    case model.status of
        Success ->
            model.room
                |> Maybe.withDefault (Room.getDummy "1")
                |> viewSuccess

        Error ->
            model.room
                |> Maybe.withDefault (Room.getDummy "1")
                |> viewError

        _ ->
            viewCreateForm model


viewAddButton : Html Msg
viewAddButton =
    button
        [ onClick AddPlayer
        , class "form__add"
        ]
        [ span [] [ text "+" ] ]


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
    , div
        [ class "form" ]
        [ fieldset
            []
            [ UiKit.LabeledInput.view
                { id = "roomId"
                , label = "Room name"
                , type_ = "text"
                , value = model.roomId
                , autofocus = True
                , placeholder = "E.g. theroom"
                , onInput = InputRoomId
                , delete = Nothing
                }
            ]
        , fieldset
            []
            (List.concat [ (viewPlayers model.playerIds), [ viewAddButton ] ])
        , input
            [ type_ "submit"
            , disabled (canSubmit model |> not)
            , onClick SubmitCreateForm
            ]
            [ text "Submit" ]
        ]
    ]


viewSuccess : Room.Room -> List (Html Msg)
viewSuccess room =
    [ h2 [] [ text Content.roomCreatorPageSuccessTitle ]
    , p [] [ Utilities.textTemplate Content.roomCreatorPageSuccessBody room.id |> text ]
    , button
        [ class "button"
        , onClick (Navigate ("/" ++ Router.roomsPath ++ "/" ++ room.id))
        ]
        [ text Content.roomCreatorPageSuccessButtonText
        ]
    ]


viewError : Room.Room -> List (Html Msg)
viewError room =
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
