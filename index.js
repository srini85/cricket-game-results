exports.handler = async function (event, context) {
    var gameId = "cf3c538f";
    var settingsRetriever = require('./lib/settingsRetriever.js').settingsRetriever;
    if (event) 
    {
      if (event.gameId)
          gameId = event.gameId
      
      if (event.pid && event.vid) {
          gameId = await settingsRetriever.retrieveGameId(event.vid, event.pid)
      }
    }
    const lib = require('./lib/getGameResults.js')
    return await lib.getGameResults(gameId);
}