exports.getCurrentBatters = function (payload) {
    var notOutPlayers = []

    const getTotalRunsForPlayer = function(periodStat) {
        return periodStat.statistics.find(stat => {
            return (stat.type.type === "BATTING" && stat.type.value === "TOTAL_RUNS")
        }).count
    }

    payload.data.discoverGame.statistics.home.players.forEach(player => {
        player.periodStatistics.forEach(function(stat) {            
            if (stat.status === "NOT_OUT") {
                notOutPlayers.push({player: player, periodStats: stat})
            }
        })
    });

    payload.data.discoverGame.statistics.away.players.forEach(player => {
        player.periodStatistics.forEach(function(stat) {
            if (stat.status === "NOT_OUT") {
                notOutPlayers.push({player: player, periodStats: stat})
            }
        })
    });
    
    return notOutPlayers.map(function(item) {
        return {
            firstName: item.player.player.profile.firstName,
            lastName: item.player.player.profile.lastName,
            runs: getTotalRunsForPlayer(item.periodStats)
        }
    });
}