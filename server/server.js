import express from 'express';
import bodyParser from 'body-parser';

import api from './api';

const app = express();

const wsConnectionsByRoomId = {};

require('express-ws')(app);

app.set('views', './server/views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.ws('/ws/:roomId', (ws, req) => {
  const {roomId} = req.params;
  if (wsConnectionsByRoomId[roomId]) {
    wsConnectionsByRoomId[roomId].push(ws);
  } else {
    wsConnectionsByRoomId[roomId] = [ws];
  }
  ws.on('message', (msg) => {
    if (msg === 'requestRoomState') {
      return ws.send(JSON.stringify(api.getState().filter(({id}) => id === roomId)[0]));
    }
    const playerStatusUpdate = JSON.parse(msg);
    api.applyPlayerStatusUpdate(playerStatusUpdate);
    wsConnectionsByRoomId[roomId].forEach((ws) => {
      try {
        console.log('Sending to open connection');
        ws.send(JSON.stringify(api.getState().filter(({id}) => id === roomId)[0]));
      } catch(err) {
        console.log('Tried to send to closed connection.');
      }
    });
  });
});

app.get('/:roomId/:playerId', (req, res) => {
  const {roomId, playerId} = req.params;
  const room = api.getRoom(roomId, playerId);
  if (!room) {
    return res.redirect(301, '/not-found');
  }
  res.render('game', {
    room,
    playerId
  });
});

app.get('/not-found', (req, res) => {
  res.render('404');
});

app.get('*', (req, res) => {
  res.redirect(301, '/not-found');
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Error starting the server.');
    return;
  }
  console.log(`Listening at port ${process.env.PORT}.`);
});
