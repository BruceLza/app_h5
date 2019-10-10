<template>
  <div class="result">
    <div class="header">
      <i class="iconfont icon-back" @click="goBack()"></i>
      <div class="searchBox">
        <i class="iconfont icon-search" :style="{color: $store.state.global.theme.mainColor}" ></i>
        <input placeholder="请输入关键字" v-model="value" @keyup.enter="reset" />
      </div>
      <span @click="reset" :style="{color: $store.state.global.theme.mainColor}" >搜索</span>
    </div>
    <tab :line-width="2" custom-bar-width=".8rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type" class="resultTab" v-if="isTab">
      <tab-item @on-item-click="tabClick(0)">淘宝</tab-item>
      <tab-item @on-item-click="tabClick(1)">京东</tab-item>
      <tab-item @on-item-click="tabClick(2)">拼多多</tab-item>
    </tab>
    <div class="rank">
      <tab class="tab resultTab" :line-width="0" v-model="nowIndex" :active-color="$store.state.global.theme.mainColor" default-color="#333">
        <tab-item :selected="nowIndex === 0" @on-item-click="isMultiple()">
        <div class="sortContentImg">
          {{sortName}}
          <div class="sortImg" v-if="sort === '' || sort === 6 || sort === 7"></div>
          <div class="sortImgActive" v-else></div>
        </div>
        </tab-item>
        <tab-item :selected="nowIndex === 1" @on-item-click="changeList(2)">销量</tab-item>
        <tab-item v-if="nowIndex !== 2" class="tab_price">
          <p><span>价格</span><span class="sj"><i></i><i></i></span></p>
        </tab-item>
        <tab-item v-if="nowIndex === 2" class="tab_price" :selected="nowIndex === 2" @on-item-click="tabon">
          <p v-show="tab_on === 0"><span>价格</span><span class="sj shang" :style="{borderBottomColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
          <p v-show="tab_on === 1"><span>价格</span><span class="sj xia" :style="{borderTopColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
        </tab-item>
        <tab-item :selected="nowIndex === 3" @on-item-click="changeList(8)">筛选</tab-item>
      </tab>
      <div class="multiple" v-if="multiple">
        <div class="multipleItem" :class="{multipleActive: sort == ''}" @click="changeList('')" >综合排序</div>
        <div class="multipleItem" :class="{multipleActive: sort == 6}" @click="changeList(6)">佣金比例由高到低</div>
        <div class="multipleItem" :class="{multipleActive: sort == 7}" @click="changeList(7)">佣金比例由低到高</div>
      </div>
      <div class="more">
        <!--<i class="iconfont icon-sort" @click="styles = !styles" :style="{color: $store.state.global.theme.mainColor}" ></i>-->
        <img src="../../assets/img/home/style1.png" alt="" v-if="styles"  @click="styles = !styles">
        <img src="../../assets/img/home/style2.png" alt="" v-else  @click="styles = !styles">
      </div>
      <div class="filtrateBox" v-if="isFiltrate">
        <i class="filtrateTopSolid"></i>
        <div class="screen">
          <img src="../../assets/img/coupon.png" alt="" class="coupon"><p class="name">仅显示优惠券商品</p>
          <inline-x-switch title="switch" v-model="coupon" @on-change="changeCoupon" :value-map="map"></inline-x-switch>
        </div>
        <p class="filtrateItemTitle">价格区间（元）</p>
        <div class="filtrateItemBox">
          <div class="minimumPriceBox">
            <input placeholder="最低价" v-model="minimumPrice" />
          </div>
          <i class="priceSolid"></i>
          <div class="topPriceBox">
            <input placeholder="最高价" v-model="topPrice" />
          </div>
        </div>
        <div class="resetAndYes">
          <div class="resetBtn" @click="resetMinMax()">重置</div>
          <div class="yesBtn" @click="reset">确定</div>
        </div>
      </div>
    </div>
    <div class="insideAndOuter" v-if="type == 0">
      <div class="insideBtn" v-if="isInsideOuter" @click="isInsideAndOuter()">切换站内搜</div>
      <div class="outerBtn" v-if="!isInsideOuter" @click="isInsideAndOuter()">切换全网搜</div>
    </div>
    <div class="list" :style="{top:listTop + 'px'}">
      <div class="multipleZhe" v-if="multiple" @click="multiple = !multiple"></div>
      <div class="multipleZhe" v-if="isFiltrate" @click="isFiltrate = !isFiltrate"></div>
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="noGoods" v-if="info">{{info}}</div>
        <goods-item v-bind:list = list v-bind:styles=!styles @detail="detail"></goods-item>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, InlineXSwitch} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'results',
  components: {
    Tab,
    TabItem,
    MescrollVue,
    GoodsItem,
    InlineXSwitch
  },
  data () {
    return {
      info: '',
      nowIndex: 0,
      tab_on: 0,
      tab_on_ticket: 0,
      value: '',
      list: [],
      page: 1,
      finish: false,
      sort: '',
      coupon: 1,
      map: [0, 1],
      loading: false,
      interface: ['/amoy/taobao/quanwang', '/amoy/jd/search', '/amoy/pdd/search','/amoy/taobao/zhannei'],//0 淘宝全网搜 1京东 2拼多多 3淘宝站内
      type: Number(this.$route.query.type),
      styles: true,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹
      isInsideOuter: true, //全网 站内切换 true是全网
      minimumPrice: '', //最低价
      topPrice: '', //最高价
      isFiltrate: false, //筛选
      listTop: 118, //商品列表距离顶部
      isUrlIndex: 0,
      multiple: true,
      sortName: '综合',
      isTab: true
    }
  },
  watch: {
    '$route' (to, from) {
      if (from.name === 'results' && to.name === 'results') {
        let search = this.$route.query.search.replace(/%/g, '%25')
        let keyword = decodeURIComponent(search)
        if (this.value !== keyword) {
          this.value = keyword
          this.type = Number(this.$route.query.type)
          if(this.type == 0) {
            this.isUrlIndex = 0
          } else if(this.type == 1) {
            this.isUrlIndex = 1
          } else if(this.type == 2) {
            this.isUrlIndex = 2
          }
          this.tab_on = 0
          this.tab_on_ticket = 0
          this.nowIndex = 0
          this.sort = ''
          this.reset()
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.name === 'results' && from.name !== 'supergoods') {
        let search = vm.$route.query.search.replace(/%/g, '%25')
        vm.value = decodeURIComponent(search)
        vm.type = Number(vm.$route.query.type)
        if(vm.type == 0) {
          vm.isUrlIndex = 0
        } else if(vm.type == 1) {
          vm.isUrlIndex = 1
        } else if(vm.type == 2) {
          vm.isUrlIndex = 2
        }
        vm.tab_on = 0
        vm.tab_on_ticket = 0
        vm.nowIndex = 0
        vm.sort = ''
        vm.reset()
      }
      if (to.name === 'results' && from.name === 'supergoods') {
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
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'supergoods' && from.name === 'results') {
      if (this.mescroll) {
        this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
      }
    }
    if (this.mescroll) {
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
    }
    next()
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post(this.interface[this.isUrlIndex], {
        page: page.num,
        keyword: this.value,
        sort: this.sort,
        price_min: this.minimumPrice,
        price_max: this.topPrice,
        isCoupon: this.coupon
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          this.info = res.info
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
            if (this.scrollH && p === 1) {
              this.mescroll.scrollTo(this.$refs.recommend.offsetTop)
            }
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    backTop () {
      setTimeout(() => {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }, 10)
    },
    isYouHuiQuan() {
      this.$http.post('/amoy/home/isyouhuiquan', {}, true, true).then((res) => {
        if (res.code === 0) {
          this.coupon = res.data
        }
      })
    },
    detail (item) {
      let types
      if (this.type === 0) {
        types = 11
      } else if (this.type === 1) {
        types = 21
      } else if (this.type === 2) {
        types = 31
      }
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + types + '&id=' + item.origin_id + '&i=0')
    },
    changeList (sort) {
      if(sort == 8) {
        this.sort = sort
        this.multiple = false
        this.isFiltrate = !this.isFiltrate
      } else {
        if(sort == ''){
          this.sortName = '综合'
        } else if(sort == 6){
          this.sortName = '佣金'
        } else if(sort == 7){
          this.sortName = '佣金'
        }
        this.sort = sort
        this.isFiltrate = false
        this.reset()
      }
    },
    changeCoupon () {
      this.reset()
    },
    reset () {
      let keyCode = this.value
      if (keyCode === '') {
        this.$vux.toast.text('请输入关键词')
        return
      }
      if(this.type == 0 ) {
        this.listTop = 128
      } else {
        this.listTop = 88
      }
      this.isFiltrate = false
      let key = utils.storage.get('keyword')
      if (key) {
        const index = key.indexOf(keyCode)
        if (index !== -1) {
          key.splice(index, 1)
        }
        key.unshift(keyCode)
      } else {
        key = []
        key.unshift(keyCode)
      }
      this.multiple = false
      key = key.slice(0, 10)
      utils.storage.set('keyword', key)
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.info = ''
      // this.upCallback(this.mescrollUp.page, this.mescroll)
      this.mescroll.resetUpScroll()
    },
    tabon () {
      if (this.tab_on === 1) {
        this.tab_on = 0
        this.sort = 4
        this.reset()
      } else {
        this.tab_on = 1
        this.sort = 5
        this.reset()
      }
    },
    tabTicket () {
      if (this.tab_on_ticket === 1) {
        this.tab_on_ticket = 0
        this.sort = 2
        this.reset()
      } else {
        this.tab_on_ticket = 1
        this.sort = 3
        this.reset()
      }
    },
    tabClick (index) {
      if (index == 0 && this.isInsideOuter) {
        this.isUrlIndex = 0
      } else if (index == 0 && !this.isInsideOuter) {
        this.isUrlIndex = 3
      } else if (index == 1) {
        this.isUrlIndex = 1
      } else if (index == 2) {
        this.isUrlIndex = 2
      }
      this.resetMinMax()
      this.reset()
    },
    isInsideAndOuter () {
      this.isInsideOuter = !this.isInsideOuter
      this.tabClick(0)
    },
    resetMinMax() {
      this.minimumPrice = ''
      this.topPrice = ''
    },
    isMultiple() {
      this.isFiltrate = false
      this.multiple = true
    },
    handleScroll() {
      if(this.mescroll.getScrollTop()>300){
        if(this.type == 0){
          this.listTop = 84
          this.isTab = false
        } else {
          this.listTop = 44
          this.isTab = false
        }
      } else {
        if(this.type == 0){
          this.listTop = 128
          this.isTab = true
        } else {
          this.listTop = 88
          this.isTab = true
        }
      }
    }
  },
  activated () {
    this.isYouHuiQuan()
    window.addEventListener('scroll', this.handleScroll, true);
    // 删除
    this.value = this.value === '' ? decodeURIComponent(this.$route.query.search) : this.value
    // this.type = Number(this.$route.query.type)
    // console.log(this.type)
  }
}
</script>
<style lang="less">
  .result{
    .resultTab{
      .vux-tab-item{
        font-size: .26rem;
      }
    }
    .rank{
      .tab{
        .vux-tab-item{
         background: none;
        }
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .result{
    height: 100%;
    position: relative;
    .header{
      position: absolute;
      left: 0;
      top: -0.88rem;
      width: 100%;
      z-index: 999;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: .88rem;
      background: #fff;
      .icon-back{
        font-size: .4rem;
        color: #000;
        margin-top: .02rem;
      }
      .searchBox{
        width: 5.5rem;
        height: .6rem;
        border-radius: .3rem;
        background: #efefef;
        display: flex;
        align-items: center;
        padding-left: .3rem;
        .icon-search{
          font-size: .27rem;
          color: @theme-col;
        }
        input{
          background: #efefef;
          margin-left: .2rem;
          width: 4.8rem;
          font-size: .26rem;
          color: #999;
          outline: none;
          border: none;
        }
      }
      span{
        font-size: .3rem;
        color: @theme-col;
        margin-right: .2rem;
      }
    }
    /deep/.vux-tab{
      background: rgba(247,247,247,1);
    }
    /deep/.vux-tab .vux-tab-item{
      background: rgba(0, 0, 0, 0);
    }
    .rank{
      display: flex;
      align-items: center;
      height: 44px;
      position: relative;
      z-index: 100;
      background: #fff;
      .sortContentImg{
        display: flex;
        justify-content: center;
        align-items: center;
        .sortImg{
          margin-left: 0.1rem;
          border-left: 0.1rem solid rgba(0, 0, 0, 0);
          border-right: 0.1rem solid rgba(0, 0, 0, 0);
          border-top: 0.1rem solid #FF0036;
        }
        .sortImgActive{
          margin-left: 0.1rem;
          border-left: 0.1rem solid rgba(0, 0, 0, 0);
          border-right: 0.1rem solid rgba(0, 0, 0, 0);
          border-top: 0.1rem solid #666666;
        }
      }
      /deep/.vux-tab{
        background: rgba(255,255,255,1);
      }
      .vux-tab-wrap{
        flex: 1;
        z-index: 100;
      }
      .multiple{
        position: absolute;
        // bottom: -2.64rem;
        top: 44px;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 1001;
        .multipleActive{
          color: #FF0036;
        }
        div{
          width: 7.1rem;
          box-sizing: border-box;
          margin: auto;
          border-top: 0.01rem solid #EEE;
          font-size: .28rem;
          font-weight: 500;
          color: #666;
          height: .9rem;
          line-height: .9rem;
          padding-left: .1rem;
        }
        .select{
          color: #FF2556;
        }
      }
      .more{
        background: #fff;
        position: relative;
        z-index: 100;
        height: 44px;
        display: flex;
        align-items: center;
        padding: 0 .2rem;
        .icon-sort{
          font-size: .4rem;
          color: @theme-col;
        }
        img{
          width: 0.3rem;
        }
      }
      .more:before{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 9px;
        top: 9px;
        height: 26px;
        border-left: 1px solid #C7C7C7;
        color: #C7C7C7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
      }
      .filtrateBox{
        position: absolute;
        width: 100%;
        height: 3.6rem;
        background: #fff;
        top: 44px;
        .filtrateTopSolid{
          display: block;
          width: 7.1rem;
          margin: auto;
          border-top: 0.01rem solid #EEE;
        }
        .screen{
          margin-top: 0.45rem;
          background: #fff;
          padding: 0 0.22rem 0 0.27rem;
          display: flex;
          height: 30px;
          align-items: center;
          .coupon{
            width: .26rem;
            height: .26rem;
            margin-right: .1rem;
          }
          .name{
            font-size: .24rem;
            color: #999;
            flex: 1;
          }
          .weui-switch, .weui-switch-cp__box{
            width: 42px;
            height: 22px;
          }
          .weui-switch:before, .weui-switch-cp__box:before{
            width: 40px;
            height: 20px;
          }
          .weui-switch:after, .weui-switch-cp__box:after{
            width: 20px;
            height: 20px;
          }
          .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
            background: @theme-col;
            border-color: @theme-col;
          }
        }
        .filtrateItemTitle{
          width: 100%;
          margin-top: 0.2rem;
          box-sizing: border-box;
          padding-left: 0.27rem;
          padding-right: 0.22rem;
          font-size: 0.26rem;
          line-height: 0.32rem;
          font-size: 500;
          text-align: left;
          color: #666666;
        }
        .filtrateItemBox{
          width: 100%;
          height: 1.16rem;
          margin-bottom: 0.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .minimumPriceBox, .topPriceBox{
            width: 2rem;
            height: 0.56rem;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: 0.01rem solid rgba(222,222,222,1);
            border-radius: 0.28rem;
          }
          .minimumPriceBox input, .topPriceBox input{
            background: #fff;
            margin-left: .1rem;
            margin-right: 0.1rem;
            width: 1.8rem;
            font-size: .28rem;
            font-weight: 400;
            text-align: center;
            color: #999;
            outline: none;
            border: none;
          }
          .minimumPriceBox{
            input {
            }
          }
          i.priceSolid{
            display: block;
            width: 0.8rem;
            height: 0.02rem;
            background: #DEDEDE;
            border-radius: 0.01rem;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
          }
          .topPriceBox{
            input {
            }
          }
        }
        .resetAndYes{
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 0.8rem;
          display: flex;
          .resetBtn, .yesBtn{
            flex: 1;
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.8rem;
            color: #fff;
            text-align: center;
          }
          .resetBtn{
            background: linear-gradient(-90deg,rgba(241,154,56,1),rgba(246,197,67,1));
          }
          .yesBtn{
            background: linear-gradient(-90deg,rgba(255,0,54,1),rgba(255,114,0,1));
          }
        }
      }
    }
    .insideAndOuter{
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 40px;
      background: #fff;
      .insideBtn, .outerBtn{
        width: 6.9rem;
        height: 0.5rem;
        margin: auto;
        margin-bottom: 0.1rem;
        box-sizing: border-box;
        border-radius: 0.25rem;
        font-size: 0.28rem;
        font-weight: 500;
        color: #FF0036;
        line-height: 0.5rem;
        text-align: center;
      }
      .insideBtn{
        border: 0.01rem solid rgba(230,0,18,1);
        color: #FF0036;
      }
      .outerBtn{
        background: #FF0036;
        color: #FFFFFF;
      }
    }
    .tab_price{
      position: relative;
      font-size: var(--font-mid-size);
      color: #666666;
      p{
        font-size: .26rem;
      }
      span{
        font-size: 14px;
      }
      .sj{
        position: absolute;
        right: 15px;
        top: 14px;
        i{
          display: block;
        }
        i:nth-of-type(1){
          width: 0;
          height:0;
          border-left:3px solid transparent;
          border-right: 3px solid transparent;
          border-bottom: 5px solid #666666;
        }
        i:nth-of-type(2){
          width: 0;
          height:0;
          margin-top:5px;
          border-left:3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 5px solid #666666;
        }
      }
      .shang i:nth-of-type(1){
        border-bottom: 5px solid @theme-col!important;
      }
      .xia i:nth-of-type(2){
        border-top: 5px solid @theme-col!important;
      }
    }
    ._v-container{
      top: 98px;
    }
    .screen{
      background: #fff;
      padding: 0 .2rem;
      display: flex;
      height: 30px;
      align-items: center;
      .coupon{
        width: .26rem;
        height: .26rem;
        margin-right: .1rem;
      }
      .name{
        font-size: .24rem;
        color: #999;
        flex: 1;
      }
      .weui-switch, .weui-switch-cp__box{
        width: 42px;
        height: 22px;
      }
      .weui-switch:before, .weui-switch-cp__box:before{
        width: 40px;
        height: 20px;
      }
      .weui-switch:after, .weui-switch-cp__box:after{
        width: 20px;
        height: 20px;
      }
      .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
        background: @theme-col;
        border-color: @theme-col;
      }
    }
    .list{
      position: absolute;
      top: 118px;
      bottom: 0;
      width: 100%;
      .multipleZhe{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 3;
        background: rgba(0, 0, 0, 0.6);
      }
      .noGoods{
        background: #f7f7f7;
        font-size: 0.24rem;
        color: #666666;
        padding: 0.5rem 0;
        text-align: center;
      }
      .goods_list_2, .goods_list_1 {
        height: calc(100% - 1.2rem);
        ul{
          height: 100%;
          overflow: auto;
        }
      }
      .share{
        font-size: .32rem;
        color: @theme-col;
      }
    }
  }
</style>
