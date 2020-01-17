import { vue } from './index'
const Cookie = process.client ? require('js-cookie') : undefined

const config = {
  timeout: 10000
}

// 根据键名获取cookie中的值
function getCookieByName (cookies, key) {
  if (!cookies) { return null }
  const cookieObj = {}
  cookies.split(';').forEach((item) => {
    if (item) {
      const arr = item.split('=')
      cookieObj[arr[0]] = arr[1]
    }
  })
  return cookieObj[key]
}
export default function ({ $axios, store, redirect, req }) {
  // 添加请求拦截器
  $axios.onRequest((req) => {
    console.log(`当前请求接口---${req.url}`)
    console.log(`当前请求接口参数---${JSON.stringify(req.params || {})}`)
    Object.assign(req, config)
    let Token = ''
    if (!process.client) {
      const tokenCookie = req.headers.cookie || req.headers.common.cookie
      Token = getCookieByName(tokenCookie, 'Token')
    } else {
      Token = store.state.Token
    }
    req.headers.token = Token || ''
    req.headers.client_type = 'pc'
  })

  // 添加响应拦截器
  $axios.onResponse((res) => {
    return new Promise((resolve, reject) => {
      if (res.data.code === 10002) {
        if (process.client) {
          vue.$message.destroy()
          vue.$message.error('登录过期，请重新登录')
          Cookie.remove('Token')
          redirect('/')
        }
        store.commit('user/SET_USERINFO', null)
        store.commit('SET_TOKEN', null)
        redirect('/')
        reject(res)
      }
      if (res.data.code !== 200 && res.data.code !== 10002) {
        let msg = ''
        res.data.message === 'SystemError'
          ? msg = '系统繁忙！'
          : msg = res.data.message
        if (process.client) {
          vue.$message.destroy()
          vue.$message.error(msg)
        }
        reject(res)
      } else {
        const body = res.data.body ? res.data.body : {}
        resolve(body)
      }
      resolve(res.data)
    })
  })

  // 相应错误拦截
  $axios.onResponseError((err) => {
    // console.log(`当前报错接口---${req.url}`)
    // throw new Error(err.message)
    // console.log(err.data.code)
    const code = err.data.code
    if (code === 10002) {
      redirect('/')
    } else if (code === 10004) {
      // Todo
    } else if (code === 10005) {
      // Todo
      if (!process.client) {
        redirect('/404')
      }
    } else {
      redirect('/404')
    }
  })
}
