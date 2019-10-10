<template>
  <div class="exist">
    <x-header v-show="isHandle" :left-options="{showBack: false}"><a slot="left"  class="backBox">
      <i class="iconfont icon-back" @click="goBack()"></i></a>
      生活优惠券
    </x-header>
    <div class="tabsBox">
      <tab :line-width="1" custom-bar-width=".8rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type" class="resultTab" v-show="tabList" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
        <tab-item @on-item-click="resetTab" v-for="(item, index) in tabList" :key="'existtab'+index">{{item.name}}</tab-item>
      </tab>
      <tab :line-width="0" custom-bar-width=".8rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="twoTypeIndex" class="twoTab" v-show="twoTabList" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
        <tab-item @on-item-click="isAll"><div class="imgBox"><img src="../../assets/img/my/exist.png" alt=""></div><p>全部</p></tab-item>
        <tab-item @on-item-click="reset" v-for="(item, index) in twoTabList" :key="'existtab'+index"><div class="imgBox"><img :src="item.logo" alt=""></div><p>{{item.name}}</p></tab-item>
      </tab>
    </div>
    <div class="list" ref="list">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="existListBox">
          <div class="existItemBox" v-for="(item,index) in list" :key="'existItemBox'+index">
            <div class="itemImg">
              <img :src="item.logo" alt="">
            </div>
            <div class="content">
              <p class="name">{{item.brand_name}}</p>
              <p class="title">{{item.sub_title}}</p>
              <p class="subTitle">{{item.title}}</p>
            </div>
            <div class="solidStyle">
              <div class="topbox"></div>
              <div class="contsolid"></div>
              <div class="bottombox"></div>
            </div>
            <div class="but" @click="togoo(item.id)">领取</div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, InlineXSwitch} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'results',
  components: {
    Tab,
    TabItem,
    MescrollVue,
    InlineXSwitch
  },
  data () {
    return {
      isHandle:true,
      all: true,
      list: [],
      tabList:'',
      twoTabList: '',
      page: 1,
      finish: false,
      type: 0,/* 点击的标题的index */
      twoTypeIndex: 0,
      mescroll: null,
      mescrollDown: {
      },
      mescrollUp: {
        callback: this.getTabs,
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
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  watch: {
    lastScrollTop: function (val) {
      console.log(val)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.name === 'results' && from.name !== 'supergoods') {
        vm.type = Number(vm.$route.query.type)
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
    next()
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll,brand_id,tab,isAll) {
      var This = this
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      let data = {m: 'quan',a: 'list',brand_id: brand_id,page: page.num}
      if(isAll){
        data = {m: 'quan',a: 'list',top: 1,type: tab,page: page.num}
      }
      this.$http.post('/amoy/home/living-circle', data, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
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
    resetTab() {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
      this.twoTypeIndex = 0
      this.all = true
    },
    reset () {
      this.all = false
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    isAll() {
      this.all = true
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
      this.twoTypeIndex = 0
    },
    getTabs(page, mescroll) {
      // 首页标签和轮播图 品牌
      var data = {m: 'brand',a: 'config'} /* res.data.types 所有的头部标签*/
      // var data = {m: 'brand',a: 'config',top: 1,type: 'chuxing'}/* type是某一个标题的所有品牌 */
      // var data = {m: 'quan',a: 'list',brand_id: 91,page: 1}/* 根据不同的品牌id调取不同的商品券 */
      this.$http.post('/amoy/home/living-circle', data, true, true).then((res) => {
        this.tabList = res.data.types
        this.getTwoTabs(res.data.types[this.type].type,page, mescroll,this.all)
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    getTwoTabs(tab,page, mescroll,isAll) {
      // 首页标签和轮播图 品牌
      // var data = {m: 'brand',a: 'config'} /* res.data.types 所有的头部标签*/
      var data = {m: 'brand',a: 'config',top: 1,type: tab}/* type是某一个标题的所有品牌 */
      // var data = {m: 'quan',a: 'list',brand_id: 91,page: 1}/* 根据不同的品牌id调取不同的商品券 */
      this.$http.post('/amoy/home/living-circle', data, true, true).then((res) => {
        this.twoTabList = res.data.brand
        if(isAll) {
          this.twoTypeIndex = 1
        }
        let brand_id = res.data.brand[this.twoTypeIndex - 1].id
        if(isAll) {
          this.twoTypeIndex = 0
        }
        this.upCallback(page, mescroll,brand_id,tab,isAll)
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    togoo(id) {
      let data = {m: 'quan',id: id}
      this.$http.post('/amoy/home/living-circle', data, true, true).then((res) => {
        console.log(res.data.url,'togooid')
            let browser = api.require('webBrowser')
            browser.open({
              url: res.data.url,
              titleBar: {
                textColor: '#333',
                bg: '#fff'
              }
            })
        // this.$router.push('/ticket?url=' + res.data.url+'&title='+res.data.sub_title)
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    handleScroll () {
      if (this.mescroll.getScrollTop() > 300) {
        this.isHandle = false
        this.$refs.list.style.top = 155 + 'px'
      } else {
        this.isHandle = true
        this.$refs.list.style.top = 205 + 'px'
      }
    }
  },
  activated () {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="less">
  .exist{
    .vux-header{
      position: relative !important;
    }
    .resultTab{
      .vux-tab-item{
        font-size: 0.3rem;
        background: none;
      }
    }
    .twoTab {
      position: relative;
      top: 0;
      height: 111px;
      display: flex;
      // justify-content: center;
      align-items: center;
      padding-top: 0;
      .vux-tab{
        padding-top: 0.5rem;
        padding-bottom: 0.2rem;
        .vux-tab-item{
          font-size: 0.28rem;
          line-height: 0.28rem;
          background: none;
          flex: 0 0 25%;
          .imgBox{
            width: 100%;
            max-width: 100%;
            height: 0.84rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 0.84rem;
            }
          }
          p {
            margin-top: 0.2rem;
          }
        }
      }
      .vux-tab-container{
        position: relative;
        height: auto;
        width: 100%;
        .vux-tab{
          height: auto;
        }
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .exist{
    height: 100%;
    position: relative;
    overflow: hidden;
    .tabsBox{
      position: relative;
      background: #fff;
      width: 100%;
    }
    .list{
      position: absolute;
      top: 205px;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: hidden;
      .existListBox{
        position: relative;
        overflow: hidden;
        width: 100%;
        .existItemBox{
          width: 6.9rem;
          height: 1.68rem;
          margin: auto;
          margin-top: 0.2rem;
          border-radius: 0.1rem;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          .itemImg{
            width: 1.1rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 0.7rem;
            }
          }
          .content{
            width: 3.84rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            .name{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.3rem;
              font-weight: 500;
              line-height: 0.32rem;
              height: 0.32rem;
              color: #333;
            }
            .title{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.3rem;
              font-weight: 500;
              height: 0.32rem;
              line-height: 0.32rem;
              color: #FF5847;
              margin-top: 0.1rem;
              margin-bottom: 0.1rem;
            }
            .subTitle{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.24rem;
              font-weight: 500;
              line-height: 0.26rem;
              height: 0.26rem;
              color: #999999;
            }
          }
          .solidStyle{
            width: 0.36rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .topbox{
              width: 0.36rem;
              height: 0.18rem;
              border-bottom-left-radius: 0.18rem;
              border-bottom-right-radius: 0.18rem;
              background: #F7F7F7;
            }
            .contsolid{
              flex: 1;
              width: 0;
              border-left: 1px dashed #EEEEEE;
              border-right: 1px dashed #EEEEEE;
            }
            .bottombox{
              width: 0.36rem;
              height: 0.18rem;
              border-top-left-radius: 0.18rem;
              border-top-right-radius: 0.18rem;
              background: #F7F7F7;
            }
          }
          .but{
            width: 1.54rem;
            height: 1.68rem;
            font-family:PingFang-SC-Medium;
            font-size: 0.32rem;
            font-weight: 500;
            line-height: 1.68rem;
            text-align: center;
            color: #E92626;
          }
        }
      }
    }
  }
</style>
