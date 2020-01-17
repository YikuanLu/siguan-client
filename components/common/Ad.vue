<script>
/**
* 广告占位组件
* 用法
* @width 容器宽度
* @height 容器高度
* @imgs 广告图数组
* import Ad from '~/components/common/Ad'
* components: { Ad }
* <Ad :width="400" :height="200" :imgs="imgs"></Ad>
**/
export default {
  name: 'Ad',
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 76
    },
    imgs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  render () {
    return null
    // if (!this.imgs || !this.imgs.length) { return null }
    // const { imgs, width, height } = this
    // const thumbs = (
    //   imgs.map((v, i) => {
    //     return (
    //       <a slot="customPaging">
    //         <span class="dot" data-i={i}></span>
    //       </a>
    //     )
    //   })
    // )

    // const images = (
    //   imgs.map((v, i) => {
    //     return (
    //       <nuxt-link rel="nofollow" key={i} to={v.url}>
    //         <img src={v.path} alt="" />
    //       </nuxt-link>
    //     )
    //   })
    // )
    // const banner = (
    //   <a-carousel autoplay arrows dotsClass="slick-dots dot" style={{ width: width + 'px', height: height + 'px' }}>
    //     {thumbs}
    //     {images}
    //   </a-carousel>
    // )
    // return banner
  }
}
</script>
<style scoped>
.ant-carousel{
  overflow: hidden;
  min-height: 76px;
  max-height: 100%;
}
.ant-carousel >>> .slick-dots {
  height: auto;
  position: absolute;
  bottom: 8px;
}
.ant-carousel >>> .slick-dots li .dot{
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  margin: 0 5px;
}
.ant-carousel >>> .slick-dots li.slick-active .dot{
  background: #3399EE;
}
.ant-carousel >>> .slick-slide img{
  display: block;
  margin: auto;
  width: 100%;
}
</style>
