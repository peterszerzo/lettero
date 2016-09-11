'use strict';

import type {Room} from './models/room';
import testRoom from './fixtures/test-room';
import {endRound, startNewRound} from './models/room';

let state : Array<Room> = [testRoom];

function getRoom(roomId : string, playerId : ?string) : ?Room {
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

function applyPlayerStatusUpdate({roomId, playerId, round, guess}, next) {
  const room = getRoom(roomId, playerId);
  if (room.round !== round || guess !== 0) {
    return;
  }
  state = state.map(rm => rm.id === room.id ? endRound(rm, playerId) : rm);
  next();
  setTimeout(() => {
    state = state.map(rm => rm.id === room.id ? startNewRound(rm) : rm);
    next();
  }, 3000);
}

export default {
  getState() {
    return state;
  },
  applyPlayerStatusUpdate,
  getRoom
};
