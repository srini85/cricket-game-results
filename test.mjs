//import lib from './index.mjs'
import getLiveStats from './lib/getLiveStats.mjs';
import finished_game_4 from './data/finished_game_4.js'
const start = async function() {
    console.log(lib)
    var res = await lib.retrieveGameResults({vid: "xxx", pid: "yyy"});
    console.log(res)
}

const testUpdateGameId = async function(gameId) {
    var res = await updateGameId({vid: "1a86", pid: "7523", gameId: gameId});
    console.log(res)
}


const testGetLiveStats = async function(data, optionalPayload) {
    var res = await getLiveStats(data, optionalPayload)
    console.log(res)
}

//start()
//testUpdateGameId("545af13f")
await testGetLiveStats("22924ea0", finished_game_4);