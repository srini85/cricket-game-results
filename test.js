const lib = require('./index.js');
const getLiveStatsLib = require('./lib/getLiveStats.js')

const start = async function() {
    var res = await lib.retrieveGameResults({vid: "xxx", pid: "yyy"});
    console.log(res)
}

const testUpdateGameId = async function(gameId) {
    var res = await lib.updateGameId({vid: "1a86", pid: "7523", gameId: gameId});
    console.log(res)
}


const testgetLiveStats = function(data) {
    var data = require('./data/live_game_1_period_1.json')
    var res = getLiveStatsLib.getLiveStats(data)
    console.log(res)
}

//start()
//testUpdateGameId("545af13f")
testgetLiveStats()