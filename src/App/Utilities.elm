module Utilities exposing (..)

import Regex


textTemplate : String -> String -> String
textTemplate template value =
    Regex.replace
        Regex.All
        ("${}" |> Regex.escape |> Regex.regex)
        (always value)
        template


isAllLowercaseLetter : String -> Bool
isAllLowercaseLetter =
    (==) 1 << List.length << Regex.find Regex.All (Regex.regex "^[a-z]*$")
