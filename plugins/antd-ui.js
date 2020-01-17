import Vue from 'vue'
// import Antd from 'ant-design-vue/lib'
// import 'ant-design-vue/dist/antd.less'
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment'
import 'moment/locale/zh-cn'

// Vue.use(Antd)

import {
  Button,
  Carousel,
  Checkbox,
  Popconfirm,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  message,
  Menu,
  Modal,
  Pagination,
  Select,
  Tabs,
  Tooltip,
  Table,
  LocaleProvider,
  BackTop,
  Upload,
  Radio,
  Progress,
  Spin,
  Anchor
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm

Vue.use(Button)
Vue.use(Carousel)
Vue.use(Checkbox)
Vue.use(Popconfirm)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Modal)
Vue.use(Table)
Vue.use(LocaleProvider)
Vue.use(BackTop)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(Progress)
Vue.use(Spin)
Vue.use(Anchor)

moment.locale('zh-cn')
