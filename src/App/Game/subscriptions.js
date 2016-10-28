import {
  scheduleNewRound,
  getRoom,
  watchRoom,
  updatePlayer
} from './controllers';
import {getDb} from '../../utilities/firebase';

function getRoomId() {
  return location.pathname.split('/')[2];
}

export default (ports) => {

  const db = getDb();

  const shipToElm = (obj) => {
    ports.getRoom.send(JSON.stringify(obj));
  };
  ports.send.subscribe(msg => {
    const roomId = getRoomId();
    watchRoom(db, roomId, shipToElm);
    if (msg === 'requestRoomState') {
      return getRoom(db, roomId).then(shipToElm);
    }
    if (msg === 'requestNewRound') {
      return scheduleNewRound(db, roomId).then(shipToElm);
    }
    const player = JSON.parse(msg);
    updatePlayer(db, roomId, player).then(shipToElm);
  });
};
