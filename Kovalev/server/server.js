const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const buildPath = path.join(__dirname, '..', 'client/build');

app.use(express.static(buildPath));
app.use('/icons', express.static(path.join(__dirname, '..', 'client/src/resources/icons')))




app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'));
});


let GameStarted = false;
const players = new Map();
const playersSockets = [];
let nextSocket;
let turn = 0;
let readyVote = 0;
let readyToEndMove = true;
let auctionStarted = false;
let previousBet = 0;

let auctionTimeout;

const throwDice = (range) => {
  return Math.floor(Math.random() * range + 1);
}

const changePosition = (value, position) => {
  position += value;
  if (position >= 40)
    position -= 40;
  return position;
}
const changeMoney = (playerId, moneys) => {
  let { money, ...rest } = players.get(playerId);
  money += moneys
  players.set(turn, { money, ...rest });
}


io.on('connection', (socket) => {

  let playerId = -1;
  let ready = undefined;
  if (players.size > 0) {
    socket.emit('sync', Array.from(players));
  }

  const checkPlayerPosition = () => {
    const player = players.get(turn);
    const type = cells[player.position].type;
    if (type === 'company') {
      standOnCompany(player, cells[player.position].companyInfo)
    }
  }

  const standOnCompany = (player, company) => {
    readyToEndMove = false;
    const position = player.position;
    const cell = field[position];
    if (cell[0] === -1) {
      const price = companiesInfo[company][1];
      if (player.money < price) {
        socket.emit('aboard', 'not enough money, start auction');
        auctionStart(position);
      }

      nextSocket.emit('BuyingRequest', position, price);
      nextSocket.once('RequestResult', (result) => {
        if (result) {
          io.emit('BoughtCompany', position, turn);
          changeMoney(turn, -price);
          io.emit('MoneyChanged', turn, player.money);
          field[position][0] = turn;
        }
        else {
          auctionStart(position);
        }
      })
      readyToEndMove = true;
    }
    else {
      const companyID = cells[position].companyInfo;
      const company = companiesInfo[companyID];
      const price = company[cell[1] + 2]
      nextSocket.emit('event', `Stand on rival company, need to pay tax: ${price}`);
      changeMoney(turn, -price);
      io.emit('MoneyChanged', turn, player.money);
      readyToEndMove = true;
    }
  }

  const dice = () => {
    // const dice1 = throwDice(2);
    // const dice2 = throwDice(3);
    const dice1 = 1
    const dice2 = 0
    io.emit('dice', turn, dice1 + dice2);
    let { position, ...rest } = players.get(turn);
    position = changePosition(dice1 + dice2, position);
    players.set(turn, { position, ...rest });
  }


  socket.on('login', ({ name }) => {
    if (GameStarted) {
      io.emit("aboard", 'game already started');
      return;
    }

    playerId = players.size;
    players.set(playerId, { name, position: 0, money: 1500 });
    socket.emit('ID', playerId);
    console.log(playerId);
    io.emit("PlayerLogin", players.get(playerId));
    ready = false;
    playersSockets.push(socket);

    console.log("player connect" + playerId);
  })

  socket.on('readyToStart', () => {
    if (ready === undefined)
      return;
    if (ready === false) {
      readyVote++;
      ready = true;
    }
    if (players.size > 1 && readyVote === players.size) {
      io.emit('gameStarted', { amountPlayers: players.size });
      GameStarted = true;
      turn = throwDice(players.size - 1);
      io.emit("turnStart", turn);
      dice();
      nextSocket = playersSockets[turn];
      checkPlayerPosition();
    }
  })


  socket.on('turnEnd', () => {
    if (turn !== playerId || !GameStarted || !readyToEndMove)
      return;
    io.emit("turnEnd", playerId);

    nextTurn();
    io.emit("turnStart", turn);
    dice();
    checkPlayerPosition();
  })


  const auctionStart = (position) => {
    io.emit('auctionCompany', position);
    auctionStarted = true;
  }

  const nextTurn = () => {
    turn++;
    if (turn > players.size - 1)
      turn = 0;
    nextSocket = playersSockets[turn];
  }


  socket.on('bet', (bet) => {
    if (!auctionStarted && playerId === -1)
      return;
    if (players.get(playerId).money > bet) {
      socket.emit('aboard', 'not enough money');
      return;
    }
    if (previousBet < bet) {
      socket.emit('aboard', 'bet smaller that previous');
      return
    }

    previousBet = bet;

    if (auctionTimeout !== undefined) {
      clearTimeout(auctionTimeout);
      io.emit('newBet', bet.playerId)
      auctionTimeout.refresh();
    }

    auctionTimeout = setTimeout(() => {
      io.emit('auctionEnds');
      auctionStarted = false;
      io.emit('BoughtCompany', position, playerId);
      player.money -= price;
      io.emit('MoneyChanged', playerId, player.money);
    }, 5000);
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('playerDisconnect', playerId);
    players.delete(playerId);
    console.log("player disconnect " + playerId);
  })
});

//[PlayerWhoBuy,level]
const field = new Array(40).fill([-1, 0]);


const companiesInfo = [
  //[0]group,[1]price,[2-7]...rent(levels)
  [0, 60, 2, 10, 30, 90, 160, 250],
  [0, 60, 4, 20, 60, 180, 320, 450],
  [1, 100, 6, 30, 90, 270, 400, 550],
  [1, 100, 6, 30, 90, 270, 400, 550],
  [1, 120, 8, 40, 100, 300, 450, 600],
  [2, 140, 10, 50, 150, 450, 625, 750],
  [2, 140, 10, 50, 150, 450, 625, 750],
  [2, 160, 12, 60, 180, 500, 700, 900],
  [3, 180, 14, 70, 200, 550, 750, 950],
  [3, 180, 14, 70, 200, 550, 750, 950],
  [3, 200, 16, 80, 220, 600, 800, 1000],
  [4, 220, 18, 90, 250, 700, 875, 1050],
  [4, 220, 18, 90, 250, 700, 875, 1050],
  [4, 240, 20, 100, 300, 750, 925, 1100],
  [5, 260, 22, 110, 330, 800, 975, 1150],
  [5, 260, 22, 110, 330, 800, 975, 1150],
  [5, 280, 24, 120, 360, 850, 1025, 1200],
  [6, 300, 26, 130, 390, 900, 1100, 1275],
  [6, 300, 26, 130, 390, 900, 1100, 1275],
  [6, 320, 28, 150, 450, 1000, 1200, 140],
  [7, 350, 35, 175, 500, 1100, 1300, 1500],
  [7, 400, 50, 200, 600, 1400, 1700, 2000],
]

const cells = [
  { type: 'start', },
  { type: 'company', companyInfo: 0 },
  { type: 'question', },
  { type: 'company', companyInfo: 1 },
  { type: 'money', },
  { type: 'train', },
  { type: 'company', companyInfo: 2 },
  { type: 'question', },
  { type: 'company', companyInfo: 3 },
  { type: 'company', companyInfo: 4 },
  { type: 'jail', },

  { type: 'company', companyInfo: 5 },
  { type: 'airlines', },
  { type: 'company', companyInfo: 6 },
  { type: 'company', companyInfo: 7 },
  { type: 'train', },
  { type: 'company', companyInfo: 8 },
  { type: 'question', },
  { type: 'company', companyInfo: 9 },
  { type: 'company', companyInfo: 10 },
  { type: 'casino', },

  { type: 'company', companyInfo: 11 },
  { type: 'question', },
  { type: 'company', companyInfo: 12 },
  { type: 'company', companyInfo: 13 },
  { type: 'train', },
  { type: 'company', companyInfo: 14 },
  { type: 'company', companyInfo: 15 },
  { type: 'airlines', },
  { type: 'company', companyInfo: 16 },
  { type: 'jail', },

  { type: 'company', companyInfo: 17 },
  { type: 'company', companyInfo: 18 },
  { type: 'question', },
  { type: 'company', companyInfo: 19 },
  { type: 'train', },
  { type: 'money', },
  { type: 'company', companyInfo: 20 },
  { type: 'question', },
  { type: 'company', companyInfo: 21 },
]

server.listen(3000, () => {
});
