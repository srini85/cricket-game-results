const lib = require('./index.js');

const start = async function() {
    var res = await lib.retrieveGameResults({vid: "xxx", pid: "yyy"});
    console.log(res)
}

const testUpdateGameId = async function(gameId) {
    var res = await lib.updateGameId({vid: "1a86", pid: "7523", gameId: gameId});
    console.log(res)
}

//start()
testUpdateGameId("545af13f")