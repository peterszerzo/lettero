import api from '../api';

const wsConnectionsByRoomId = {};

function notifyRoom(roomId) {
  wsConnectionsByRoomId[roomId].forEach((ws) => {
    const room = api.getState().filter(({id}) => id === roomId)[0];
    try {
      ws.send(JSON.stringify(room));
    } catch(err) {
      // Assume connection has been closed. Remove from storage.
      wsConnectionsByRoomId[roomId] = wsConnectionsByRoomId[roomId].filter(_ws => _ws !== ws);
    }
  });
}

export default (ws, req) => {
  const {roomId} = req.params;
  if (wsConnectionsByRoomId[roomId]) {
    wsConnectionsByRoomId[roomId].push(ws);
  } else {
    wsConnectionsByRoomId[roomId] = [ws];
  }
  ws.on('message', (msg) => {
    const room = api.getState().filter(({id}) => id === roomId)[0];
    if (msg === 'requestRoomState') {
      return ws.send(JSON.stringify(room));
    }
    const playerStatusUpdate = JSON.parse(msg);
    api.applyPlayerStatusUpdate(playerStatusUpdate, notifyRoom.bind(this, roomId));
  });
};
