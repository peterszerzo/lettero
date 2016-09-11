import attachFastClick from 'fastclick';

import Elm from './App/Main.elm';

export default function game() {
  attachFastClick.attach(document.body);
  Elm.Main.fullscreen({
    roomId: window.__initialRoomState.id,
    playerId: window.__playerId,
    host: location.origin.replace(/^http/, 'ws')
  });
}
