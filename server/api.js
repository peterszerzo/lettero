'use strict';

import type {Room} from './models/room';
import testRoom from './fixtures/test-room';
import {setPlayerStatus} from './models/room';
import {getWinnerId} from './models/player';

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

function applyPlayerStatusUpdate({roomId, playerId, round, guess, isReady}, next) {
  const room = getRoom(roomId, playerId);
  if (room.round !== round) {
    return;
  }
  state = state.map(rm => rm.id === room.id ? setPlayerStatus(playerId, {guess, isReady}, rm) : rm);
  console.log(JSON.stringify(state));
  next();
}

export default {
  getState() {
    return state;
  },
  applyPlayerStatusUpdate,
  getRoom
};
