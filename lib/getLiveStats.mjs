import liveGamePayload from "./liveGamePayload.mjs"

export default async function getLiveStats (gameId, optionalPayload) {
    const getInningsDetails = function(payload) {
        var currentInnings = payload.data.game.result.currentPeriod.value
        var inningsOf = payload.data.game.result.currentPeriod.primarySide

        return { 
            currentInnings: currentInnings,
            inningsOf: inningsOf,
            currentTeamBattingStats: payload.data.game.result[inningsOf === "HOME" ? "home" : "away"].periods?.find(x=>x.role == "BATTING")?.statistics,
            previousTeamBattingStats: payload.data.game.result[inningsOf === "HOME" ? "away" : "home"].periods?.find(x=>x.role == "BATTING")?.statistics,
            battingTeamPlayers: payload.data.game.statistics[inningsOf === "HOME" ? "home" : "away"].players,
            bowlingTeamPlayers: payload.data.game.statistics[inningsOf !== "HOME" ? "home" : "away"].players
        }
    }
    const getTotalRunsForPlayer = function(statistics) {
        return statistics.find(stat => {
            return (stat.type.value === "TOTAL_RUNS")
        })?.count ?? 0
    }

    const getBallsFacedForPlayer = function(statistics) {
        return statistics.find(stat => {
            return (stat.type.value === "BALLS_FACED")
        })?.count ?? 0
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

    const getTeamBattingStats = function(payload) {
        var inningsDetails = getInningsDetails(payload);
        var target = 0;
        if (inningsDetails.previousTeamBattingStats?.find(x=>x.type?.value == "TOTAL_SCORE")?.count)
            target = inningsDetails.previousTeamBattingStats.find(x=>x.type?.value == "TOTAL_SCORE")?.count + 1
        return {
            overs: inningsDetails.currentTeamBattingStats.find(x=>x.type?.value == "TOTAL_OVERS")?.count,
            total: inningsDetails.currentTeamBattingStats.find(x=>x.type?.value == "TOTAL_SCORE")?.count,
            wickets: inningsDetails.currentTeamBattingStats.find(x=>x.type?.value == "TOTAL_OUTS")?.count ?? 0,
            target: target
        }
    }
    
    var result;
    if (!optionalPayload) {
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
            body: JSON.stringify(liveGamePayload(gameId)),
            redirect: 'follow'
        };

        result = await (await fetch("https://spectator.playhq.com/graphql", requestOptions)).json();
    } else {
        result = optionalPayload
    }

    return {
        notOutPlayers: getNotOutPlayers(result),
        battingStats: getTeamBattingStats(result),
        bowlingStats: []
    }
}