var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const moment = require('moment');

app.get('/', function(req, res){
  res.send('hello');
});


function generateTempObservation(nodeId) {
  return {
    "feature_of_interest":"temperature",
    "node_id":nodeId,
    "sensor":"tempx",
    "results":{
      "temperature": Math.floor(Math.random() * 100)
    },
    "datetime":moment().format()
  };
}

function generateGasObservation(nodeId) {
  return {
    "feature_of_interest":"gasConcentration",
    "node_id":nodeId,
    "sensor":"gasx",
    "results":{
      "co":null,
      "so2":null,
      "o3":null,
      "h2s":Math.floor(Math.random() * 100),
      "no2":null
    },
    "datetime":moment().format()
  };
}

io.on('connection', function(socket){
  console.log('a user connected');

  // Emit some data every 3 seconds
  setInterval(function () {
    socket.emit("data", generateGasObservation('00A'));
    socket.emit("data", generateGasObservation('00B'));
    socket.emit("data", generateTempObservation('00A'));
    socket.emit("data", generateTempObservation('00B'));
  }, 3000);
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});
