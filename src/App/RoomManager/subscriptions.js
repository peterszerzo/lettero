import {getDb} from '../../utilities/firebase';

export default (ports) => {

  const db = getDb();
  console.log(db);

  ports.createRoomRequest.subscribe(msg => {
    console.log(JSON.parse(msg));
  });
};
