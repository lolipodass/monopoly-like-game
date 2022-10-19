const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const buildPath = path.join(__dirname, '..', 'client/build');


app.use(express.static(buildPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'));
});



io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});



server.listen(3000, () => {
  console.log('localhost:3000');
});