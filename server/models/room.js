import type {Player} from './player';

import {
  eraseGuess
} from './player';
import words from '../fixtures/words';

export type Room = {
  id : string,
  round : number,
  roundData : Object,
  hostId : string,
  players : Array<Player>
};

export function setPlayerStatus(playerId, statusChange, room) {
  return Object.assign(
    {},
    room,
    {
      players: room.players.map(
        player =>
        (
          (player.id === playerId)
            ?
            Object.assign({}, player, statusChange)
            :
            player
        )
      )
    }
  );
}

export function startNewRound(room : Room) : Room {
  return Object.assign(
    {},
    room,
    {
      round: room.round + 1,
      word: words[Math.floor(Math.random() * words.length)],
      players: room.players.map(eraseGuess)
    }
  );
}
