# Lettero

A mildly frustrating, yet somehow delightful multiplayer word game. Click on the first letter of a word that is written in a circle. Now try to make it faster than your opponent. Watch out for mental blocks. Enjoy!

Jumpstarted with the generous support and encouragement of [Airtame](https://airtame.com), during a [hackathon](http://blog.airtame.com/hackairthon-2/#wordsnakeamultiplayerwordgame). Carried on as a weekend project afterwards.

## Just a little experiment

This is a modest, front-end focused project that experiments with multiplayer games using [Elm](http://elm-lang.org/). The back-end recently migrated from a tiny Express-concoction into a Google Firebase server.

Some of the interesting bits:

* use one of the clients as judge/game state reconciler, calling rounds and deciding on winners without back-end logic.
* stateful(ish) Elm modules, managing their own network requests and other effects through the parent's update function, but without the parent knowing anything about the internals. In other words, we got ourselves some fully encapsulated model-update-view-command-subscription modules inside their parent model-update-view-command-subscription.
* COMING UP: how do we make this into a game engine? Can we refactor the code

## Run locally

You'll need to have Elm installed globally (`npm install -g elm`). Afterwards, some setup:

`git clone <repository>`
`npm install`
`elm package install`

Run `firebase serve` (server) and `npm run dev` (client) in two separate terminal windows. Refresh every time front-end has changed. Stay tuned for a nicer setup.

Oh, you might also need a firebase app with the following schema already defined in the database:

```json
{
  "rooms": {},
  "roundData": {
    "words": {
      "binge": "",
      "hedgehog": "",
      "staircase": "",
      "rollercoaster": "",
      "otherwords": ""
    }
  }
}
```

The game will fill in the rest while you go through the room creation steps.
