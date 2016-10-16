'use strict';

import testRoom from './fixtures/test-room';
import words from './fixtures/words';

let state = [testRoom];

function getRoom(roomId) {
  return state.filter(({id}) => id === roomId)[0];
}

function savePlayer(roomId, player, next) {
  const room = getRoom(roomId, player.id);
  room.players = room.players.map(
    p => ((p.id === player.id) ? player : p)
  );
  next();
}

function scheduleNewRound(roomId, next) {
  setTimeout(() => {
    const room = getRoom(roomId);
    room.round = room.round + 1;
    room.roundData = {
      word: words[Math.floor(Math.random() * words.length)]
    };
    room.players = room.players.map(player => Object.assign({}, player, {
      guess: {
        value: 'pending',
        time: 0
      }
    }));
    next();
  }, 2500);
}

export default {
  savePlayer,
  getRoom,
  scheduleNewRound
};
