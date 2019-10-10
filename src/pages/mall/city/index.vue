<template>
  <div id="app" style="font-size: 14px;color: #292929;font-family: '微软雅黑'">
    <div v-show="isShowCitys" class="city">
      <div style="text-align: center;position: fixed;top: 0;height: 32px;width:100%;line-height: 32px;z-index: 300;background-color: #FFF;box-shadow: 0 0 2px rgba(0,0,0,.2)
              ">
        我的城市：&nbsp;&nbsp;<span id="qyxs" style="color:#FF0000">{{location}}</span>
      </div>
      <div class="city-wrapper city-wrapper-hook">
        <div class="scroller-hook">
          <div class="cities cities-hook">
            <div v-for="i in cityData" :key="i">
              <div class="title">{{i.name}}</div>
              <ul>
                <li v-for="(item, index) in i.cities" :key="index" class="item city-click" :data-name="item.name" :data-id="item.code"><span class="border-1px name" @touchend="touchUp(item)"  @touchstart="chooseCity()">{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="shortcut shortcut-hook" style="right: 50px;top:100px !important;" @touchstart="touchIndex">
          <ul style="width: 100px;text-align: left;padding: 20px 0">
            <li v-for="i in cityData" :data-anchor="i.name" class="item" :key="i">{{i.name.substr(0, 1)}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="toast" v-show="toastShow">
      {{toastText}}
    </div>
  </div>
</template>

<script>
import {cityData} from './city'
// import BScroll from './bscroll.min'
export default {
  name: 'city',
  components: {},
  data () {
    return {
      origin: 'http://192.168.99.205:800',
      captchaBoxShow: false,
      test: '测试',
      countTime: 0,
      countTimer: null,
      time: 60,
      location: '定位中',
      submit: {
        sms_captcha: '',
        captcha: '',
        area_code: '',
        _token: ''
      },
      cityWrapper: document.querySelector('.city-wrapper-hook'),
      cityScroller: document.querySelector('.scroller-hook'),
      cities: document.querySelector('.cities-hook'),
      shortcut: document.querySelector('.shortcut-hook'),
      shortcutList: [],
      cityData: cityData, // 数据源
      scroll: null,
      anchorMap: {},
      touch: {},
      toastShow: false,
      isShowCitys: true,
      toastText: ''
    }
  },
  methods: {
    toast (str) {
      let v = this
      v.toastText = str
      v.toastShow = true
      setTimeout(function(){
        v.toastShow = false
      }, 1500)
    },
    chooseCity (city) {
      let v = this
      v.countTime = 0
      v.countTimer = setInterval(function(e){v.countTime ++},1)
    },
    touchUp (item) {
      let v = this
      clearInterval(v.countTimer)
      if (v.countTime < 10) {
        this.location = item.name
        this.submit.area_code = item.code
      }
    },
    geocoder_CallBack: function (data) {
      let v = this
      var adcode3     = data.regeocode.addressComponent.adcode;
      var address     = data.regeocode.formattedAddress; //返回地址描述
      var csqy        = data.regeocode.addressComponent.district; //地区
      var csadcode    = data.regeocode.addressComponent.adcode; //区域编码
      this.submit.area_code = csadcode
      var citycode2   = csadcode.substr(0, 4) + "00"; //省份编码
      var codes       = adcode3.substr(0, 4) + "00";
      var citys2      = data.regeocode.addressComponent.city;
      var poiArr      = data.regeocode.pois; //坐标
      var resultCount = poiArr.length;
      v.location      = csqy
      var dz          = data.regeocode.formattedAddress;
      var lng         = data.regeocode.roads[0].location.lng;
      var lat         = data.regeocode.roads[0].location.lat;
    },
    initCities: function () {
      let v = this
      let y = 0;
      var titleHeight = 28
      var itemHeight = 44
      v.cityData.forEach(function(e){
        let name = e.name.substr(0, 1)
        let len = e.cities.length
        v.anchorMap[name] = y
        y -= titleHeight + len * itemHeight
      })
      v.shortcut = document.querySelector('.shortcut-hook')
      v.cityWrapper = document.querySelector('.city-wrapper-hook')
      v.shortcut.style.top = (v.cityWrapper.clientHeight - v.shortcut.clientHeight) / 2 + 'px';
      v.scroll = new window.BScroll(v.cityWrapper, {
        probeType: 3
      })
      // console.log(v.scroll, 'v.scroll')
      // v.scroll.hasVerticalScroll = true
      // v.scroll.wrapperHeight = $('body').height()
      v.scroll.scrollTo(0, 0);
    },
    touchIndex: function (e) {
      // console.log(e, 'e')
      let v = this
      let anchor = e.target.getAttribute('data-anchor')
      // console.log(anchor ,'anchor')
      let firstTouch = e.touches[0]
      v.touch.y1 = firstTouch.pageY
      v.touch.anchor = anchor
      v.scrollTo(anchor)
    },
    scrollTo: function (anchor) {
      let v = this
      v.cityScroller = document.querySelector('.scroller-hook')
      var maxScrollY = v.cityWrapper.clientHeight - v.cityScroller.clientHeight
      var y = Math.min(0, Math.max(maxScrollY, v.anchorMap[anchor]))
      if (typeof y !== 'undefined') {
        v.scroll.scrollTo(0, y);
      }
    },
  },
  mounted: function () {
    let v = this
    v.initCities()
  }
}
</script>

<style scoped lang="less">
@import './reset.css';
@import './city.css';
* {
  margin: 0;
  padding: 0;
}
.mycity {
  text-align: center;
  font-size: 12px;
  margin: 20px 0;
}
.list-box {
  padding: 0 43px;
}
.list-item {
  height: 43px;
  line-height: 42px;
  border-bottom: 1px solid #ECECEC;
  text-align: center;
}
.list-item input {
  border:none;
  text-align: center;
  outline: none;
}
.small-icon {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top:45%;
  transition:all .5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color:#FFF;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 150px;
}
.cities{
  div:first-of-type{
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 2rem;
        height: 0.80rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 !important;
        span:after{
          display: none;
        }
      }
    }
  }
}
</style>
