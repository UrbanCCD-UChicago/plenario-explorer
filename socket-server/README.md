## Mock Socket Server

```
npm install
node index.js
```

Then a parade of mock observations will be available to subscribe to on localhost:8081.

```
{ feature_of_interest: 'temperature',
  node_id: '00B',
  sensor: 'tempx',
  results: { temperature: 62 },
  datetime: '2016-08-26T08:10:22-05:00' }
{ feature_of_interest: 'gasconcentration',
  node_id: '00A',
  sensor: 'gasx',
  results: { co: null, so2: null, o3: null, h2s: 97, no2: null },
  datetime: '2016-08-26T08:10:25-05:00' }
{ feature_of_interest: 'gasconcentration',
  node_id: '00B',
  sensor: 'gasx',
  results: { co: null, so2: null, o3: null, h2s: 67, no2: null },
  datetime: '2016-08-26T08:10:25-05:00' }
{ feature_of_interest: 'temperature',
  node_id: '00A',
  sensor: 'tempx',
  results: { temperature: 8 },
  datetime: '2016-08-26T08:10:25-05:00' }
```

Here is an example minimum client to subscribe:

```
var socket = require('socket.io-client')('http://localhost:8081');
socket.on('data', function (data) {
        console.log(data);
});
socket.on('internal_error', function (err) {
        console.log(err);
});
```
