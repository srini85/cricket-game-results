//import lib from './index.mjs'
import getLiveStats from './lib/getLiveStats.mjs';

const start = async function() {
    console.log(lib)
    var res = await lib.retrieveGameResults({vid: "xxx", pid: "yyy"});
    console.log(res)
}

const testUpdateGameId = async function(gameId) {
    var res = await updateGameId({vid: "1a86", pid: "7523", gameId: gameId});
    console.log(res)
}


const testgetLiveStats = async function(data) {
    var res = await getLiveStats(data)
    console.log(res)
}

//start()
//testUpdateGameId("545af13f")
await testgetLiveStats("caab4afb");