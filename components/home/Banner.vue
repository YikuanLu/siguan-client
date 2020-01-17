<script>
/**
* 首页banner组件
* 用法
* @imgs 广告图数组
* import Banner from '~/components/home/Banner'
* components: { Banner }
* <Banner :imgs="imgs"></Banner>
**/
export default {
  name: 'Banner',
  props: {
    imgs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  render () {
    // const links = [
    //   '/match/lol/league/698',
    //   'https://w.url.cn/s/A8Mbeh9',
    //   '/about',
    //   '/news'
    // ]
    // return (
    //   <div class="banner-box">
    //     <a-carousel focusOnSelect pauseOnHover pauseOnDotsHover pauseOnFocus autoplay arrows dotsClass="slick-dots"
    //       {...{
    //         scopedSlots: {
    //           customPaging: (props) => {
    //             return (
    //               <img src={require(`@/static/img/banner/banner${props.i + 1}.jpg`)} alt="" />
    //             )
    //           }
    //         }
    //       }}
    //     >
    //       {new Array(4).fill(1).map((v, i) => {
    //         return (
    //           <a key={i} href={links[i]} target="_blank">
    //             <img src={require(`@/static/img/banner/banner${i + 1}.jpg`)} alt="" />
    //           </a>
    //         )
    //       })}
    //     </a-carousel>
    //   </div>
    // )

    const { imgs } = this
    if (!imgs || !imgs.length) { return <br/> }

    const banners = imgs.slice(0, 4) // 最多显示4张
    const images = (
      banners.map((v, i) => {
        return (
          <a key={i} href={v.url} target="_blank" title={v.title}>
            <img src={v.imgSrc} alt="" />
          </a>
        )
      })
    )
    const banner = (
      <div class="banner-box">
        <a-carousel autoplay arrows dotsClass="slick-dots"
          {...{
            scopedSlots: {
              customPaging: (props) => {
                return (
                  <a>
                    <img src={ banners[props.i].imgSrc } alt="" />
                  </a>
                )
              }
            }
          }}
        >
          {images}
        </a-carousel>
      </div>
    )
    return banner
  }
}
</script>
<style scoped>
.banner-box{
  width: 1200px;
  height: 370px;
  margin: 0 auto 20px;
  overflow: hidden;
}
.ant-carousel >>> .slick-dots {
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 200px;
}
.ant-carousel >>> .slick-dots li{
  display: block;
  margin: 0 0 10px 0;
  position: relative;
  filter: brightness(0.4);
  user-select: none;
}
.ant-carousel >>> .slick-dots li:last-child{
  margin-bottom: 0;
}
.ant-carousel >>> .slick-dots li img{
  width: 200px;
  height: 85px;
}
.ant-carousel >>> .slick-dots li.slick-active{
  filter: brightness(1);
}
.ant-carousel >>> .slick-dots li.slick-active:before{
  content: '';
  position: absolute;
  width: 200px;
  height: 85px;
  border: solid 3px #3399EE;
}
.ant-carousel >>> .slick-dots li.slick-active:after{
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border: solid 7px;
  border-color: transparent transparent transparent #3399EE;
}
.ant-carousel >>> .slick-list{
  margin-left: 210px;
}
.ant-carousel >>> .slick-slide img{
  width: 990px;
  height: 370px;
}
.ant-carousel >>> .slick-prev, .ant-carousel >>> .slick-next{
  visibility: hidden;
  height: 0;
  width: 0;
}
</style>
