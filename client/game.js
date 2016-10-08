import Elm from './Game/Main.elm';

export default function game() {
  Elm.Main.fullscreen({
    roomId: window.__initialRoomState.id,
    playerId: window.__playerId,
    host: location.origin.replace(/^http/, 'ws')
  });
}
