/* eslint-disable no-console */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

app.get('/', (req, res) => {
  res.send('hello');
});


function generateTempObservation(nodeId) {
  return {
    feature_of_interest: 'temperature',
    node_id: nodeId,
    sensor: 'tempx',
    results: {
      temperature: 19 + Math.floor(Math.random() * 10),
    },
    datetime: moment().format(),
  };
}

function generateGasObservation(nodeId) {
  return {
    feature_of_interest: 'gas_concentration',
    node_id: nodeId,
    sensor: 'gasx',
    results: {
      co: null,
      so2: null,
      o3: null,
      h2s: Math.random() * (3 / 4),
      no2: null,
    },
    datetime: moment().format(),
  };
}

io.on('connection', (socket) => {
  console.log('a user connected');

  // Emit some data every 30 seconds
  setInterval(() => {
    socket.emit('data', generateGasObservation('00A'));
    socket.emit('data', generateGasObservation('00B'));
    socket.emit('data', generateTempObservation('00A'));
    socket.emit('data', generateTempObservation('00B'));
  }, 30000);
});

http.listen(8081, () => {
  console.log('listening on *:8081');
});
