const buildLeagueLol = (baseData) => {
  const { shortName, nameEn, organizer, address } = baseData
  const result = { shortName, nameEn, organizer, address }
  return result
}
const buildLeagueDota = (baseData) => {
  const {
    shortName, // 联赛简称
    nameEn, // 联赛英文名称
    organizer, // 举办方
    organizerEn, // 举办方英文
    location, // 举办地
    prize, // 总奖励
    area, // 举办范围
    nation // 举办国家
  } = baseData
  return {
    shortName,
    nameEn,
    organizer,
    organizerEn,
    location,
    prize,
    area,
    nation
  }
}
const buildLeagueCsgo = (baseData) => {
  const {
    location,
    prizePool
  } = baseData
  return {
    location,
    prizePool
  }
}
const buildLeagueKog = (baseData) => {
  // 联赛简称 | 联赛英文名称 | 组织者 | 举办地
  const { shortName, organizer, address } = baseData
  const result = { shortName, organizer, address }
  return result
}

const buildLeagueOw = (baseData) => {
  const { shortName, nameEn, organizer, venue } = baseData
  const result = { shortName, nameEn, organizer, venue }
  return result
}
const buildTeamLol = (baseData) => {
  // 联赛简称 | 联赛英文名称 | 游戏总场数 | 胜场数 | 失败数 | 胜率
  const {
    shortName,
    nameEn,
    playCount,
    winCount,
    loseCount,
    winRate
  } = baseData
  const result = { shortName, nameEn, playCount, winCount, loseCount, winRate }
  return result
}

const buildTeamKog = (baseData) => {
  // 联赛简称 | 联赛英文名称 | 游戏总场数 | 胜场数 | 失败数 | 胜率
  const {
    shortName,
    nameEn,
    playCount,
    winCount,
    loseCount,
    winRate
  } = baseData
  const result = { shortName, nameEn, playCount, winCount, loseCount, winRate }
  return result
}

const buildTeamDota = (baseData) => {
  const {
    shortName, // 简称
    alias, // 别名
    nation, // 举办国家
    region, // 地区
    statCount, // 总场数次 ,
    statWin, // 获胜场次
    statLost, // 失败场次
    statWinRate // 获胜率
  } = baseData
  return {
    shortName,
    alias,
    nation,
    region,
    statCount,
    statWin,
    statLost,
    statWinRate
  }
}

const buildTeamCsgo = (baseData) => {
  const {
    country,
    worldRank,
    weekInTop30
  } = baseData
  return {
    country,
    worldRank,
    weekInTop30
  }
}

const buildTeamOw = (baseData) => {
  const { shortName, nation } = baseData
  return { shortName, nation }
}

const buildData = (baseData, gameType, type) => {
  if (type === 'league') {
    switch (gameType) {
      case 'lol':
        return buildLeagueLol(baseData)
      case 'dota':
        return buildLeagueDota(baseData)
      case 'csgo':
        return buildLeagueCsgo(baseData)
      case 'kog':
        return buildLeagueKog(baseData)
      case 'ow':
        return buildLeagueOw(baseData)
      default:
        return buildLeagueLol(baseData)
    }
  }
  if (type === 'team') {
    switch (gameType) {
      case 'lol':
        return buildTeamLol(baseData)
      case 'dota':
        return buildTeamDota(baseData)
      case 'csgo':
        return buildTeamCsgo(baseData)
      case 'kog':
        return buildTeamKog(baseData)
      case 'ow':
        return buildTeamOw(baseData)
      default:
        return buildLeagueLol(baseData)
    }
  }
}

export { buildData }
