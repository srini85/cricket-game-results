export default async function(gameId) {
    let data = JSON.stringify({
        query: `query gameView($gameId: ID!){discoverGame(gameID: $gameId){id  alias result{winner {name value __typename}outcome{name value __typename}home{score}away{score}}}}`,
        variables: {"gameId": gameId,"gameStatisticsFilter":{"classification":"TOTAL"}}
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        headers: { 
        'content-type': 'application/json', 
        'origin': 'https://www.playhq.com', 
        'tenant': 'cricket-australia', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 
        'Accept-Encoding': 'identity;q=1,chunked;q=0.1,*;q=0'
        },
        body : data
    };

    try {
        var result = await fetch('https://api.playhq.com/graphql', config);
        var winner = ((await result.json()).data.discoverGame.result.winner)
        return winner;
    } catch (e){
        console.log(e)
        return "Error making call to retrieve live score"
    }
}