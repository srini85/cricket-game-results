const start = async function() {
    const lib = require('./index.js');
    console.log(lib)
    var res = await lib.handler({vid: "xxx", pid: "yyy"});
}

const testUpdateGameId = async function(gameId) {
    const lib = require('./handlers/updateGameId.js');
    var res = await lib.handler({vid: "xxx", pid: "yyy", gameId: gameId});
    console.log(res)
}

//start()
testUpdateGameId("545af13f")