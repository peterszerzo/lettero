'use strict';

import type {Room} from './models/room';
import testRoom from './fixtures/test-room';
import {setPlayerStatus, startNewRound} from './models/room';

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

function applyPlayerStatusUpdate({roomId, id, guess, score, isReady}, next) {
  const room = getRoom(roomId, id);
  let newRoom = setPlayerStatus(id, {guess, isReady, score}, room);
  state = state.map(rm => rm.id === newRoom.id ? newRoom : rm);
  next();
}

function scheduleNewRound(roomId, next) {
  setTimeout(() => {
    newRound(roomId, next);
  }, 2500);
}

function newRound(roomId, next) {
  state = state.map(rm => rm.id === roomId ? startNewRound(rm) : rm);
  next();
}

export default {
  getState() {
    return state;
  },
  applyPlayerStatusUpdate,
  scheduleNewRound,
  getRoom
};
