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
    ports.getRoom.send(JSON.stringify(obj));
  };
  ports.send.subscribe((msgString) => {
    const {type, roomId, payload} = JSON.parse(msgString);
    watchRoom(db, roomId, shipToElm);
    if (type === 'requestRoomState') {
      return getRoom(db, roomId).then(shipToElm);
    }
    if (type === 'requestNewRound') {
      return scheduleNewRound(db, roomId).then(shipToElm);
    }
    if (type === 'player') {
      updatePlayer(db, roomId, payload).then(shipToElm);
    }
  });
};
