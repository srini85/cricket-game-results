exports.handler = async function (event, context) {
    const lib = require('./lib/getGameResults.js')
    return await lib.getGameResults("cf3c538f");
}