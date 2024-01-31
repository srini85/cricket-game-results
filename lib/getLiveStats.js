exports.getLiveStats = function (payload) {
    const getInningsDetails = function(payload) {
        var currentInnings = payload.data.game.result.currentPeriod.value
        var inningsOf = payload.data.game.result.currentPeriod.primarySide
        return { 
            currentInnings: currentInnings,
            battingTeamPlayers: payload.data.game.statistics[inningsOf === "HOME" ? "home" : "away"].players,
            bowlingTeamPlayers: payload.data.game.statistics[inningsOf !== "HOME" ? "home" : "away"].players
        }
    }
    const getTotalRunsForPlayer = function(statistics) {
        return statistics.find(stat => {
            return (stat.type.value === "CURRENT_RUNS")
        }).count
    }

    const getBallsFacedForPlayer = function(statistics) {
        return statistics.find(stat => {
            return (stat.type.value === "BALLS_FACED")
        }).count
    }

    const getNotOutPlayers = function(payload) {
        var notOutPlayers = []
        var inningsDetails = getInningsDetails(payload);
        inningsDetails.battingTeamPlayers.forEach(player => {
            var periodStat = player.periodStatistics.find(stat => stat.period.value === inningsDetails.currentInnings)
            if (periodStat.status === "NOT_OUT") {
                notOutPlayers.push({playerName: player.name, statistics: periodStat.statistics})
            }
        });
        return notOutPlayers.map(function(item) {
            return {
                name: item.playerName,
                runs: getTotalRunsForPlayer(item.statistics),
                ballsFaced: getBallsFacedForPlayer(item.statistics)
            }
        });
    }

    const getTeamBattingStats = function(payload) {
        return {
            overs: "10",
            total: 100,
            target: 130
        }
    }

    return {
        notOutPlayers: getNotOutPlayers(payload),
        battingStats: getTeamBattingStats(payload)
    }
}