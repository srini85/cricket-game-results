exports.handler = async function (event, context) {
    var gameId = "cf3c538f";
    var body = JSON.parse(event.body);
    if (body.pid && body.vid) {
        // retrieve the gameId from db
    }
    const lib = require('./lib/getGameResults.js')
    return await lib.getGameResults(gameId);
}