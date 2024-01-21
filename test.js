const start = async function() {
    const lib = require('./lib/getGameResults.js');
    var res = await lib.getGameResults("cf3c538f");
    console.log(res)
}

start()