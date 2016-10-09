# Lettero

A mildly frustrating multiplayer word game. Play as [Samantha](/theroom/samantha) or [Alfred](/theroom/alfred) (both need to be human). Click on the first letter of a word that is written in a circle. Now try faster. Watch out for mental blocks. Enjoy!

Made with the generous support and encouragement of [Airtame](https://airtame.com), during a [hackathon](http://blog.airtame.com/hackairthon-2/#wordsnakeamultiplayerwordgame).

## Just a little experiment

This is a modest, front-end focused project that experiments with multiplayer games using [Elm](http://elm-lang.org/). The Express server lent us its runtime memory to use as a database - therefore, every time the server goes to sleep, everything is wiped out. One game room and two players only for now.

## Run locally

You'll need to have Elm installed globally (`npm install -g elm`). Afterwards, some setup:

`git clone <repository>`
`npm install`
`elm package install`

Run `npm run dev` (server) and `npm run watch` (client) in two separate terminal windows. Refresh every time front-end has changed. Stay tuned for a nicer setup.
