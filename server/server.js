import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import webSocketController from './controllers/websocket';

const {PORT} = process.env;

require('express-ws')(app);

app.set('views', './server/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

app.ws('/ws/:roomId', webSocketController);

app.get('*', (req, res) => {
  res.render('index');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting the server.');
    return;
  }
  console.log(`Listening at port ${PORT}.`);
});
