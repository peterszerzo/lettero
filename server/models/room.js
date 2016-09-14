import type {Player} from './player';

import {
  create as createPlayer,
  winRound,
  loseRound,
  eraseGuess
} from './player';
import words from '../fixtures/words';

export type Room = {
  id : string,
  round : number,
  word : string,
  players : Array<Player>
};

export function create(id, playerIds) : Room {
  return {
    id,
    round: 0,
    word: words[Math.floor(Math.random() * words.length)],
    players: playerIds.map(createPlayer)
  };
}

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

export function closeRound(winnerId, room : Room) : Room {
  return Object.assign(
    {},
    room,
    {
      players: room.players.map(
        player =>
        (
          (player.id === winnerId) ? winRound(player) : loseRound(player))
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
