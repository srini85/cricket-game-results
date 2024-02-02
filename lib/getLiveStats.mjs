import liveGamePayload from "./liveGamePayload.mjs"
//import sampleStats from '../data/live_game_1_period_1.json'

export default async function getLiveStats (gameId) {
    const getInningsDetails = function(payload) {
        var currentInnings = payload.data.game.result.currentPeriod.value
        var inningsOf = payload.data.game.result.currentPeriod.primarySide

        return { 
            currentInnings: currentInnings,
            inningsOf: inningsOf,
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
            var periodStat = player.periodStatistics.find(stat => stat.side === inningsDetails.inningsOf)
            if (periodStat && periodStat.status === "NOT_OUT") {
                notOutPlayers.push({playerName: player.name, statistics: periodStat.statistics})
            }
        });
        var response = notOutPlayers.map(function(item) {
            return {
                name: item.playerName,
                runs: getTotalRunsForPlayer(item.statistics),
                ballsFaced: getBallsFacedForPlayer(item.statistics)
            }
        });
        
        return response
    }
      
    var myHeaders = new Headers();
    myHeaders.append("authority", "spectator.playhq.com");
    myHeaders.append("cache-control", "no-cache");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("origin", "https://www.playhq.com");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    myHeaders.append("x-phq-tenant", "ca");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(liveGamePayload()),
        redirect: 'follow'
      };

    var result = await (await fetch("https://spectator.playhq.com/graphql", requestOptions)).json();

    const getTeamBattingStats = function(result) {
        return {
            overs: "10",
            total: 100,
            target: 130
        }
    }

    return {
        notOutPlayers: getNotOutPlayers(result),
        battingStats: getTeamBattingStats(result),
        bowlingStats: []
    }
}