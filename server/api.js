'use strict';

import type {Room} from './models/room';
import testRoom from './fixtures/test-room';
import {setGuess} from './models/room';

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
  if (room.round !== round) {
    return;
  }
  state = state.map(rm => rm.id === room.id ? setGuess(guess, playerId, rm) : rm);
  next();
}

export default {
  getState() {
    return state;
  },
  applyPlayerStatusUpdate,
  getRoom
};
