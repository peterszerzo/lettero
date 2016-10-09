import domReady from 'domready';
import attachFastClick from 'fastclick';

import './styles/index.css';
import game from './game';
import home from './home';

domReady(() => {
  attachFastClick.attach(document.body);
});

global.domReady = domReady;

global.start = {
  game,
  home
};
