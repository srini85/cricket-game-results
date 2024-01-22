const handlers = {
    retrieveGameResults: require('./handlers/retrieveGameResults.js').handler,
    updateGameId: require('./handlers/updateGameId.js').handler
}

exports.handler = handlers.retrieveGameResults