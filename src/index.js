import domReady from 'domready';
import attachFastClick from 'fastclick';

import './index.css';

import Elm from './App/Main.elm';
import talkToGame from './App/Game/subscriptions.js';
import talkToRoomCreator from './App/RoomCreator/subscriptions.js';
import {start as startFirebase} from './utilities/firebase';
import talk from './App/ports.js';

domReady(() => {
  startFirebase();
  attachFastClick.attach(document.body);
  const elmApp = Elm.Main.embed(document.body);
  talkToGame(elmApp.ports);
  talk(elmApp.ports);
  talkToRoomCreator(elmApp.ports);
});
