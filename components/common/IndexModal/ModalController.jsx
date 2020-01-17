export default {
  name: 'ModalController',
  props: {

  },
  data () {
    return {
      cur: 1,
      tabs: [
        {
          id: 0,
          name: '全局'
        },
        {
          id: 1,
          name: '第一局'
        },
        {
          id: 2,
          name: '第二局'
        },
        {
          id: 3,
          name: '第三局'
        },
        {
          id: 4,
          name: '第四局'
        },
        {
          id: 5,
          name: '第五局'
        }
      ],
      tbody: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      demoImg: require('@/static/img/game-types/icon-lol-color.png')
    }
  },
  computed: {

  },
  watch: {},
  mounted () {

  },
  destroyed () {

  },
  methods: {
    switchTab (item) {
      this.cur = item.id
      this.$emit('switchTab', item)
    }
  },
  render () {
    const { tabs, cur, switchTab, thead, tbody } = this
    const title = (
      <p class="title">全网指数</p>
    )
    const tab = (
      tabs.map((item) => {
        return (
          <div
            key={item.id}
            class={{ item: true, actived: cur === item.id }}
            onClick={switchTab.bind(this, item)}>{item.name}</div>
        )
      })
    )
    const tableHead = (
      <thead>
        <tr>
          <th rowSpan="2">平台</th>
          <th>全场获胜</th>
          <th>全场让分</th>
        </tr>
        <tr>
          <th>
            <span class="team">as</span>
            <span class="team">ff</span>
          </th>
          <th>
            <span class="team">as</span>
            <span class="team">ff</span>
          </th>
        </tr>
      </thead>
    )

    const tableBody = (
      <tbody>
        {tbody.map((item) => {
          return (
            <tr>
              <td>雷火</td>
              <td class="red">
                <div class="index green">
                  <icon-font class="iconfont down" type="iconxia"></icon-font>
                  <icon-font class="iconfont up" type="iconshang"></icon-font>
                  <div class="num">
                    <span class="increase">-1.5</span>
                    <span class="rate">1.66</span>
                  </div>
                </div>
                <div class="index">
                  <icon-font class="iconfont down" type="iconxia"></icon-font>
                  <icon-font class="iconfont up" type="iconshang"></icon-font>
                  <div class="num">
                    <span class="increase">-1.5</span>
                    <span class="rate">1.66</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="index green">
                  <icon-font class="iconfont down" type="iconxia"></icon-font>
                  <icon-font class="iconfont up" type="iconshang"></icon-font>
                  <div class="num">
                    <span class="increase">-1.5</span>
                    <span class="rate">1.66</span>
                  </div>
                </div>
                <div class="index red">
                  <icon-font class="iconfont down" type="iconxia"></icon-font>
                  <icon-font class="iconfont up" type="iconshang"></icon-font>
                  <div class="num">
                    <span class="increase">-1.5</span>
                    <span class="rate">1.66</span>
                  </div>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
    const table = (
      <table class="index-table">
        {tableHead}
        {tableBody}
      </table>
    )
    const dom = (
      <div>
        {title}
        <div class="game-tab">{tab}</div>
        {table}
      </div>
    )
    return dom
  }
}
