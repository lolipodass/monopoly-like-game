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




let GameStarted = false

const throwDice = () => {
  return Math.floor(Math.random() * 12 + 1);
}

const users = []


io.on('connection', (socket) => {
  socket.on('login', (msg) => {
    if (!GameStarted)
      users.push({ position: 0, money: 1500, companies: {} })
  })
  socket.on('start', () => {
    GameStarted = true;
    socket.emit('gameStarted', { amountPlayers: users.length });
  })





  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});



server.listen(3000, () => {
  console.log('localhost:3000');
});