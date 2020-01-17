/**
 * 联赛接口请求
 */
export default {
  // 对应游戏键名必须一致
  lol: {
    league: {
      recentList: '/battle/lol/league/recentList', // lol近期赛事
      leagueList: '/battle/lol/league/pageList', // lol联赛列表
      basicInfo: '/battle/lol/league/basicInfo', // 联赛详情 /GET
      listThisWeekByLeagueId: '/battle/lol/league/listThisWeekByLeagueId', // LOL联赛本周赛事列表 /GET
      leagueTeamStatsPageList: '/battle/lol/league/leagueTeamStatsPageList', // 战队分析 /GET
      leaguePlayerStatsPageList: '/battle/lol/league/leaguePlayerStatsPageList', // 选手分析 /GET
      leagueHeroesStatsList: '/battle/lol/league/leagueHeroesStatsList', // 英雄分析 /GET
      teamList: '/battle/lol/league/teamList', // LOL联赛近期-参赛战队
      hotPlayer: '/battle/lol/league/hotPlayer', // LOL热门选手
      hotTeam: '/battle/lol/league/topTeams', // LOL热门战队
      stageGroup: '/battle/lol/league/stageGroup', // LOL联赛战队积分排名
      leagueBoardList: '/battle/lol/league/leagueBoardList', // 积分列表,通过leagueId、stage、typeName 查询
      leagueMatchList: '/battle/lol/league/leagueMatchList' // 比赛表,通过leagueId、stage、typeName 查询
    },
    match: {
      basicInfo: '/battle/lol/match/basicInfo', // LOL比赛基本信息-通过比赛id查询
      liveVideo: '/battle/lol/match/liveVideoList', // LOL直播地址-通过matchId查询
      proSpect: '/battle/lol/match/prospect', // LOL赛前分析
      liveBattle: '/battle/lol/match/liveBattle', // 实时比分
      betInfoList: '/battle/lol/match/betInfoList' // LOL全网指数
    },
    team: {
      basicInfo: '/battle/lol/team/basicInfo',
      playerList: '/battle/lol/team/playerList', // 获取战队员列表 /GET
      matchPageList: '/battle/lol/team/matchPageList', // LOL联赛 根据状态分页查询 /GET
      teamCompositeStats: '/battle/lol/team/teamCompositeStats', // 战队综合统计 /GET
      playerCompositeStatsPageList: '/battle/lol/team/playerCompositeStatsPageList', // 选手综合统计 /GET
      playerHeroStatsPageList: '/battle/lol/team/playerHeroStatsPageList', // 英雄综合统计 /GET
      teamLeagueStatsPageList: '/battle/lol/team/teamLeagueStatsPageList', // 战队赛事数据 /GET
      playerLeagueStatsPageList: '/battle/lol/team/playerLeagueStatsPageList' // 选手赛事数据 /GET
    },
    player: {
      basicInfo: '/battle/lol/player/basicInfo', // 选手基本信息 /GET
      battleHis: '/battle/lol/player/battleHis', // 历史战役 /GET
      leaguePlayerStatsList: '/battle/lol/player/leaguePlayerStatsList', // 选手联赛数据 /GET
      playerCompositeStats: '/battle/lol/player/playerCompositeStats', // LOL选手综合资料 /GET
      playerHeroStatsPageList: '/battle/lol/player/playerHeroStatsPageList' // 选手英雄数据 /GET
    }
  },
  dota: {
    league: {
      recentList: '/battle/dota/league/recentList', // dota近期赛事
      leagueList: '/battle/dota/league/list', // dota联赛列表
      hotTeam: '/battle/dota/league/topTeams', // dota热门战队
      hotPlayer: '/battle/dota/league/topPlayers', // dota热门队员
      stageMatchTeam: '/battle/dota/league/stageMatchTeam', // dota联赛战队积分排名
      basicInfo: '/battle/dota/league/info',
      listThisWeekByLeagueId: '/battle/dota/league/listThisWeekByLeagueId', // 联赛本周赛事列表 /GET
      teamList: '/battle/dota/league/teamList' // dota联赛近期-参赛战队
    },
    team: {
      basicInfo: '/battle/dota/team/info', // 战队基本信息
      playerList: '/battle/dota/team/players', // 获取队员列表
      matchPageList: '/battle/dota/team/matches', // 联赛 根据状态分页查询 /GET
      teamCompositeStats: '/battle/dota/team/stats', // 战队综合数据/GET
      playerCompositeStatsPageList: '/battle/dota/team/playerStats', // 选手综合统计 /GET
      playerHeroStatsPageList: '/battle/dota/team/heroStats' // 英雄综合统计 /GET
    },
    player: {
      basicInfo: '/battle/dota/player/info', // 选手基本信息 /GET
      battleHis: '/battle/dota/player/matches', // 历史战役 /GET
      playerCompositeStats: '/battle/dota/player/stats', // 选手联赛数据 /GET
      hotPlayer: '/battle/dota/league/topPlayers' // dota热门队员
    },
    match: {
      basicInfo: '/battle/dota/match/basicInfo', // LOL比赛基本信息-通过比赛id查询
      battleIds: '/battle/dota/match/battle/ids', // 获取Dota赛事的battle战局id列表
      liveBattle: '/battle/dota/match/battle/detail', // 获取Dota赛事的battle详情
      battleLog: '/battle/dota/match/battleLog', // 获取Dota赛事文字直播
      betInfo: '/battle/dota/match/betinfo', // 获取Dota的赛事指数
      matchInfo: '/battle/dota/match/info', // 获取Dota赛事基本信息
      liveVideo: '/battle/dota/match/livevideo', // 获取Dota赛事-直播地址
      prospect: '/battle/dota/match/prospect' // 获取Dota赛事的赛前分析
    }
  },
  csgo: {
    league: {
      recentList: '/battle/csgo/league/recentList', // csgo近期赛事
      leagueList: '/battle/csgo/league/list', // csgo联赛列表
      hotTeam: '/battle/csgo/league/topTeam', // csgo热门战队
      hotPlayer: '/battle/csgo/league/topPlayer', // csgo热门战队
      basicInfo: '/battle/csgo/league/info', // 获取基本信息
      listThisWeekByLeagueId: '/battle/csgo/league/listThisWeekByLeagueId', // 联赛本周赛事列表 /GET
      teamList: '/battle/csgo/league/teamList', // csgo联赛近期-参赛战队
      stageMatchTeam: '/battle/csgo/league/stageMatch', // csgo联赛战队积分排名
      matchList: '/battle/csgo/league/matchList' // CSGO联赛，不按阶段排，只按时间排
    },
    team: {
      basicInfo: '/battle/csgo/team/info',
      teamCompositeStats: '/battle/csgo/team/stats',
      playerList: '/battle/csgo/team/players',
      matchPageList: '/battle/csgo/team/matches',
      // playerCompositeStatsPageList: '/battle/csgo/team/playerStats',
      maps: '/battle/csgo/team/maps',
      playerStats: '/battle/csgo/team/playerStats'
    },
    match: {
      basicInfo: '/battle/csgo/match/info', // CSGO比赛基本信息-通过比赛id查询
      liveBattle: '/battle/csgo/match/battleDetail', // 获取CSGO赛事的battle详情
      battleLog: '/battle/csgo/match/battleLog', // 获取CSGO赛事文字直播
      betInfo: '/battle/csgo/match/betinfo', // 获取CSGO的赛事指数
      prospect: '/battle/csgo/match/prospect' // 获取CSGO赛事的赛前分析
    },
    player: {
      basicInfo: '/battle/csgo/player/info',
      battleHis: '/battle/csgo/player/matches'
    }
  },
  ow: {
    league: {
      recentList: '/battle/ow/league/recentList', // ow近期赛事
      leagueList: '/battle/ow/league/pageList', // ow联赛列表
      hotTeam: '/battle/ow/league/hotTeam', // ow热门战队
      basicInfo: '/battle/ow/league/basicInfo', // 获取基本信息
      listThisWeekByLeagueId: '/battle/ow/league/listThisWeekByLeagueId', // OW联赛本周赛事-leagueId 查询
      matchPageListByLeagueId: '/battle/ow/league/matchPageListByLeagueId', // 赛事进度
      teamList: '/battle/ow/league/teamList' // OW参赛战队
    },
    match: {
      prospect: '/battle/ow/match/prospect', // 获取ow赛事的赛前分析
      basicInfo: '/battle/ow/match/basicInfo', // ow比赛基本信息-通过比赛id查询
      betInfoList: '/battle/ow/match/betInfoList' // ow全网指数
    },
    team: {
      basicInfo: '/battle/ow/team/basicInfo', // 战队基本信息
      matchPageList: '/battle/ow/team/matchPageList' // LOL比赛列表-分页列表查询
    }
  },
  kog: {
    league: {
      recentList: '/battle/kog/league/recentList', // kog近期赛事
      leagueList: '/battle/kog/league/pageList', // kog联赛列表
      hotPlayer: '/battle/kog/league/hotPlayer', // kog热门选手
      hotTeam: '/battle/kog/league/hotTeam', // kog热门战队
      basicInfo: '/battle/kog/league/basicInfo', // 获取基本信息
      listThisWeekByLeagueId: '/battle/kog/league/listThisWeekByLeagueId', // kog联赛本周
      teamList: '/battle/kog/league/teamList', // kog联赛近期-参赛战队
      stageGroup: '/battle/kog/league/stageGroup', // kog联赛战队积分排名
      leagueBoardList: '/battle/kog/league/leagueBoardList', // 积分列表,通过leagueId、stage、typeName 查询
      leagueMatchList: '/battle/kog/league/leagueMatchList', // 比赛表,通过leagueId、stage、typeName 查询
      leagueTeamStatsPageList: '/battle/kog/league/leagueTeamStatsPageList', // 战队分析 /GET
      leaguePlayerStatsPageList: '/battle/kog/league/leaguePlayerStatsPageList', // 选手分析 /GET
      leagueHeroesStatsList: '/battle/kog/league/leagueHeroesStatsList', // 英雄分析 /GET
      stageGroupDetail: '/battle/kog/league/stageGroupDetail'
    },
    match: {
      basicInfo: '/battle/kog/match/basicInfo', // kog比赛基本信息-通过比赛id查询
      liveVideo: '/battle/kog/match/liveVideoList', // kog直播地址-通过matchId查询
      proSpect: '/battle/kog/match/prospect', // kog赛前分析
      liveBattle: '/battle/kog/match/matchAfterData', // 实时比分
      betInfoList: '/battle/kog/match/betInfoList', // kog全网指数
      hotMatches: '/battle/kog/match/getGoDoingMatches' // kog热门赛事
    },
    team: {
      basicInfo: '/battle/kog/team/basicInfo',
      playerList: '/battle/kog/team/playerList', // 获取战队员列表 /GET
      matchPageList: '/battle/kog/team/matchPageList', // kog联赛 根据状态分页查询 /GET
      teamCompositeStats: '/battle/kog/team/teamCompositeStats', // 战队综合统计 /GET
      playerCompositeStatsPageList: '/battle/kog/team/playerCompositeStatsPageList', // 选手综合统计 /GET
      playerHeroStatsPageList: '/battle/kog/team/playerHeroStatsPageList', // 英雄综合统计 /GET
      teamLeagueStatsPageList: '/battle/kog/team/teamLeagueStatsPageList', // 战队赛事数据 /GET
      playerLeagueStatsPageList: '/battle/kog/team/playerLeagueStatsPageList' // 选手赛事数据 /GET
    },
    player: {
      basicInfo: '/battle/kog/player/basicInfo', // 选手基本信息 /GET
      battleHis: '/battle/kog/player/battleHis', // 历史战役 /GET
      leaguePlayerStatsList: '/battle/kog/player/leaguePlayerStatsList', // 选手联赛数据 /GET
      playerCompositeStats: '/battle/kog/player/playerCompositeStats', // kog选手综合资料 /GET
      playerHeroStatsPageList: '/battle/kog/player/playerHeroStatsPageList' // 选手英雄数据 /GET
    }
  }
}
