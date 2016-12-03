module Tests exposing (..)

import Test exposing (..)
import Expect
import Utilities


all : Test
all =
    describe "Lettero"
        [ describe "Utilities"
            [ test "textTemplate" <|
                \() ->
                    Expect.equal (Utilities.textTemplate "Hello, ${}!" "Lettero") "Hello, Lettero!"
            ]
        ]
