'use strict';

import type {Room} from './models/room';
import testRoom from './fixtures/test-room';
import {endRound} from './models/room';

let state : Array<Room> = [testRoom];

function getRoom(roomId : string, playerId : string) : ?Room {
  const room = state.filter(({id}) => id === roomId)[0];
  if (!room) {
    return null;
  }
  const player = room.players.filter(({id}) => id === playerId)[0];
  if (!player) {
    return null;
  }
  return room;
}

function applyPlayerStatusUpdate({roomId, playerId, round, guess}) {
  const room = getRoom(roomId, playerId);
  if (room.round !== round || guess !== 0) {
    return;
  }
  state = state.map(rm => rm.id === room.id ? endRound(rm, playerId) : rm);
}

function changeWord(roomId) {

}

export default {
  getState() {
    return state;
  },
  applyPlayerStatusUpdate,
  getRoom,
  changeWord
};
