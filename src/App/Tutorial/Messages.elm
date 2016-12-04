module Tutorial.Messages exposing (..)


type Msg
    = Start
    | Guess Int
    | Navigate String


newPath : Msg -> Maybe String
newPath msg =
    case msg of
        Navigate pth ->
            Just pth

        _ ->
            Nothing
