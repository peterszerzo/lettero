import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import api from './api';
import webSocketController from './websocket';

const {PORT} = process.env;

require('express-ws')(app);

app.set('views', './server/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/../public', {
  redirect : false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.ws('/ws/:roomId', webSocketController);

app.get('/:roomId', (req, res) => {
  const {roomId} = req.params;
  const room = api.getRoom(roomId);
  if (!room) {
    return res.redirect(301, '/not-found');
  }
  res.render('room', {
    room
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

app.post('/rooms/create', (req, res) => {
  res.send('successfully created');
});

app.get('*', (req, res) => {
  res.redirect(404, '/not-found');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting the server.');
    return;
  }
  console.log(`Listening at port ${PORT}.`);
});
