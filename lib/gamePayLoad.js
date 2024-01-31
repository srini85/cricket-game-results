exports.getGamePayload = function() {
  //return `query gameView($gameId: ID!){discoverGame(gameID: $gameId){id  alias result{winner {name value __typename}outcome{name value __typename}home{score}away{score}}}}`
  return `query gameView($gameId: ID!, $gameStatisticsFilter: GameStatisticsFilter!) {
    discoverGame(gameID: $gameId) {
      id
      alias
      away {
        ...TeamFragment
        __typename
      }
      home {
        ...TeamFragment
        __typename
      }
      result {
        winner {
          name
          value
          __typename
        }
        outcome {
          name
          value
          __typename
        }
        home {
          score
          outcome {
            name
            value
            __typename
          }
          statistics {
            count
            type {
              value
              __typename
            }
            __typename
          }
          periods {
            period {
              label
              value
              __typename
            }
            type
            closureStatus
            statistics {
              count
              type {
                label
                value
                __typename
              }
              __typename
            }
            __typename
          }
          gameOutcomeDescription
          __typename
        }
        away {
          score
          outcome {
            name
            value
            __typename
          }
          statistics {
            count
            type {
              value
              __typename
            }
            __typename
          }
          periods {
            period {
              label
              value
              __typename
            }
            type
            closureStatus
            statistics {
              count
              type {
                label
                value
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      status {
        name
        value
        __typename
      }
      round {
        id
        name
        abbreviatedName
        grade {
          id
          name
          day {
            name
            value
            __typename
          }
          hideScores
          season {
            id
            name
            competition {
              id
              name
            }
            __typename
          }
          gameEvents {
            participantEvents {
              type
              label
              shortName
              value
              pointValue
              applicableTo
              advanced
              __typename
            }
            periodEvents {
              value
              __typename
            }
            __typename
          }
          hasPeriodScores
          periodScoresDisplayType {
            name
            value
            __typename
          }
          periods {
            shortName
            value
            __typename
          }
          playerPoints {
            enforceTeamTotalCap
            teamPlayerPointsCap
            publicVisible
            __typename
          }
          bestPlayers {
            max
            __typename
          }
          gameStatisticsConfiguration {
            gameStatistics(filter: $gameStatisticsFilter) {
              type
              glossary {
                default {
                  name
                  shortName
                  message
                  labelName
                  __typename
                }
                scoring {
                  name
                  shortName
                  message
                  labelName
                  __typename
                }
                __typename
              }
              value
              pointValue
              applicableTo
              required
              max
              __typename
            }
            __typename
          }
          lineupRemainsWhenGameStarted
          __typename
        }
        __typename
      }
      date
      dates
      allocation {
        time
        dateTimeList {
          date
          time
          __typename
        }
        court {
          id
          abbreviatedName
          name
          venue {
            id
            name
            latitude
            longitude
            address
            suburb
            state
            postcode
            __typename
          }
          __typename
        }
        __typename
      }
      statistics {
        home {
          ...GameViewGameTeamStatisticsFragment
          __typename
        }
        away {
          ...GameViewGameTeamStatisticsFragment
          __typename
        }
        shared {
          period {
            label
            shortName
            value
            __typename
          }
          type
          status
          statistics {
            count
            type {
              value
              __typename
            }
            __typename
          }
          side
          players {
            playerID
            teamID
            role
            __typename
          }
          dismissalType
          displayOrder
          __typename
        }
        __typename
      }
      publishLineup
      gameType {
        name
        value
        maxBattersPerInnings
        eScoringSettings {
          dismissalsPerBatter
          legalBallsPerOver
          __typename
        }
        emergencyPlayersSettings {
          enabled
          __typename
        }
        clockType
        __typename
      }
      formation {
        template
        __typename
      }
      __typename
    }
    tenantConfiguration {   
      showPlayerPositionsInLineup    
      periodType {
        value
        __typename
      }
      __typename
    }
  }
  
  fragment TeamFragment on DiscoverPossibleTeam {
    ... on ProvisionalTeam {
      name
      pool {
        id
        name
        __typename
      }
      __typename
    }
    ... on DiscoverTeam {
      ...DiscoverTeamFragment
      __typename
    }
    __typename
  }
  
  fragment DiscoverTeamFragment on DiscoverTeam {
    id
    name
    season {
      id
      name
      competition {
        id
        name
      }    
    }
    organisation {
      id
      name
      type
      __typename
    }
    playerPointsCap
    __typename
  }
  
  fragment GameViewGameTeamStatisticsFragment on DiscoverGameTeamStatistics {
    players {
      playerNumber
      player {
        ... on DiscoverParticipant {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          hasSeasonPermit
          __typename
        }
        ... on DiscoverParticipantFillInPlayer {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          hasSeasonPermit
          __typename
        }
        ... on DiscoverGamePermitFillInPlayer {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          __typename
        }
        ... on DiscoverRegularFillInPlayer {
          id
          name
          __typename
        }
        ... on DiscoverAnonymousParticipant {
          id
          name
          hasGamePermit
          hasSeasonPermit
          __typename
        }
        __typename
      }
      statistics {
        count
        type {
          value
          __typename
        }
        __typename
      }
      periodStatistics {
        period {
          label
          shortName
          value
          __typename
        }
        type
        statistics {
          type {
            type
            label
            shortName
            value
            pointValue
            applicableTo
            advanced
            __typename
          }
          count
          details {
            value
            __typename
          }
          __typename
        }
        status
        side
        displayOrder
        __typename
      }
      playerPoints
      playerPosition {
        positionType
        shortName
        order
        __typename
      }
      captain {
        name
        shortName
        __typename
      }
      __typename
    }
    statistics {
      count
      type {
        value
        pointValue
        __typename
      }
      __typename
    }
    periods {
      period {
        value
        __typename
      }
      overtimeSequenceNo
      statistics {
        type {
          value
          __typename
        }
        count
        __typename
      }
      teamEvents {
        sequenceNo
        playerID
        statistic {
          type {
            value
            __typename
          }
          count
          __typename
        }
        __typename
      }
      __typename
    }
    emergencyPlayers {
      playerNumber
      playerPoints
      player {
        ... on DiscoverParticipant {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          hasSeasonPermit
          __typename
        }
        ... on DiscoverParticipantFillInPlayer {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          hasSeasonPermit
          __typename
        }
        ... on DiscoverGamePermitFillInPlayer {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          __typename
        }
        ... on DiscoverAnonymousParticipant {
          id
          name
          hasGamePermit
          hasSeasonPermit
          __typename
        }
        __typename
      }
      __typename
    }
    bestPlayers {
      participant {
        ... on DiscoverParticipant {
          id
          profile {
            id
            firstName
            lastName
            __typename
          }
          __typename
        }
        ... on DiscoverAnonymousParticipant {
          name
          __typename
        }
        __typename
      }
      ranking
      __typename
    }
    coinTossWinningResult {
      preference
      __typename
    }
    __typename
  }  
  `
}