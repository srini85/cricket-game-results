exports.handler = async function (event, context) {
  console.log("=== Executing Function Handler: updateGameId ===")
  if (event && event.gameId && event.pid && event.vid) {
      var settingsManager = require('../lib/settingsManager.js').settingsManager;
      var res = await settingsManager.updateGameId(event.vid, event.pid, event.gameId)
      console.log(res);
  }
}