const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('libs'));
app.use(express.static('models'));
app.use(express.static('js'));

server.listen(3000, function () {
  console.log('Server listening on port 3000');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
