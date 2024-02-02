import settingsManager from '../lib/settingsManager.mjs'
import getLiveStats from '../lib/getLiveStats.mjs';
export default async function (event, context) {
    console.log("=== Executing Function Handler: retrieveGameResults ===")
    var gameId = "cf3c538f";

    if (event) 
    {
      if (event.gameId)
          gameId = event.gameId
      
      if (event.pid && event.vid) {
          var gameIdResponse = await settingsManager.retrieveGameId(event.vid, event.pid)
          if (gameIdResponse && gameIdResponse !== "") {
            gameId = gameIdResponse;
          }
          console.log(`GameId: ${gameId}`)
        }
    }
    
    return await getLiveStats(gameId);
}