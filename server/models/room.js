import type {Player} from './player';

import {
  create as createPlayer,
  winRound,
  loseRound
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

export function endRound(room : Room, winnerPlayerId : String) : Room {
  return Object.assign(
    {},
    room,
    {
      round: room.round + 1,
      word: words[Math.floor(Math.random() * words.length)],
      players: room.players.map(
        player =>
          (
            player.id === winnerPlayerId)
              ?
              winRound(player)
              :
              loseRound(player)
          )
    }
  );
}
