const env = require('./env.config') // 全局环境接口配置
const { THEME } = require('./static/js/antd-theme') // 自定义主题

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // 国内服务器用的文字
    title: '电竞比分直播_实时电竞比分数据分析_电竞比赛统计-尚牛电竞',
    // 香港服务器用的文字
    // title: '电竞比分网_LOL比赛直播|DOTA2分析|CSGO比分数据查询-尚牛电竞',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: process.env.npm_package_keyword || ''
      },
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: THEME['primary-color'] },
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.less', '~/assets/css/reset.css', '~/assets/css/public.less'],

  router: {
    middleware: 'i18n'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/index',
    '@/plugins/axios',
    '@/plugins/route',
    '~/plugins/i18n.js',
    { src: '~/plugins/localStorage', ssr: false } // ssr=false才能持久化
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/component-cache'
  ],
  /*
   ** axios modules
   ** https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true, // Can be also an object with default options
    prefix: '/api',
    credentials: true
  },
  /*
   ** proxy modules
   */
  proxy: {
    '/api': {
      target: env[process.env.mode].BASE_URL,
      pathRewrite: {
        '^/api': '/',
        changeOrigin: true
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // analyze: true, // 打包时用来分析依赖包包大小
    extractCSS: true, // 单独提取 css
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000, // 模块的最小体积
        // maxSize: 360000, // 模块的最大体积
        automaticNameDelimiter: '~', // 文件名的连接符
        name: true,
        cacheGroups: { // 缓存组
          styles: {
            test: /\.[css|less]/,
            chunks: 'all',
            priority: 30,
            enforce: true
          },
          'antd-vue': {
            test: /node_modules[\\/]ant-design-vue/,
            chunks: 'initial',
            priority: 20,
            name: true,
            enforce: true
          },
          '@antd': {
            test: /node_modules[\\/]@ant-design/,
            chunks: 'initial',
            priority: 20,
            name: true,
            enforce: true
          },
          'moment': {
            test: /node_modules[\\/]moment/,
            chunks: 'initial',
            priority: 20,
            name: true,
            enforce: true
          },
          'echarts': {
            test: /node_modules[\\/]echarts/,
            chunks: 'initial',
            priority: 20,
            name: true,
            enforce: true
          },
          'tinymce': {
            test: /node_modules[\\/]tinymce/,
            chunks: 'initial',
            priority: 20,
            name: true,
            enforce: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 10,
            enforce: true
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true
          }
        }
      }
    },
    extend (config, ctx) { },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: THEME
      }
    },
    friendlyErrors: false,
    filenames: {
      // Please do not use contenthash in dev mode to prevent memory leak
      css: ({ isDev }) => isDev ? `[name].css` : `sndj.[name].css?t=${Date.now()}`
    }
  },
  server: {
    port: 80, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  env: {
    // 配置接口请求域名
    baseUrl: env[process.env.mode].BASE_URL
  }
}
