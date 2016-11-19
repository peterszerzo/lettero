module Tutorial.Messages exposing (..)


type Msg
    = Proceed
    | Guess Int
    | Navigate String


newPath : Msg -> Maybe String
newPath msg =
    case msg of
        Navigate pth ->
            Just pth

        _ ->
            Nothing
