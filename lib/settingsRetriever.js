var ddbClient = require("@aws-sdk/client-dynamodb").DynamoDBClient
var ddbLib = require("@aws-sdk/lib-dynamodb");
const client = new ddbClient({});
const docClient = ddbLib.DynamoDBDocumentClient.from(client);

exports.settingsRetriever = {
    async retrieveGameId(vid, pid) {
        console.log("requesting id: " + btoa(vid + ":" + pid))
        var cmd = new ddbLib.GetCommand({
            TableName: "SCOREBOARD",
            Key: {
              boardUid: btoa(vid + ":" + pid),
            }
          });
        var result = await docClient.send(cmd);
        console.log("returning gameId: " + result.Item.gameId)
        return result.Item.gameId;
    },

    async updateGameId(vid, pid, gameId) {

    }
}