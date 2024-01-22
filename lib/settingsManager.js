var ddbClient = require("@aws-sdk/client-dynamodb").DynamoDBClient
var ddbLib = require("@aws-sdk/lib-dynamodb");
const client = new ddbClient({});
const docClient = ddbLib.DynamoDBDocumentClient.from(client);

exports.settingsManager = {
    async retrieveGameId(vid, pid) {
        console.log("requesting id: " + btoa(vid + ":" + pid))
        var cmd = new ddbLib.GetCommand({
            TableName: "SCOREBOARD",
            Key: {
              boardUid: btoa(vid + ":" + pid),
            }
          });
        var result = await docClient.send(cmd);
        if (!result.Item)
          return "";
        return result.Item.gameId;
    },

    async updateGameId(vid, pid, newGameId) {
        var gameId = await this.retrieveGameId(vid, pid);
        console.log("currently set gameId: " + gameId)
        var cmd = null;
        if (gameId && gameId !== "") {
            console.log("calling update command. new Game Id: " + newGameId)
            cmd = new ddbLib.UpdateCommand({
                TableName: "SCOREBOARD",
                Key: {
                    boardUid: btoa(vid + ":" + pid),
                },
                UpdateExpression: "set gameId = :gameId",
                ExpressionAttributeValues: {
                    ":gameId": newGameId,
                },
                ReturnValues: "ALL_NEW",
            })
        } else {
            cmd = new ddbLib.PutCommand({
                TableName: "SCOREBOARD",
                Item: {
                    boardUid: btoa(vid + ":" + pid),
                    gameId: newGameId
                }
            });
        }
        var result = await docClient.send(cmd);
    }
}