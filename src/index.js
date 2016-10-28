import domReady from 'domready';
import attachFastClick from 'fastclick';

import './styles/index.css';
import './assets/favicon.ico';

import Elm from './App/Main.elm';
import talkToGame from './App/Game/subscriptions.js';
import {start as startFirebase} from './utilities/firebase';

domReady(() => {
  startFirebase();
  attachFastClick.attach(document.body);
  const elmApp = Elm.Main.embed(document.body);
  talkToGame(elmApp.ports);
});
