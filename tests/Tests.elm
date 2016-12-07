module Tests exposing (..)

import Test exposing (..)
import Expect
import Utilities


all : Test
all =
    describe "Lettero"
        [ describe "Utilities.textTemplate"
            [ test "replaces ${} with argument string" <|
                \() ->
                    Expect.equal (Utilities.textTemplate "Hello, ${}!" "Lettero") "Hello, Lettero!"
            ]
        , describe "Utilities.isAllLowercaseLetter"
            [ test "returns true if all lowercase letter" <|
                \() ->
                    Expect.equal (Utilities.isAllLowercaseLetter "adsf") True
            , test "returns false otherwise" <|
                \() ->
                    Expect.equal (Utilities.isAllLowercaseLetter "adsf1") False
            ]
        ]
