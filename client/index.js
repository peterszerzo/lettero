import domReady from 'domready';
import attachFastClick from 'fastclick';

import './styles/index.css';
import './assets/favicon.ico';
import Elm from './App/Main.elm';

domReady(() => {
  attachFastClick.attach(document.body);
  Elm.Main.embed(document.body);
});
