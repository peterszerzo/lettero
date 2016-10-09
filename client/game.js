import Elm from './Game/Game.elm';

export default function game() {
  Elm.Game.fullscreen({
    roomId: window.__initialRoomState.id,
    playerId: window.__playerId,
    host: location.origin.replace(/^http/, 'ws')
  });
}
