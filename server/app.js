const formatMessage = require('./utils/messages');
const { createGame, joinGame, leaveGame, getCurrentGame, updateCurrentGame } = require('./utils/games');

const express = require('express')();
const http = require('http').Server(express);
const socketio = require('socket.io')(http);
const port = 3000 || process.env.PORT;

const botName = 'TicTacBot';

socketio.on('connection', (socket) => {
    socket.on('createRoom', ({ username, roomid }) => {
        const game = createGame(socket.id, username, roomid);

        socket.join(game.roomid)

        socket.emit('message', formatMessage(botName, 'Welcome to the Tic Tac Toe room!'));

        socketio.to(game.roomid).emit('roomUsers', {
            roomid: game.roomid,
            users: game.users
        });

        socketio.to(game.roomid).emit('board', game.state.board);
        socketio.to(game.roomid).emit('player', game.state.player);
        socketio.to(game.roomid).emit('playing', game.state.playing);
        socket.emit('myPlayer', game.users[0].player);
    });

    socket.on('joinRoom', ({ username, roomid }) => {
        const user = joinGame(socket.id, username, roomid);
        if (!user) {
            socket.emit('errorPage');
            return;
        }

        socket.join(roomid);

        socket.emit('message', formatMessage(botName, 'Welcome to the Tic Tac Toe room!'));

        socket.broadcast.to(roomid).emit('message', formatMessage(botName, `${user.username} has joined the room.`));
        
        socket.emit('myPlayer', user.player);

        if (user.player === 'X') {
            socket.emit('player', 'O');
        }
        else {
            socket.emit('player', 'X');
        }
    });

    socket.on('move', ({spot, roomid}) => {
        let game = getCurrentGame(roomid);
        console.log(game);
        
        game.state.board[spot] = game.state.player;
        if (winner(game.state.board)) {
            game.state.playing = false;
            socketio.to(game.roomid).emit('playing', game.state.playing);
            socketio.to(game.roomid).emit('board', game.state.board);
            updateCurrentGame(game.roomid, game);
            return;
        }
        if (game.state.player == 'X') {
            game.state.player = 'O';
        }
        else {
            game.state.player = 'X';
        }
        socketio.to(game.roomid).emit('board', game.state.board);
        socketio.to(game.roomid).emit('player', game.state.player);
        updateCurrentGame(game.roomid, game);
    });

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        socketio.to(user.roomid).emit('message', formatMessage(user.username, msg));
    });

    socket.on('leaveRoom', () => {
        var { username, roomid, users, empty } = leaveGame(socket.id);
        if (empty) {
            socketio.sockets.clients(roomid).forEach(s => {
                s.leave(roomid);
            });
        }
        else {
            socketio.to(roomid).emit('message', formatMessage(botName, `${username} has left the chat`));

            // Send users and room info
            socketio.to(roomid).emit('roomUsers', {
                roomid: roomid,
                users: users
            });
        }
    });

    socket.on('startGame', (roomid) => {
        const game = getCurrentGame(roomid);
        if (game.users.length() > 1) {
            game.state.playing = true;
            updateCurrentGame(roomid, game)
            socketio.to(roomid).emit('playing', game.state.playing);
        }
    });
});

http.listen(port, () => {
    console.log('Listening at: ' + port);
});

function winner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
      return false;
}