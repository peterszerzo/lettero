'use strict';

import testRoom from './fixtures/test-room';
import words from './fixtures/words';

let state = [testRoom];

function getRoom(roomId, playerId) {
  const room = state.filter(({id}) => id === roomId)[0];
  if (!playerId) {
    return room;
  }
  const player = room.players.filter(({id}) => id === playerId)[0];
  if (!player) {
    return null;
  }
  return room;
}

function savePlayer(roomId, player, next) {
  const room = getRoom(roomId, player.id);
  const newRoom = Object.assign(
    {},
    room,
    {
      players: room.players.map(
        p => ((p.id === player.id) ? player : p)
      )
    }
  );
  state = state.map(rm => rm.id === newRoom.id ? newRoom : rm);
  next();
}

function scheduleNewRound(roomId, next) {
  setTimeout(() => {
    state = state.map(rm => rm.id === roomId ? Object.assign(
      {},
      rm,
      {
        round: rm.round + 1,
        roundData: {
          word: words[Math.floor(Math.random() * words.length)]
        },
        players: rm.players.map(player => Object.assign({}, player, {
          guess: {
            value: 'pending',
            time: 0
          }
        }))
      }
    ) : rm);
    next();
  }, 2500);
}

export default {
  getState() {
    return state;
  },
  savePlayer,
  scheduleNewRound,
  getRoom
};
