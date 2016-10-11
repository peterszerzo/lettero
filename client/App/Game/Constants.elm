module Game.Constants exposing (..)

import Time exposing (Time, millisecond)

tickDuration : Time
tickDuration = 50 * millisecond

coolDownDuration : Time
coolDownDuration = 3000 * millisecond
