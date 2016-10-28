import domReady from 'domready';
import attachFastClick from 'fastclick';
import firebase from 'firebase';

import './styles/index.css';
import './assets/favicon.ico';

import {
  scheduleNewRound,
  getRoom,
  watchRoom,
  updatePlayer
} from './controllers';

import Elm from './App/Main.elm';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

function getRoomId() {
  return location.pathname.split('/')[2];
}

domReady(() => {
  attachFastClick.attach(document.body);
  const app = firebase.initializeApp(config);
  const db = app.database();
  const elmApp = Elm.Main.embed(document.body, {
    websocketHost: 'apples'
  });
  const shipToElm = (obj) => {
    elmApp.ports.getRoom.send(JSON.stringify(obj));
  };
  elmApp.ports.send.subscribe(msg => {
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
});
