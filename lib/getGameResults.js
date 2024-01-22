exports.getGameResults = async function (gameId) {
    const axios = require('axios');
    
    let data = JSON.stringify({
        query: `query gameView($gameId: ID!){discoverGame(gameID: $gameId){id  alias result{winner {name value __typename}outcome{name value __typename}home{score}away{score}}}}`,
        variables: {"gameId": gameId,"gameStatisticsFilter":{"classification":"TOTAL"}}
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.playhq.com/graphql',
        headers: { 
        'content-type': 'application/json', 
        'origin': 'https://www.playhq.com', 
        'tenant': 'cricket-australia', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 
        'Accept-Encoding': 'identity;q=1,chunked;q=0.1,*;q=0'
        },
        data : data
    };

    try {
        axios.defaults.timeout = 3000;
        var result = await axios.request(config);
    } catch {
        return "Error making call to retrieve live score"
    }
    
    return result.data;
}