'use strict';

import type {Room} from './models/room';
import testRoom from './fixtures/test-room';
import {setPlayerStatus, closeRound, startNewRound} from './models/room';
import {getWinnerId, isDraw} from './models/player';

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

function applyPlayerStatusUpdate({roomId, id, guess, isReady}, next) {
  const room = getRoom(roomId, id);
  let newRoom = setPlayerStatus(id, {guess, isReady}, room);
  const winnerId = getWinnerId(newRoom.players);
  if (winnerId || isDraw(newRoom.players)) {
    newRoom = closeRound(winnerId, newRoom);
    setTimeout(() => {
      newRound(roomId, next);
    }, 2500);
  }
  state = state.map(rm => rm.id === newRoom.id ? newRoom : rm);
  next();
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
  getRoom
};
