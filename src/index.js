import domReady from 'domready';
import attachFastClick from 'fastclick';
import firebase from 'firebase';

import './styles/index.css';
import './index.html';
import './assets/favicon.ico';

// import Elm from './App/Main.elm';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

domReady(() => {
  attachFastClick.attach(document.body);
  const app = firebase.initializeApp(config);
  const db = app.database();
  console.log(db);
});
