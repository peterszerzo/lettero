import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import api from './api';
import webSocketController from './controllers/websocket';

const {PORT} = process.env;

require('express-ws')(app);

app.set('views', './server/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/:roomId', (req, res) => {
  const {roomId} = req.params;
  const room = api.getRoom(roomId);
  res.render('room', {
    room
  });
});

app.get('/:roomId/:playerId', (req, res) => {
  const {roomId, playerId} = req.params;
  const room = api.getRoom(roomId, playerId);
  res.render('game', {
    room,
    playerId
  });
});

app.get('*', (req, res) => {
  res.render(404, '404');
});

app.ws('/ws/:roomId', webSocketController);

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting the server.');
    return;
  }
  console.log(`Listening at port ${PORT}.`);
});
