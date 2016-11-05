import {getDb} from '../../utilities/firebase';

export default (ports) => {

  const db = getDb();

  ports.createRoomRequest.subscribe(msg => {
    const room = JSON.parse(msg);
    db.ref(`/rooms/${room.id}`).set(room).then(() => {
      ports.createRoomResponse.send('success');
    }).catch(() => {
      ports.createRoomResponse.send('error');
    });
  });
};
