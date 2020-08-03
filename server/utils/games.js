var games = [];

function createGame(socketid, username, roomid) {
    const game = { roomid, users: [{
        socketid,
        username,
        player: 'X'
    }],
    state: {
        board: ['', '', '', '', '', '', '', '', ''],
        player: 'X',
        playing: false
    }};

    games.push(game);

    return game;
}

function joinGame(socketid, username, roomid) {
    return addUser(socketid, username, roomid);
}

function leaveGame(socketid) {
    for (let i = 0; i < games.length; i++) {
        userIndex = games[i].users.findIndex(user => user.socketid == socketid);
        if (userIndex !== -1) {
            let username = games[i].users[userIndex].username;
            let empty = false;
            games[i].users.splice(userIndex, 1);
            if (games[i].users.length === 0) {
                empty = true;
            }
            return {
                username,
                roomid: games[i].roomid,
                users: games[i].users,
                empty
            };
        }
    }
}

function getCurrentGame(roomid) {
    return games.find(game => game.roomid == roomid);
}

function updateCurrentGame(roomid, game) {
    let gameIndex = games.findIndex(game => game.roomid == roomid);
    if (gameIndex !== -1) {
        games[gameIndex] = game;
    }
}

function addUser(socketid, username, roomid) {
    let gameIndex = games.findIndex(game => game.roomid == roomid);
    if (gameIndex !== -1) {
        console.log(games[gameIndex].users.length);
        if (games[gameIndex].users.length > 1 || games[gameIndex].users.length < 1) {
            return null;
        }
        else {
            const user = {
                socketid,
                username,
                player: ''
            };
            if (games[gameIndex].users[0].player == 'X') {
                user.player = 'O';
            }
            else {
                user.player = 'X';
            }
            games[gameIndex].users.push(user);
            return user;
        }
    }
}

module.exports = {
    createGame,
    joinGame,
    leaveGame,
    getCurrentGame,
    updateCurrentGame
};