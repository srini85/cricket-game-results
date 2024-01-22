exports.handler = async function (event, context) {
    var gameId = "cf3c538f";
    if (event) 
    {
      if (event.gameId)
          gameId = event.gameId
      
      if (event.pid && event.vid) {
          // retrieve the gameId from db
      }
    }
    const lib = require('./lib/getGameResults.js')
    return await lib.getGameResults(gameId);
}