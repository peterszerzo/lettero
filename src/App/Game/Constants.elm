module Game.Constants exposing (..)

import Time exposing (Time, millisecond)


tickDuration : Time
tickDuration =
    100 * millisecond


coolDownDuration : Time
coolDownDuration =
    3000 * millisecond


roundDuration : Time
roundDuration =
    5000 * millisecond
