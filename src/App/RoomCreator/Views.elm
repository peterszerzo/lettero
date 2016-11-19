module RoomCreator.Views exposing (view)

import Html exposing (Html, div, text, h1, h2, p, a, button, fieldset, input, span)
import Html.Attributes exposing (class, classList, type_, disabled, href)
import Html.Events exposing (onClick, onWithOptions)
import Models.Room as Room
import Router
import RoomCreator.Models exposing (Model, Status(..), canSubmit)
import RoomCreator.Messages exposing (Msg(..))
import UiKit.LabeledInput


view : Model -> Html Msg
view model =
    div
        [ class "app__page"
        ]
        [ viewContent model
        ]


viewContent : Model -> Html Msg
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


viewCreateForm : Model -> Html Msg
viewCreateForm model =
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


viewSuccess : Room.Room -> Html Msg
viewSuccess room =
    div
        [ class "basic-content"
        ]
        [ h2 [] [ text "Success!" ]
        , p [] [ text <| "Yes, indeed, " ++ room.id ++ " is all yours! And now:" ]
        , button
            [ class "button"
            , onClick (Navigate ("/" ++ Router.roomsPath ++ "/" ++ room.id))
            ]
            [ text "Go to your room!! ☞"
            ]
        ]

viewError : Room.Room -> Html Msg
viewError room =
    div
        [ class "basic-content"
        ]
        [ h2 [] [ text "Well that didn’t go so well.." ]
        , p [] [ text "Things go wrong from time to time.. anyways, care to try again?" ]
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
