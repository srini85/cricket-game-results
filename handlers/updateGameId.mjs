import settingsManager from '../lib/settingsManager.mjs'
export default async function (event, context) {
  console.log("=== Executing Function Handler: updateGameId ===")
  if (event && event.gameId && event.pid && event.vid) {
      var res = await settingsManager.updateGameId(event.vid, event.pid, event.gameId)
      console.log(res);
  }
}