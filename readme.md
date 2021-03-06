Deprecated in favor of [elm-gameroom](https://github.com/peterszerzo/elm-gameroom), which this project inspired.

# Lettero

[![Build Status](https://travis-ci.org/peterszerzo/lettero.svg?branch=master)](https://travis-ci.org/peterszerzo/lettero)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A mildly frustrating, yet somehow delightful multiplayer word game. Click on the first letter of a word that is written in a circle. Now try to make it faster than your opponent. Watch out for mental blocks. Enjoy!

Jumpstarted with the generous support and encouragement of [Airtame](https://airtame.com), during a [hackathon](http://blog.airtame.com/hackairthon-2/#wordsnakeamultiplayerwordgame). Carried on as a weekend project afterwards.

This is a front-end focused project that experiments with multiplayer games made in [Elm](http://elm-lang.org/). The back-end recently migrated from a tiny Express-concoction into a Google Firebase server.

Some of the interesting bits:

* use one of the clients as judge/game state reconciler, calling rounds and deciding on winners without back-end logic.
* stateful(ish) Elm modules, managing their own network requests and other effects through the parent's update function, but without the parent knowing anything about the internals. In other words, we got ourselves some fully encapsulated model-update-view-command-subscription modules inside their parent model-update-view-command-subscription.
* COMING UP: how do we make this into a game engine? Can we refactor the code

## Run locally

Install dependencies as per `./travis.yml`. Run `./dev.sh`.

The app relies on the following Firebase database:

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
