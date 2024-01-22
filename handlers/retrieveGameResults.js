exports.handler = async function (event, context) {
    var gameId = "cf3c538f";
    var settingsManager = require('../lib/settingsManager.js').settingsManager;
    if (event) 
    {
      if (event.gameId)
          gameId = event.gameId
      
      if (event.pid && event.vid) {
          var gameIdResponse = await settingsManager.retrieveGameId(event.vid, event.pid)
          if (gameIdResponse && gameIdResponse !== "") {
            gameId = gameIdResponse;
          }
        }
    }
    const lib = require('../lib/getGameResults.js')
    return await lib.getGameResults(gameId);
}