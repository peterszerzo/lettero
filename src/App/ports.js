import {getDb} from '../utilities/firebase';

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

  global.onbeforeunload = () => {
    ports.closeTab.send('');
  };
}
