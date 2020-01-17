import moment from 'moment'
/**
 * 定时器，用于页面试试刷新获取数据
 * @param fn 要执行的操作
*/
export function validate (type, errMsg) {
  let regex
  switch (type) {
    case 'phone':
      regex = this.regx.phone
      break
    case 'password':
      regex = this.regx.password
  }

  return (rule, value, callback) => {
    if (!regex.test(value)) {
      callback(new Error(errMsg))
    }
    callback()
  }
}

// 防抖
export function debounce (fn, wait) {
  const callback = fn
  let timerId = null
  function debounced () {
    const context = this
    const args = arguments
    clearTimeout(timerId)
    timerId = setTimeout(function () {
      callback.apply(context, args)
    }, wait)
  }
  return debounced
}

// 格式时间，格式为几秒前，几天前...
export function timeFormat (timestamp) {
  if (!timestamp) { return '--' }
  timestamp = timestamp.toString().replace(/[-]/g, '/')
  const isTimestamp = timestamp.includes('/') || timestamp.includes('-') || timestamp.includes(':')// 判断是不是时间戳格式
  const dateTime = !isTimestamp ? timestamp : new Date(timestamp)
  const mistiming = Math.round((Date.now() - dateTime) / 1000)
  const arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  const arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < arrn.length; i++) {
    const inm = Math.floor(mistiming / arrn[i])
    if (inm !== 0) {
      return inm + arrr[i] + '前'
    }
  }
}

// 数据转化，一位数加前面 0
const isTwoDigit = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 手机号显示替换成星号
export const replacePhone = phone => phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

/**
 * 时间戳转化为年 月 日 时 分 秒
 * @param number: 传入时间戳
 * @param format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 * formatTime(timestamp,'Y/M/D h:m:s'));//转换为日期：2017/03/03 03:03:03
*/
export function formatTime (number, format) {
  if (!number || number === '0') { return '---' }
  if (typeof number === 'string') { // 字符串转数字
    number = +number
  }
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  const returnArr = []

  const date = new Date(number)
  returnArr.push(...[
    date.getFullYear(),
    isTwoDigit(date.getMonth() + 1),
    isTwoDigit(date.getDate()),
    isTwoDigit(date.getHours()),
    isTwoDigit(date.getMinutes()),
    isTwoDigit(date.getSeconds())
  ])
  for (const i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

/**
 * 将秒转换为 分:秒
 * @param seconds int 秒数
*/
export function secondToHs (seconds) {
  if (!seconds) { return null }
  // 计算分钟
  // 算法：将秒数除以60，然后下舍入，得到分钟数
  // 计算秒
  // 算法：取得秒%60的余数，得到秒数
  let h = Math.floor(seconds / 60)
  let s = seconds % 60

  // 如果只有一位数，前面增加一个0
  h = isTwoDigit(h)
  s = isTwoDigit(s)

  return h + ':' + s
}

// const timeZone = new Date().getTimezoneOffset() / 60
/**
 * 获取某一天0点的时间戳,
*/
export function getTodayZero (day = 0) {
  const zeroTime = moment().add(day, 'days').startOf('day').format('x')
  return +zeroTime
}

/**
 * 获取某一天0点的时间戳, 需要加减当前时区，取0时区的
 * @param timeStamp int 时间戳或时间格式 (- /)
*/
export function getDayZero (timeStamp = moment()) {
  const localStringTime = moment(timeStamp).startOf('day').format('x')
  return +localStringTime
}

/**
 * 获取这周起止的时间戳
*/
export function getWeekTime (timestamp) {
  const time = timestamp ? +timestamp : moment()
  const weekOfday = moment(time).format('E')// 计算指定日期是这周第几天
  const startT = moment(time).subtract(weekOfday - 1, 'days').startOf('day').format('x')// 周一日期
  const endT = moment(time).add(7 - weekOfday + 1, 'days').startOf('day').format('x')// 周日日期
  return {
    startT: +startT,
    endT: +endT
  }
}

/**
 * 定时器，用于页面实时刷新获取数据
 * @param fn 要执行的操作
 * @param instance 当前页面的vue实例，必传，否则无法清除定时器
 * @param interval 定时器频率，1000 = 1s
*/
export function timingFn (instance, fn, interval = 10000) {
  if (typeof fn !== 'function') { return }
  const timer = setInterval(() => {
    fn()
  }, interval)
  // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
  instance.$once('hook:beforeDestroy', () => {
    clearInterval(timer)
  })
}

/**
 * 处理比赛数据格式
 * 在服务端处理完数据再返回，页面源码才能填充进数据
 * @param timestamp 当天的时间戳
*/
export function sortMatchByDate (data) {
  // 根据比赛日期来分组
  const matchData = {
    prev: {}, // 今天之前的数据
    now: {}, // 今天的数据
    next: {} // 今天以后的数据
  }
  const nowDate = formatTime(+new Date(), 'Y-M-D')
  const dataByDate = {}
  data.map((item) => {
    const formatedDate = formatTime(item.matchTime, 'Y-M-D')
    if (!dataByDate[formatedDate]) {
      dataByDate[formatedDate] = [item]
    } else {
      dataByDate[formatedDate].push(item)
    }
  })

  const dateArr = Object.keys(dataByDate)
  // 把日期数组按顺序再排一下
  dateArr.sort((a, b) => {
    return a.replace(/-/g, '') - b.replace(/-/g, '')
  })

  dateArr.map((item) => {
    if (item < nowDate) { // 今天以前的数据
      matchData.prev[item] = dataByDate[item]
    }

    if (item === nowDate) { // 今天的数据
      matchData.now[item] = dataByDate[item]
    }

    if (item > nowDate) { // 今天以后的数据
      matchData.next[item] = dataByDate[item]
    }
  })
  return matchData
}

/**
 * 首页和实时比分组装数据通用方法
 * 处理比赛数据格式
 * 在服务端处理完数据再返回，页面源码才能填充进数据
*/
export function sortOngingMethod (data, status) {
  try {
    // 先根据赛事ID排序，再根据比赛状态排序--未开始
    const newOrderData = {}
    Object.keys(data).map((k) => {
      if (data[k] && data[k].length) {
        newOrderData[k] = data[k].filter(_ => _.status === status)
      }
    })
    return newOrderData
  } catch (error) {
    return {}
  }
}
/**
 * 首页和实时比分组装数据通用方法
 * 处理比赛数据格式
 * 在服务端处理完数据再返回，页面源码才能填充进数据
*/
export function sortOngingLeague (data) {
  try {
    const dataByLeagueId = {}
    const allLeague = {}
    data.map((item) => {
      const curLId = item.leagueId
      if (!dataByLeagueId[curLId]) {
        dataByLeagueId[curLId] = [item]
        allLeague[curLId] = item
      } else {
        dataByLeagueId[curLId].push(item)
      }
    })
    return {
      dataByLeagueId,
      allLeague
    }
  } catch (error) {
    return {
      dataByLeagueId: {},
      allLeague: {}
    }
  }
}
