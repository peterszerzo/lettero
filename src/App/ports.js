import {getDb} from '../utilities/firebase';

import talkToGame from './Game/ports';

export default function talk(ports) {
  const db = getDb();
  ports.roomRequest.subscribe(roomId => {
    db.ref(`/rooms/${roomId}`)
      .once('value')
      .then(s => s.val())
      .then(s => JSON.stringify(s))
      .then(s => {
        ports.roomResponse.send(s);
      });
  });

  ports.createRoomRequest.subscribe(msg => {
    const room = JSON.parse(msg);
    db.ref(`/rooms/${room.id}`).set(room).then(() => {
      ports.createRoomResponse.send('success');
    }).catch(() => {
      ports.createRoomResponse.send('error');
    });
  });

  talkToGame(ports);

  global.onbeforeunload = () => {
    ports.closeTab.send('');
  };
}
