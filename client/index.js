import domReady from 'domready';

import './styles/index.css';
import game from './game';
import homePage from './home-page';

global.domReady = domReady;

global.start = {
  game: game,
  homePage: homePage
};
