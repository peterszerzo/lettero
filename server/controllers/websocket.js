import api from '../api';

const wsConnectionsByRoomId = {};

function notifyRoom(roomId) {
  wsConnectionsByRoomId[roomId].forEach((ws) => {
    const room = api.getRoom(roomId);
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
  const next = notifyRoom.bind(this, roomId);
  ws.on('message', (msg) => {
    const room = api.getRoom(roomId);
    if (msg === 'requestRoomState') {
      return ws.send(JSON.stringify(room));
    }
    if (msg === 'requestNewRound') {
      return api.scheduleNewRound(roomId, next);
    }
    const player = JSON.parse(msg);
    api.savePlayer(roomId, player, next);
  });
};
