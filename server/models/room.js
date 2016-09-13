import type {Player} from './player';

import {
  create as createPlayer,
  winRound,
  loseRound,
  setGuess as setPlayerGuess,
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

export function setGuess(guess, playerId, room) {
  return Object.assign(
    {},
    room,
    {
      players: room.players.map(
        player =>
        (
          (player.id === playerId)
            ?
            setPlayerGuess(guess, player)
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
