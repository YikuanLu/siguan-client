/**
 * 抽离出按照游戏分类传参分类调用不同请求方法
 */
import { matchApi } from '~/api/index'
let _axios
const typeMap = {
  lol: {
    league: {
      recentList (params) {
        return _axios.get(matchApi.lol.league.recentList, { params })
      },
      // LOL联赛本周赛事列表
      leagueList (params) {
        return _axios.get(matchApi.lol.league.leagueList, { params })
      },
      basicInfo (params) {
        return _axios.get(matchApi.lol.league.basicInfo, { params })
      },
      listThisWeekByLeagueId (params) {
        return _axios.get(matchApi.lol.league.listThisWeekByLeagueId, {
          params
        })
      },
      // 战队分析
      leagueTeamStatsPageList (params) {
        return _axios.get(matchApi.lol.league.leagueTeamStatsPageList, {
          params
        })
      },
      // 选手分析
      leaguePlayerStatsPageList (params) {
        return _axios.get(matchApi.lol.league.leaguePlayerStatsPageList, {
          params
        })
      },
      // 英雄分析
      leagueHeroesStatsList (params) {
        return _axios.get(matchApi.lol.league.leagueHeroesStatsList, { params })
      },
      // 参赛战队
      teamList (params) {
        return _axios.get(matchApi.lol.league.teamList, { params })
      },
      // kog联赛战队积分排名
      stageGroup (params) {
        return _axios.get(matchApi.lol.league.stageGroup, { params })
      },
      // 积分列表
      leagueBoardList (params) {
        return _axios.get(matchApi.lol.league.leagueBoardList, { params })
      },
      // 比赛表
      leagueMatchList (params) {
        return _axios.get(matchApi.lol.league.leagueMatchList, { params })
      }
    },
    team: {
      basicInfo (params) {
        return _axios.get(matchApi.lol.team.basicInfo, { params })
      },
      playerList (params) {
        return _axios.get(matchApi.lol.team.playerList, { params })
      },
      matchPageList (params) {
        return _axios.get(matchApi.lol.team.matchPageList, { params })
      },
      teamCompositeStats (params) {
        return _axios.get(matchApi.lol.team.teamCompositeStats, { params })
      },
      playerCompositeStatsPageList (params) {
        return _axios.get(matchApi.lol.team.playerCompositeStatsPageList, {
          params
        })
      },
      playerHeroStatsPageList (params) {
        return _axios.get(matchApi.lol.team.playerHeroStatsPageList, { params })
      },
      teamLeagueStatsPageList (params) {
        return _axios.get(matchApi.lol.team.teamLeagueStatsPageList, { params })
      },
      playerLeagueStatsPageList (params) {
        return _axios.get(matchApi.lol.team.playerLeagueStatsPageList, {
          params
        })
      }
    },
    player: {
      basicInfo (params) {
        return _axios.get(matchApi.lol.player.basicInfo, { params })
      },
      battleHis (params) {
        return _axios.get(matchApi.lol.player.battleHis, { params })
      },
      leaguePlayerStatsList (params) {
        return _axios.get(matchApi.lol.player.leaguePlayerStatsList, { params })
      },
      playerCompositeStats (params) {
        return _axios.get(matchApi.lol.player.playerCompositeStats, { params })
      },
      playerHeroStatsPageList (params) {
        return _axios.get(matchApi.lol.player.playerHeroStatsPageList, {
          params
        })
      }
    }
  },
  ow: {
    league: {
      recentList (params) {
        return _axios.get(matchApi.ow.league.recentList, { params })
      },
      // ow联赛本周赛事列表
      leagueList (params) {
        return _axios.get(matchApi.ow.league.leagueList, { params })
      },
      basicInfo (params) {
        return _axios.get(matchApi.ow.league.basicInfo, { params })
      },
      listThisWeekByLeagueId (params) {
        return _axios.get(matchApi.ow.league.listThisWeekByLeagueId, { params })
      },
      matchPageListByLeagueId (params) {
        return _axios.get(matchApi.ow.league.matchPageListByLeagueId, {
          params
        })
      },
      teamList (params) {
        return _axios.get(matchApi.ow.league.teamList, { params })
      }
    },
    team: {
      basicInfo (params) {
        return _axios.get(matchApi.ow.team.basicInfo, { params })
      },
      matchPageList (params) {
        return _axios.get(matchApi.ow.team.matchPageList, { params })
      }
    }
  },
  dota: {
    league: {
      recentList (params) {
        return _axios.get(matchApi.dota.league.recentList, { params })
      },
      // dota联赛本周赛事列表
      leagueList (params) {
        return _axios.get(matchApi.dota.league.leagueList, { params })
      },
      basicInfo (params) {
        return _axios.get(matchApi.dota.league.basicInfo, { params })
      },
      listThisWeekByLeagueId (params) {
        return _axios.get(matchApi.dota.league.listThisWeekByLeagueId, {
          params
        })
      },
      teamList (params) {
        return _axios.get(matchApi.dota.league.teamList, { params })
      },
      stageMatchTeam (params) {
        return _axios.get(matchApi.dota.league.stageMatchTeam, { params })
      }
    },
    team: {
      basicInfo (params) {
        return _axios.get(matchApi.dota.team.basicInfo, { params })
      },
      playerList (params) {
        return _axios.get(matchApi.dota.team.playerList, { params })
      },
      matchPageList (params) {
        return _axios.get(matchApi.dota.team.matchPageList, { params })
      },
      teamCompositeStats (params) {
        return _axios.get(matchApi.dota.team.teamCompositeStats, { params })
      },
      playerCompositeStatsPageList (params) {
        return _axios.get(matchApi.dota.team.playerCompositeStatsPageList, {
          params
        })
      },
      playerHeroStatsPageList (params) {
        return _axios.get(matchApi.dota.team.playerHeroStatsPageList, {
          params
        })
      }
    },
    player: {
      basicInfo (params) {
        return _axios.get(matchApi.dota.player.basicInfo, { params })
      },
      battleHis (params) {
        return _axios.get(matchApi.dota.player.battleHis, { params })
      },
      playerCompositeStats (params) {
        return _axios.get(matchApi.dota.player.playerCompositeStats, { params })
      }
    }
  },
  csgo: {
    league: {
      recentList (params) {
        return _axios.get(matchApi.csgo.league.recentList, { params })
      },
      // ow联赛本周赛事列表
      leagueList (params) {
        return _axios.get(matchApi.csgo.league.leagueList, { params })
      },
      basicInfo (params) {
        return _axios.get(matchApi.csgo.league.basicInfo, { params })
      },
      listThisWeekByLeagueId (params) {
        return _axios.get(matchApi.csgo.league.listThisWeekByLeagueId, {
          params
        })
      },
      teamList (params) {
        return _axios.get(matchApi.csgo.league.teamList, { params })
      },
      stageMatchTeam (params) {
        return _axios.get(matchApi.csgo.league.stageMatchTeam, { params })
      },
      matchList (params) {
        return _axios.get(matchApi.csgo.league.matchList, { params })
      }
    },
    team: {
      basicInfo (params) {
        return _axios.get(matchApi.csgo.team.basicInfo, { params })
      },
      teamCompositeStats (params) {
        return _axios.get(matchApi.csgo.team.teamCompositeStats, { params })
      },
      playerList (params) {
        return _axios.get(matchApi.csgo.team.playerList, { params })
      },
      matchPageList (params) {
        return _axios.get(matchApi.csgo.team.matchPageList, { params })
      },
      maps (params) {
        return _axios.get(matchApi.csgo.team.maps, { params })
      },
      playerStats (params) {
        return _axios.get(matchApi.csgo.team.playerStats, { params })
      }
    },
    player: {
      basicInfo (params) {
        return _axios.get(matchApi.csgo.player.basicInfo, { params })
      },
      battleHis (params) {
        return _axios.get(matchApi.csgo.player.battleHis, { params })
      }
    }
  },
  kog: {
    league: {
      basicInfo (params) {
        return _axios.get(matchApi.kog.league.basicInfo, { params })
      },
      recentList (params) {
        return _axios.get(matchApi.kog.league.recentList, { params })
      },
      // kog联赛本周赛事列表
      leagueList (params) {
        return _axios.get(matchApi.kog.league.leagueList, { params })
      },
      listThisWeekByLeagueId (params) {
        return _axios.get(matchApi.kog.league.listThisWeekByLeagueId, {
          params
        })
      },
      // 参赛战队
      teamList (params) {
        return _axios.get(matchApi.kog.league.teamList, { params })
      },
      // kog联赛战队积分排名
      stageGroup (params) {
        return _axios.get(matchApi.kog.league.stageGroup, { params })
      },
      // 积分列表
      leagueBoardList (params) {
        return _axios.get(matchApi.kog.league.leagueBoardList, { params })
      },
      // 比赛表
      leagueMatchList (params) {
        return _axios.get(matchApi.kog.league.leagueMatchList, { params })
      },
      // 战队分析
      leagueTeamStatsPageList (params) {
        return _axios.get(matchApi.kog.league.leagueTeamStatsPageList, {
          params
        })
      },
      // 选手分析
      leaguePlayerStatsPageList (params) {
        return _axios.get(matchApi.kog.league.leaguePlayerStatsPageList, {
          params
        })
      },
      // 英雄分析
      leagueHeroesStatsList (params) {
        return _axios.get(matchApi.kog.league.leagueHeroesStatsList, { params })
      },
      stageGroupDetail (params) {
        return _axios.get(matchApi.kog.league.stageGroupDetail, { params })
      }
    },
    team: {
      basicInfo (params) {
        return _axios.get(matchApi.kog.team.basicInfo, { params })
      },
      playerList (params) {
        return _axios.get(matchApi.kog.team.playerList, { params })
      },
      matchPageList (params) {
        return _axios.get(matchApi.kog.team.matchPageList, { params })
      },
      teamCompositeStats (params) {
        return _axios.get(matchApi.kog.team.teamCompositeStats, { params })
      },
      playerCompositeStatsPageList (params) {
        return _axios.get(matchApi.kog.team.playerCompositeStatsPageList, {
          params
        })
      },
      playerHeroStatsPageList (params) {
        return _axios.get(matchApi.kog.team.playerHeroStatsPageList, { params })
      },
      teamLeagueStatsPageList (params) {
        return _axios.get(matchApi.kog.team.teamLeagueStatsPageList, { params })
      },
      playerLeagueStatsPageList (params) {
        return _axios.get(matchApi.kog.team.playerLeagueStatsPageList, {
          params
        })
      }
    },
    player: {
      basicInfo (params) {
        return _axios.get(matchApi.kog.player.basicInfo, { params })
      },
      battleHis (params) {
        return _axios.get(matchApi.kog.player.battleHis, { params })
      },
      leaguePlayerStatsList (params) {
        return _axios.get(matchApi.kog.player.leaguePlayerStatsList, { params })
      },
      playerCompositeStats (params) {
        return _axios.get(matchApi.kog.player.playerCompositeStats, { params })
      },
      playerHeroStatsPageList (params) {
        return _axios.get(matchApi.kog.player.playerHeroStatsPageList, {
          params
        })
      }
    }
  }
}

const selectApiByType = (type) => {
  return typeMap[type]
}

const getDataByGameType = (gameType) => {
  return ($axios) => {
    _axios = $axios
    return selectApiByType(gameType)
  }
}

export default getDataByGameType
