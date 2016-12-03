module Utilities exposing (..)

import Regex


textTemplate : String -> String -> String
textTemplate template value =
  Regex.replace
    Regex.All
    ("${}" |> Regex.escape |> Regex.regex)
    (always value)
    template
