const lolBuild = (baseData) => {
  const {
    teamShortName,
    country,
    realName,
    position,
    playCount,
    winCount,
    loseCount,
    winRate
  } = baseData
  return {
    teamShortName,
    country,
    realName,
    position,
    playCount,
    winCount,
    loseCount,
    winRate
  }
}

const dotaBuild = (baseData) => {
  const { teamShortName, position } = baseData
  return { teamShortName, position }
}

const csgoBuild = (baseData) => {
  const {
    realName,
    country,
    age,
    rating,
    mapsCount,
    rank
  } = baseData
  return {
    realName,
    country,
    age,
    rating,
    mapsCount,
    rank
  }
}

const playerInforBuild = (baseData, type) => {
  switch (type) {
    case 'lol':
      return lolBuild(baseData)
    case 'dota':
      return dotaBuild(baseData)
    case 'ow':
      return {}
    case 'csgo':
      return csgoBuild(baseData)
    case 'kog':
      return lolBuild(baseData)
  }
}

export { playerInforBuild }
