/**
 * 中央事件总线bus
 * $bus.on应该在created钩子内使用，如果在mounted使用，它可能接收不到其他组件来自created钩子内发出的事件
 * 使用了$bus.on在beforeDestory/destroyed钩子里应该需要使用$bus.off解除
 */
const install = (Vue) => {
  const Bus = new Vue({
    methods: {
      emit (event, ...args) {
        this.$emit(event, ...args)
      },
      once (event, ...args) {
        this.$once(event, ...args)
      },
      on (event, callback) {
        this.$on(event, callback)
      },
      off (event, callback) {
        this.$off(event, callback)
      }
    }
  })
  Vue.prototype.$bus = Bus
}

export default install
