/* eslint max-len : "off" */
import {
  scheduleNewRound,
  getRoom,
  watchRoom,
  updatePlayer
} from './controllers';
import {getDb} from '../../utilities/firebase';

export default (ports) => {

  const db = getDb();

  const shipToElm = (obj) => {
    ports.roomStateUpdate.send(JSON.stringify(obj));
  };

  global.onbeforeunload = function() {
    ports.leaveRoom.send('');
    return 'Come and go as you wish - we\'re all friends here :). When you\'re ready to hop back, just mark yourself as ready again.';
  };

  const subscribedRoomIds = [];

  ports.sendGameCommand.subscribe((msgString) => {
    const {type, roomId, payload} = JSON.parse(msgString);
    if (subscribedRoomIds.indexOf(roomId) === -1) {
      watchRoom(db, roomId, shipToElm);
      subscribedRoomIds.push(roomId);
    }
    if (type === 'requestRoomState') {
      return getRoom(db, roomId).then(shipToElm);
    }
    if (type === 'requestNewRound') {
      return scheduleNewRound(db, roomId).then(shipToElm);
    }
    if (type === 'player') {
      updatePlayer(db, roomId, payload);
    }
  });
};
