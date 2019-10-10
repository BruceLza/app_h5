<template>
  <div class="UnderIndex Bindex">
    <div class="seach_main" style="height: 0.9rem">
      <div class="home_seach addressBox">
        <div class="home_seach_left" @click="selectCity()">
          <p>{{cityS || '定位'}}<img src="../../../assets/mall/sanjiao.png" alt=""></p>
        </div>
        <div class="home_seach_input" @click="jumpTo({name:'mallSearch',query:{type:'shop'}})">
          <div class="input_box">
            <img src="../../../assets/mall/img/home/seach.png" alt="">
            <p>请输入关键字</p>
          </div>
        </div>
        <i style="margin-left: .2rem;margin-right: 0.2rem" class="iconfont icon-saoyisao" @click.stop="handleQrcode()"></i>
        <img v-if="!$isMallShop" style="width: .4rem;height: .4rem;margin-left: .3rem;margin-right: 0.2rem" src="../../../assets/mall/img/home/bottom/my.png" alt="" @click="jumpTo({name: 'mallUnderMy'})">
      </div>
    </div>
    <div class="cityList" v-if="showHead" @click="closeCity" ><div><i class="iconfont icon-back"></i></div><span>城市列表</span></div>
    <div class="mescrollBox" :style="{'bottom': $isMallShop ? '43px' : '0'}">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div ref="mate">
          <div class="home_main" style="padding-bottom: 0.15rem">
            <div class="banner" style="position:relative" v-if="list1.slide">
              <swiper :options="swiperOption" ref="mySwiper" style="height:100%;">
                <swiperSlide v-for="(item,i) in list1.slide" :key="i" @click="jumpTos(item)">
                  <img v-lazy="item.thumb" alt="" style="width:100%;height:3.4rem;">
                </swiperSlide>
              </swiper>
              <div class="swiper-banner" slot="pagination"></div>
            </div>
            <swiper class="banner_list" style="background: #fff;padding-top: 0.2rem" :options="swiperOption1" ref="navButton" v-if="list1.navInfo">
              <swiper-slide class="allBox" v-for="(item,i) in list1.navInfo" :key="i">
                <div class="allList" v-for="(val,j) in item" :key="j">
                  <img v-lazy="val.thumb" alt="" @click="jumpTos(val)">
                  <p>{{val.title}}</p>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination" slot="pagination"></div>
          </div>
          <div class="home_header" v-if="list1.fuShopsSlide">
            <img v-lazy="list1.fuShopsSlide ? list1.fuShopsSlide[0].thumb : ''" alt="">
          </div>
        </div>
        <div  ref="tabBox" class="tabBox" :class="{sticky: isIos}">
          <div class="tab">
            <div :class="active == 1 ? 'active' : ''" @click="handChange(1)">
              综合
              <span></span>
            </div>
            <div :class="active == 2 ? 'active' : ''" @click="handChange(2)">
              销量
              <span></span>
            </div>
            <div :class="active == 3 ? 'active' : ''" @click="handChange(3)">
              好评
              <span></span>
            </div>
          </div>
        </div>
        <Under :list="suggest"></Under>
        <!--<div class="tab_main" v-if="!$isMallShop">-->
          <!--<p @click="jumpTo({name:'home'})" style="margin-bottom: .1rem;">-->
            <!--<img src="../../../assets/mall/img/fanhui.png" alt="">-->
          <!--</p>-->
        <!--</div>-->
        <!--<img src="../../../assets/mall/shouye.png" v-if="$store.state.global.firstNav === '/home'" alt="" class="homeBack" @click="jumpTo({name:'home'})">-->
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Under from '../../../components/underList'
import * as apiHttp from '../../../api/index'
import './underLess.less'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
    Under,
    MescrollVue
  },
  data(){
    return {
      swiperOption: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        disabledClass: 'my-button-disabled',
        hiddenClass: 'my-button-hidden',
        spaceBetween: 5,
        autoplay:true,
        pagination: {
          el: '.swiper-banner'
        }
      },
      finish: false,
      swiperOption1: {
        slidesPerView : 5,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        }
      },
      suggest:[],
      list1:[],
      loading:false,
      active:1,
      isCityShow: false,
      city: null,
      lon: null,
      lat: null,
      isDingwei: true,
      currentCity: null,
      mescroll: null,
      mescrollDown: {
        auto: true,
        callback: this.refresh,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      mescrollUp: {
        auto: false,
        onScroll: this.handleScroll,
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        noMoreSize: 5,
        toTop: {
          src: require('../../../assets/mall/top.png'),
          offset: 1000
        },
        empty: {
          warpId: '',
          icon: '',
          tip: '暂无相关数据~'
        }
      },
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹
      isIos: api.systemType === 'ios',
      h: api.safeArea.top,
      statusBar: false,
      showHead: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.mescroll) {
        // 滚动到之前列表的位置
        if (vm.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.lastScrollTop)
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0) // 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
        // 恢复到之前设置的isBounce状态
        if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.mescroll) {
      this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
      this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
    }
    if (this.isCityShow) {
      var UICityList = api.require('UICityList');
      UICityList.close()
      this.showHead = false
    }
    next()
  },
  computed: {
    cityS () {
      if (this.city && this.city.length > 3) {
        return this.city.substring(0, 2) + '...' + this.city.charAt(this.city.length - 1)
      } else {
        return this.city
      }
    }
  },
  methods: {
    closeCity () {
      var UICityList = api.require('UICityList')
      UICityList.close()
      this.showHead = false
    },
    selectCity () {
      if (this.isDingwei) {
        this.showHead = true
        let that = this
        var UICityList = api.require('UICityList');
        UICityList.open({
          rect: {
            x: 0,
            y: this.h + 44,
            w: api.frameWidth,
            h: api.frameHeight
          },
          resource : 'widget://res/uicitylist.json',
          placeholder: '',
          styles: {
            searchBar: {    //（可选项）JSON对象；顶部搜索条的样式
              height: 40,                 //（可选项）数字类型；搜索框区域高度；默认：40
              bgColor: '#fff',         //（可选项）字符串类型；搜索条背景色，支持 rgb、rgba、#；默认：'#696969'
              cancelColor: '#333333',     //（可选项）字符串类型；取消文字颜色，支持 rgb、rgba、#，默认：'#E3E3E3'
              placeholderColor: '#9f9f9f',
              searchIconLeft: '20',
              placeholderSize: '20',
              contentBgColor: '#EEEEEE',    //（可选项）字符串类型；搜索框输入区域背景色
              // cancelText: '取消',          //(可选项) 字符串类型；取消按钮的文本；默认：'取消'；此参数只在android平台有效
              hidden: false,             //（可选项）布尔类型：是否隐藏搜索框；默认：false
              corner: 20
            },
            location: {                     //（可选项）JSON对象；定位提示文字样式
              color: '#696969',           //（可选项）字符串类型；定位提示文字颜色，支持 rgb、rgba、#，默认：'#696969'
              size: 12                    //（可选项）数字类型；定位提示文字大小，默认：12.0
            },
            hotCity: {                      //（可选项）JSON对象；热门城市矩阵分布样式配置，若不传则表示热门城市呈列表显示
              column: 5,                  //（可选项）数字类型；每行显示列数；默认：5
              width: 48,                  //（可选项）数字类型；按钮的宽；默认：48
              height: 30,                 //（可选项）数字类型；按钮的高；默认：30
              interval: 20,               //（可选项）数字类型；按钮排列行间距；默认：20
              corner: 15,                 //（可选项）数字类型；按钮圆角大小；默认：15
              color: '#000',              //（可选项）字符串类型；按钮边框和标题常态时的颜色，支持rgb、rgba、#；默认：#000
              active: '#fc3357',
              background: '#fff',
              titleBgColor: '#fff',
              bgColor: '#E6E6E6',
              borderColor: '#E6E6E6'
            },
            sectionTitle: {                 //（可选项）JSON对象；标题的样式
              bgColor: '#E6E6E6',            //（可选项）字符串类型；标题的背景色，支持 rgb、rgba、#；默认：'#EEEEEE'
              color: '#414141',              //（可选项）字符串类型；标题文字颜色，支持 rgb、rgba、#；默认：'#000000'
              size: 12,                   //（可选项）数字类型；标题文字大小；默认：12.0
              height: 20                  //（可选项）数字类型；区域标题的高度，默认：25.0
            },
            item: {                         //（可选项）JSON对象；列表项的样式
              bgColor: '#fff',            //（可选项）字符串类型；列表项的背景色，支持 rgb、rgba、#；默认：'#FFFFFF'
              activeBgColor: '#696969',   //（可选项）字符串类型；列表项按下时的背景色，支持 rgb、rgba、#；默认：'#696969'
              boardColor: 'rgba(0,0,0,0)',
              color: '#414141',              //（可选项）字符串类型；列表项的文字颜色，支持 rgb、rgba、#，默认：'#000000'
              size: 14,                   //（可选项）数字类型；列表项的文字大小，默认：14.0
              height: 40                  //（可选项）数字类型；列表项的高度，默认：40.0
            },
            indicator: {                    //（可选项）JSON对象；右侧字母导航条样式
              bgColor: 'rgba(0,0,0,0)',            //（可选项）字符串类型；字母导航条背景色，支持 rgb、rgba、#，默认：'#FFFFFF'
              color: '#414141'            //（可选项）字符串类型；字母导航条字母颜色，支持 rgb、rgba、#，默认：'#696969'
            }
          },
          currentCity: that.city,
          hotTitle: '热门城市',
          fixedOn: api.frameName
        }, function(ret, err) {
          if (ret) {
            that.isCityShow = true
            if (ret.eventType == 'selected') {
              that.city = ret.cityInfo.city
              UICityList.close()
              that.showHead = false
              var map = api.require('bMap');
              map.getCoordsFromName({
                city: that.city,
                address: that.city
              }, function(ret, err) {
                console.log(JSON.stringify(ret))
                if (ret.status) {
                  that.lon = ret.lon
                  that.lat = ret.lat
                  console.log(that.lon, that.lat)
                  that.upCallback(that.mescrollUp.page, that.mescroll)
                }
              });
            }
          } else {
            console.log(JSON.stringify(err))
          }
        })
      } else {
        this.$vux.toast.text('请手动开启定位!')
      }
    },
    seller(id){
      console.log(id)
      this.$router.push({
        name:'seller',
        query:{
          id:id
        }
      })
    },
    handChange (key){
      this.active = key
      this.suggest = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    getInfo () {
      apiHttp.underIndex().then(res=>{
        if(res.code === 0){
          this.list1=res.data
        }
        this.$nextTick(() => {
          this.mescroll.endSuccess(this.list1, false)
        })
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.$http.post('/mall/oto/shops-list',{lng:this.lon,lat:this.lat,disType: this.active, page: page.num}).then(res => {
        if (res.code === 0) {
          let arr = res.data.shopList === '' ? [] : res.data.shopList
          if (page.num === 1) this.suggest = []
          this.suggest = this.suggest.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.shopList.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.finish = false
      this.mescrollUp.page.num = 1
      this.getInfo()
      let that = this
      var bMap = api.require('bMap')
      bMap.getLocation({
        accuracy: '100m',
        autoStop: true,
        filter: 1
      }, (ret, err) => {
        if (ret.status) {
          if (api.systemType === 'ios') {
            // 初始化百度地图引擎，本接口仅支持 iOS 平台，android平台不需要初始化
            bMap.initMapSDK((ret1) => {
              if (ret1.status) {
                this.getNameFromCoords(bMap, ret)
              }
            })
          } else {
            this.getNameFromCoords(bMap, ret)
          }
        } else {
          that.isDingwei = false
          that.upCallback(that.mescrollUp.page, that.mescroll)
        }
      })
    },
    /*
    *  根据经纬度获取当前位置
    * */
    getNameFromCoords (bMap, coordinate) {
      bMap.getNameFromCoords({
        lon: coordinate.lon,
        lat: coordinate.lat
      }, (ret, err) => {
        if (ret.status) {
          this.city = ret.streetName
          this.lon = ret.lon
          this.lat = ret.lat
          this.upCallback(this.mescrollUp.page, this.mescroll)
        }
      })
    },
    handleScroll (mescroll, y, isUp) {
      let that = this
      if (that.isIos) {
        return
      }
      if (y >= that.$refs.mate.offsetHeight) {
        that.$refs.tabBox.className = 'tabBox fixedTop'
      } else {
        that.$refs.tabBox.className = 'tabBox'
      }
    },
    // 扫码
    handleQrcode () {
      var FNScanner = api.require('FNScanner');
      let This = this
      FNScanner.open({
        autorotation: true
      }, function(ret, err) {
        if (ret.eventType == 'success') {
          console.log(ret.content);
          apiHttp.underQrcodeSecc(ret.content).then(res => {
            if (res.code === 0) {
              if (res.data.type === 'sadmin') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallPayUnder',
                  query: {spid: res.data.spid, price: res.data.price}
                })
              } else if (res.data.type === 'coupon') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallUnderCancel',
                  query: {spid: res.data.spid, id: res.data.id}
                })
              } else if (res.data.type === 'goods') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallHomeDetail',
                  query: {title: res.data.goodsId}
                })
              } else if (res.data.type === 'shops' && res.data.model === 'bbc') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallSeller',
                  query: {spid: res.data.spid}
                })
              } else if (res.data.type === 'shops' && res.data.model === 'oto') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallUnderdetail',
                  query: {spid: res.data.spid}
                })
              } else if (res.data.type === 'order') {
                This.$router.push({
                  name: 'mallOff_order_detail',
                  query: {orderId: res.data.orderId, bdelete: res.data.bdelete}
                })
              }
            }
          })
        } else {
          console.log(JSON.stringify(err));
        }
      })
    },
    getDesign () {
      if (this.$isMallShop) {
        this.$http.post('/amoy/app/design', {
          type: 1,
          site_type: 1,
          version: api.appVersion,
          device: (api.systemType === 'android') ? 1 : 2
        }, true, true).then(res => {
          if (res.code === 0) {
            if (res.data.footer) {
              this.$store.commit('setMallFooter', JSON.parse(res.data.footer))
            }
            if (res.data.content) {
              this.$store.commit('setMallContent', JSON.parse(res.data.content))
            }
            let content = JSON.parse(res.data.content)
            if (res.data.content) {
              for (let i = 0; i < content.length; i++) {
                if (content[i].name === 'edit-mall-header') {
                  this.$store.commit('setMallSearch', content[i].params)
                }
                if (content[i].name === 'edit-mall-hot-search') {
                  this.$store.commit('setMallHot', content[i].params)
                }
              }
            }
          }
        })
      }
    }
  },
  mounted () {
    this.getDesign()
    // this.refresh()
  }
}
</script>

<style lang="less">
  .UnderIndex{
    .addressBox{
      .home_seach_left{
        width: auto !important;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
        p{
          display: flex;
          align-items: center;
          img{
            width: 0.2rem;
            margin-left: 0.06rem;
          }
        }
      }
      .home_seach_input{
        flex: 1;
      }
    }
    .homeBack{
      position: fixed;
      right: 0.34rem;
      bottom: 146px;
      width: 36px;
      height: 36px;
      z-index: 9990;
    }
    .cityList{
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        position: absolute;
        left: 0.3rem;
        height: 100%;
        display: flex;
        align-items: center;
        i{
          font-size: 0.4rem;
        }
      }
      span{
        font-size: 0.3rem;
      }
    }
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: 1.08rem;
      bottom: 43px;
      height: auto !important;
      .swiper-pagination{
        bottom: 10px;
        width: 100%;
        margin:0 auto;
        left: 0;
      }
      .tabBox{
        width: 100%;
        z-index: 1000;
        background: #fff;
        margin-top: .1rem;
      }
      .fixedTop{
        position: fixed;
        top: 1.2rem;
      }
      .sticky{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
      }
    }
  }
  .swiper-banner{
    bottom: 10px;
    position: absolute;
    z-index: 333;
    width: 100%;
    text-align: center;
  }
  .my-bullet{
    border-radius: .1rem;
    width: .1rem;
    height: .1rem;
    margin: .05rem;
    display:inline-block;
    background:rgba(0,0,0,0.20);
    display: inline-block;
  }
  .my-bullet-active{
    display: inline-block;
    background:#fc3357;
    width: .2rem
  }
  .Bindex ._v-container{
    top:0.9rem;
    height: calc(100% - 0.9rem) !important;
  }
  .back_top{
    position: fixed;
    bottom:1rem;
    right: 0.35rem;
  }
  .back_top>img{
    width: 0.74rem;
    height: 0.74rem;
  }
</style>
