<template>
  <div id="otherclassify">
    <div class="header" :style="{paddingTop: statusH + 'rem',color: '#333',background: '#fff'}">
      <img class="goBackIcon" src="../../assets/img/home/jd/goBackIcon.png" alt="" @click="goUpVue()">
      <span>{{this.$route.query.title}}</span>
      <!-- <div class="searchBox" @click="jumpTo('/search?type=' + type)" :style="{background: $store.state.global.search.searchBgColor}">
        <img :src="$store.state.global.search.searchIcon" alt="">
        <p :style="{color:$store.state.global.search.color}">{{$store.state.global.search.searchPlaceholder}}</p>
      </div> -->
      <img class="searchIcon" src="../../assets/img/home/jd/searchIcon.png" alt="" @click="jumpTo('/search?type=' + type)">
    </div>
    <div ref="tabsOne" v-if="isTabTop">
      <div class="tabBox" v-if="$route.query.type === '21' || $route.query.type === '31'">
        <tab :line-width="0"  default-color="#333" v-model="categoryIndex" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
          <tab-item v-for="(item, index) of category" :key="item.id" @on-item-click="change(item.from_cid, index)" :selected="index===categoryIndex">{{item.title}}</tab-item>
        </tab>
        <!-- <div class="more">
          <i class="iconfont icon-sort" :style="{color:'#666'}"></i>
        </div> -->
        <transition name="showlist">
          <div class="moreBox" v-show="showMore">
            <div class="t"><span>全部分类</span><i class="iconfont icon-close" @click="showMore = false"></i></div>
            <div class="classify">
              <div class="classifyBox" v-for="(item, index) of category" :key="item.id" @click="change(item.from_cid, index)" >
                <img src="../../assets/img/home/meishi.png" alt="">
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="sortBox"  v-if="true">
        <div class="sort" @click="rank(9)">
          <span>{{sortName}}</span>
          <img src="../../assets/img/home/sort1.png" alt="" v-if="classifySort === 0 || classifySort === 3 || classifySort === 6">
          <img src="../../assets/img/home/sort2.png" alt="" v-else>
        </div>
        <div class="sort" @click="rank(5)">
          <!--<span>佣金比例</span>-->
          <!--<img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 8">-->
          <!--<img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 5">-->
          <!--<img src="../../assets/img/home/unsort.png" alt=""  v-else>-->
          <span>佣金比例</span>
          <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 7">
          <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 6">
          <img src="../../assets/img/home/unsort.png" alt=""  v-else>
        </div>
        <div class="sort" @click="rank(2)">
          <!--<span>券后价</span>-->
          <!--<img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 1">-->
          <!--<img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 2">-->
          <!--<img src="../../assets/img/home/unsort.png" alt=""  v-else>-->
          <span><span style="{padding: 0;margin: 0;}" v-if="this.$route.query.type === '21'">原</span>价格</span>
          <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 4">
          <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 5">
          <img src="../../assets/img/home/unsort.png" alt=""  v-else>
        </div>
        <div class="sort" @click="rank(4)">
          <span>销量</span>
          <!--<img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 7">-->
          <!--<img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 4">-->
          <!--<img src="../../assets/img/home/unsort.png" alt=""  v-else>-->
          <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 3">
          <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 2">
          <img src="../../assets/img/home/unsort.png" alt=""  v-else>
        </div>
        <div class="sort changeStyle">
          <img src="../../assets/img/home/style1.png" alt="" v-if="styles" @click="styles = !styles">
          <img src="../../assets/img/home/style2.png" alt="" v-else @click="styles = !styles">
        </div>
        <div class="multiple" v-if="multiple">
          <div @click="rank(0)" :class="{select: classifySort === 0}">综合排序</div>
          <div @click="rank(3)" :class="{select: classifySort === 3}">优惠券面值由高到低</div>
          <div @click="rank(6)" :class="{select: classifySort === 6}">优惠券面值由低到高</div>
        </div>
      </div>
    </div>
    <div class="list" :class="{over: showMore}"  :style="{top: statusH + 0.89 +'rem'}">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="dialog" v-if="showMore" @click="showMore = false"></div>
        <!-- <div class="swiperBox">
          <swiper  dots-position="center"  :show-desc-mask="false" :auto="true" :aspect-ratio="300/750" v-if="imgs.length > 0">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in imgs" :key="index">
              <img v-lazy="item.img"  :key="item.img" v-if="item.img" @click="navHttp(item)">
              <img v-lazy="item"  :key="item" v-else>
            </swiper-item>
          </swiper>
        </div> -->
        <template v-for="item of design" v-if="design && !cate">
          <edit-slide v-if="item.name === 'edit-slide' && slide"  :data="item.params" ref="editSlide" @swiperChange="swiperChange" :key="item.id" ></edit-slide>
          <component v-else-if="item.name !== 'edit-xf-button' && item.name !== 'edit-goods-slide' && item.name !== 'edit-slide' && item.name !== 'edit-header-category' && item.name !== 'edit-header'" v-bind:is="item.name" :data="item.params" :key="item.id"></component>
        </template>
      <div ref="tabsTwo" v-if="!isTabTop">
        <div class="tabBox" v-if="$route.query.type === '21' || $route.query.type === '31'">
          <tab :line-width="0"  default-color="#333" v-model="categoryIndex" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
            <tab-item v-for="(item, index) of category" :key="item.id" @on-item-click="change(item.from_cid, index)" :selected="index===categoryIndex">{{item.title}}</tab-item>
          </tab>
          <!-- <div class="more">
            <i class="iconfont icon-sort" :style="{color:'#666'}"></i>
          </div> -->
          <transition name="showlist">
            <div class="moreBox" v-show="showMore">
              <div class="t"><span>全部分类</span><i class="iconfont icon-close" @click="showMore = false"></i></div>
              <div class="classify">
                <div class="classifyBox" v-for="(item, index) of category" :key="item.id" @click="change(item.from_cid, index)" >
                  <img src="../../assets/img/home/meishi.png" alt="">
                  <span>{{item.title}}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="sortBox"  v-if="true">
          <div class="sort" @click="rank(9)">
            <span>{{sortName}}</span>
            <img src="../../assets/img/home/sort1.png" alt="" v-if="classifySort === 0 || classifySort === 3 || classifySort === 6">
            <img src="../../assets/img/home/sort2.png" alt="" v-else>
          </div>
          <div class="sort" @click="rank(5)">
            <!--<span>佣金比例</span>-->
            <!--<img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 8">-->
            <!--<img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 5">-->
            <!--<img src="../../assets/img/home/unsort.png" alt=""  v-else>-->
            <span>佣金比例</span>
            <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 7">
            <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 6">
            <img src="../../assets/img/home/unsort.png" alt=""  v-else>
          </div>
          <!--<div class="sort" @click="rank(2)">-->
            <!--<span>券后价</span>-->
            <!--<img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 1">-->
            <!--<img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 2">-->
            <!--<img src="../../assets/img/home/unsort.png" alt=""  v-else>-->
          <!--</div>-->
          <div class="sort" @click="rank(2)">
            <span><span style="{padding: 0;margin: 0;}" v-if="this.$route.query.type === '21'">原</span>价格</span>
            <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 4">
            <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 5">
            <img src="../../assets/img/home/unsort.png" alt=""  v-else>
          </div>
          <div class="sort" @click="rank(4)">
            <span>销量</span>
            <!--<img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 7">-->
            <!--<img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 4">-->
            <!--<img src="../../assets/img/home/unsort.png" alt=""  v-else>-->
            <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 3">
            <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 2">
            <img src="../../assets/img/home/unsort.png" alt=""  v-else>
          </div>
          <div class="sort changeStyle">
            <img src="../../assets/img/home/style1.png" alt="" v-if="styles" @click="styles = !styles">
            <img src="../../assets/img/home/style2.png" alt="" v-else @click="styles = !styles">
          </div>
          <div class="multiple" v-if="multiple">
            <div @click="rank(0)" :class="{select: classifySort === 0}">综合排序</div>
            <div @click="rank(3)" :class="{select: classifySort === 3}">优惠券面值由高到低</div>
            <div @click="rank(6)" :class="{select: classifySort === 6}">优惠券面值由低到高</div>
          </div>
        </div>
      </div>
      <div class="recommend" :style="{paddingTop: listTop + 'rem'}">
        <goods-item v-bind:list = list @detail="detail" v-bind:styles="!styles"></goods-item>
      </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
import EditSlide from '../../components/EditSlide'
import EditBlank from '../../components/EditBlank'
import EditRichText from '../../components/EditRichText'
import EditText from '../../components/EditText'
import EditImg from '../../components/EditImg'
import EditCube from '../../components/EditCube'
export default {
  name: 'otherclassifyNew',
  components: {
    Tab,
    TabItem,
    SwiperItem,
    Swiper,
    MescrollVue,
    GoodsItem,
    EditSlide,
    EditBlank,
    EditRichText,
    EditText,
    EditImg,
    EditCube
  },
  data () {
    return {
      sortName: '综合',
      multiple: false,
      classifySort: 0,
      styles: false,
      slide: true,
      listTop: '',
      statusH: '',
      showMore: false,
      num: 6,
      nowIndex: 0,
      tab_on: 0,
      tab_on_ticket: 0,
      imgs: {},
      category: [],
      categoryIndex: 0,
      cate: '',
      list: [],
      page: 1,
      finish: false,
      sort: 1,
      loading: false,
      state: '',
      keyword: '',
      url: this.$route.query.type === '21' ? '/amoy/jd/search' : '/amoy/pdd/search',
      type: Number(this.$route.query.type) === 21 ? 1 : 2,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.reset
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 8
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
      design: '',
      isTabTop: false,
      tabTwoTop: '',//导航栏距离顶部的距离
      shopType: '',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.name === 'otherclassify' && from.name !== 'supergoods') {
        vm.categoryIndex = 0
        vm.cate = ''
        vm.getSwiper()
        if (vm.$route.query.type === '21') {
          vm.url = '/amoy/jd/search'
          vm.type = 1
          vm.shopType = 2
          vm.getCategory(2)
          vm.getDesign(5)
        } else if (vm.$route.query.type === '31') {
          vm.url = '/amoy/pdd/search'
          vm.type = 2
          vm.shopType = 3
          vm.getCategory(3)
          vm.getDesign(6)
        }
        vm.reset()
      }
      if (to.name === 'otherclassify' && from.name === 'supergoods') {
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
    if (to.name === 'supergoods' && from.name === 'otherclassify') {
      this.category = this.category
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
    swiperChange (color) {
      console.log(color,'otherclassifynew')
    },
    navHttp (item) {
      if (item.url) {
        let browser = api.require('webBrowser')
        let url
        if (item.url.indexOf('http://') === 0 || item.url.indexOf('https://') === 0) {
          url = item.url
        } else {
          url = 'http://' + item.url
        }
        browser.open({
          url: url,
          titleBar: {
            textColor: '#333',
            bg: '#fff'
          }
        })
      }
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      if(this.cate) {
        this.isTabTop = true
        this.handleTop()
      } else if (page.num == 1) {
        this.isTabTop = false
        this.handleTop()
      }
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post(this.url, {
        page: page.num,
        cid: this.cate,
        sort: this.classifySort
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            console.log(page.num)
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
    getSwiper () {
      this.imgs = {}
      let arr = JSON.parse(utils.storage.get('slideInfo'))
      if (this.$route.query.type === '21') {
        if (arr.sys_21) {
          this.imgs = arr.sys_21
        }
      } else if (this.$route.query.type === '31') {
        if (arr.sys_31) {
          this.imgs = arr.sys_31
        }
      }
    },
    getCategory (type) {
      this.$http.post('/amoy/home/channel', {type: type}, false).then(res => {
        res.data.unshift({title: '全部', id: '', from_cid: ''})
        this.category = res.data
      })
    },
    getDesign (type) {
      var appVersion
      var systemType
      if(window.api) {
        appVersion = api.appVersion
        systemType = (api.systemType === 'android') ? 1 : 2
      } else {
        appVersion = ''
        systemType = ''
      }
      this.$http.post('/amoy/app/design', {type: type, version: appVersion, device: systemType}, false).then(res => {
        if(res.code == 0) {
          if(res.data.content) {
            this.design = JSON.parse(res.data.content)
          }
        }
      })
    },
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + this.$route.query.type + '&id=' + item.origin_id + '&i=0')
    },
    change (id, index) {
      this.categoryIndex = index
      this.showMore = false
      this.cate = id
      this.reset()
    },
    changeList (sort) {
      this.sort = sort
      this.reset()
    },
    reset () {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    tabon () {
      if (this.tab_on === 1) {
        this.tab_on = 0
        this.sort = 5
        this.reset()
      } else {
        this.tab_on = 1
        this.sort = 4
        this.reset()
      }
    },
    tabTicket () {
      if (this.tab_on_ticket === 1) {
        this.tab_on_ticket = 0
        this.sort = 9
        this.reset()
      } else {
        this.tab_on_ticket = 1
        this.sort = 8
        this.reset()
      }
    },
    rank (sort) {
      if (sort === 9) {
        this.multiple = !this.multiple
        // if (this.classifySort === 0) {
        //   this.multiple = true
        // } else {
        //   this.classifySort = sort
        //   this.mescroll.resetUpScroll()
        // }
      } else if (sort === 0) {
        this.multiple = false
        this.sortName = '综合'
        if (this.classifySort === 0) {
        } else {
          this.classifySort = sort
          this.mescroll.resetUpScroll()
        }
      } else if (sort === 3) {
        this.multiple = false
        this.sortName = '优惠券面'
        if (this.classifySort === 3) {
        } else {
          this.classifySort = sort
          this.mescroll.resetUpScroll()
        }
      } else if (sort === 6) {
        this.sortName = '优惠券面'
        this.multiple = false
        if (this.classifySort === 6) {
        } else {
          this.classifySort = sort
          this.mescroll.resetUpScroll()
        }
      } else if (sort === 5) {
        //原佣金比例
        // if (this.classifySort === 5) {
        //   this.classifySort = 8
        // } else {
        //   this.classifySort = 5
        // }
        // this.mescroll.resetUpScroll()
        //现佣金比例
        if (this.classifySort === 7) {
          this.classifySort = 6
        } else {
          this.classifySort = 7
        }
        this.mescroll.resetUpScroll()
      } else if (sort === 2) {
        //原券后价排序
        // if (this.classifySort === 2) {
        //   this.classifySort = 1
        // } else {
        //   this.classifySort = 2
        // }
        // this.mescroll.resetUpScroll()
        //现价格排序
        if (this.classifySort === 5) {
          this.classifySort = 4
        } else {
          this.classifySort = 5
        }
        this.mescroll.resetUpScroll()
      } else if (sort === 4) {
        //原销量排序
        // if (this.classifySort === 4) {
        //   this.classifySort = 7
        // } else {
        //   this.classifySort = 4
        // }

        //现销量排序
        if (this.classifySort === 3) {
          this.classifySort = 2
        } else {
          this.classifySort = 3
        }
        this.mescroll.resetUpScroll()
      }
    },
    handleScroll() {
      var that = this
      this.multiple = false
      if (that.$refs.tabsTwo) {
        that.tabTwoTop = that.$refs.tabsTwo.offsetTop
      }
      if(this.mescroll.getScrollTop() > that.tabTwoTop){
        that.isTabTop = true
        that.handleTop()
      } else if(this.mescroll.getScrollTop() < that.tabTwoTop){
        that.isTabTop = false
        that.handleTop()
      }
    },
    handleTop() {
      let size = (document.documentElement.clientWidth / 7.5)
      if(window.api) {
        this.statusH = (api.safeArea.top / size)
      } else {
        this.statusH = 0
      }
      if(this.isTabTop) {
        this.listTop = (88 / size)
      } else {
        this.listTop = 0
      }
    },
    goUpVue() {
      this.$router.go(-1)
    }
  },
  created () {
    this.handleTop()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  beforeDestroy() {
  }
}
</script>
<style lang="less">
@import "../../assets/less/common";
#otherclassify{
  .scrollable .vux-tab-item{
    flex: none;
    word-break: keep-all;
    float: left;
    width: auto;
  }
  /*.mescroll{*/
    /*height: 600px;*/
  /*}*/
}
</style>
<style  lang="less">
  .swiperBox {
    position: relative;
    .vux-swiper-item{
      img{
        width: 100%;
        height: 100%;
      }
    }
    .vux-slider{
      .vux-indicator{
        .vux-icon-dot{
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.4);
        }
        .active{
          background: rgba(255, 255, 255, 1) !important;
        }
      }
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
/deep/.vux-tab .vux-tab-item{
  padding: 0 0.15rem;
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  background: none;
  line-height: 0.9rem;
}
/deep/.vux-tab-container{
  box-sizing: border-box;
  padding-right: 0.2rem;
  border-bottom: 0.01rem solid rgba(173, 172, 171, 0.3);
}
#otherclassify{
  height: 100%;
  .tabBox{
    display: flex;
    align-items: center;
    height: 44px;
    position: relative;
    z-index: 100;
    background: #fff;
    border-bottom: 0.01rem solid rgba(173, 172, 171, 0.3);
    /deep/.vux-tab{
      height: 0.9rem;
      align-items: center;
    }
    /deep/.vux-tab .vux-tab-item.vux-tab-selected{
      height: 0.5rem;
      border-radius: 0.25rem;
      line-height: 0.5rem;
      color: #fff;
      background:linear-gradient(-90deg,rgba(255,108,3,1) 0%,rgba(255,6,51,1) 100%);
    }
    .vux-tab-wrap{
      flex: 1;
      z-index: 100;
    }
    .more{
      background: #fff;
      position: absolute;
      right: 0;
      z-index: 100;
      height: 0.86rem;
      box-sizing: border-box;
      // border-bottom: 0.01rem solid rgba(173, 172, 171, 0.5);
      display: flex;
      align-items: center;
      padding: 0 .2rem;
      .icon-sort{
        font-size: .4rem;
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
    .moreBox{
      position: absolute;
      top: 44px;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      z-index: 99;
      padding: .2rem .2rem;
      .t{
        overflow: hidden;
        span{
          font-size: .26rem;
          float: left;
        }
        i{
          float: right;
        }
      }
      .classify{
        .classifyBox{
          width: 15%;
          margin: .2rem 5%;
          float: left;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          img{
            width: .9rem;
            margin-bottom: .2rem;
          }
          span{
            font-size: .26rem;
          }
        }
      }
    }
  }
  .swiper-demo-img{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .header{
    position: relative;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .88rem;
    .searchIcon{
      position: relative;
      width: 0.34rem;
      height: 0.34rem;
      margin-right: 0.3rem;
      z-index: 1;
    }
    .goBackIcon{
      position: relative;
      width: 0.15rem;
      height: 0.28rem;
      margin-left: 0.2rem;
      z-index: 1;
    }
    span{
      position: absolute;
      display: block;
      width: 100%;
      height: 0.88rem;
      font-size: .34rem;
      font-weight: 500;
      margin: 0.02rem .2rem 0 0;
      line-height: 0.88rem;
      text-align: center;
      z-index: 0;
    }
    .searchBox{
      width: 4.6rem;
      height: .6rem;
      border-radius: .3rem;
      display: flex;
      align-items: center;
      padding-left: .3rem;
      .icon-search{
        font-size: .27rem;
        margin-top: 0;
      }
      img{
        width: .3rem;
      }
      p{
        margin-top: 0.02rem;
        margin-left: .2rem;
        font-size: .26rem;
        line-height: .6rem;
      }
    }
    .iconfont{
      font-size: .4rem;
      margin-top: .02rem;
      color: #666666;
    }
  }
  .sortBox{
    position: relative;
    top: -1px;
    background: #fff;
    z-index: 1000;
    display: flex;
    height: .9rem;
    border-bottom: 0.01rem solid rgba(173, 172, 171, 0.3);
    .sort{
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size: .28rem;
        color: #333;
        margin-right: .1rem;
      }
      img{
        width: .18rem;
      }
    }
    .changeStyle{
      flex: 1;
      img{
        width: .36rem;
      }
    }
    .multiple{
      position: absolute;
      // bottom: -2.64rem;
      top: 0.9rem;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 1001;
      div{
        font-size: .28rem;
        height: .88rem;
        line-height: .88rem;
        padding-left: .3rem;
      }
      .select{
        color: #FF2556;
      }
    }
  }
  .list{
    /*padding-bottom: 44px;*/
    box-sizing: border-box;
    overflow-y: auto;
    position: relative;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .dialog{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0,0,0,.2);
      z-index: 98;
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
        border-bottom: 5px solid !important;
      }
      .xia i:nth-of-type(2){
        border-top: 5px solid !important;
      }
    }
    .allBox{
      overflow: hidden;
      padding: .2rem 0;
      .allList{
        float: left;
        margin: 0 .25rem .2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 1rem;
        img{
          width: 1rem;
          height: 1rem;
          border-radius: .5rem;
        }
        span{
          font-size: .26rem;
        }
      }
    }
    .high{
      background: @h-col;
      height: .1rem;
      width: 100%;
    }
    .sortBox{
      position: relative;
      top: -1px;
      background: #fff;
      z-index: 1000;
      display: flex;
      height: .9rem;
      .sort{
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          font-size: .28rem;
          color: #333;
          margin-right: .1rem;
        }
        img{
          width: .18rem;
        }
      }
      .changeStyle{
        flex: 1;
        img{
          width: .36rem;
        }
      }
      .multiple{
        position: absolute;
        // bottom: -2.64rem;
        top: 0.9rem;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 1001;
        div{
          font-size: .28rem;
          height: .88rem;
          line-height: .88rem;
          padding-left: .3rem;
        }
        .select{
          color: #FF2556;
        }
      }
    }
  }
  .saleBox{
    .saleT{
      position: relative;
      width: 6.64rem;
      height: 1.32rem;
      margin: .2rem auto;
      img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      p{
        position: absolute;
        left: -0.2rem;
        top: .41rem;
        width: 100%;
        text-align: center;
        font-size: .32rem;
        line-height: .5rem;
        color: #fff;
      }
    }
    .sales{
      display: flex;
      img{
        width: 100%;
        height: 100%;
      }
      .sale{
        margin-left: .18666rem;
        width: 3.47rem;
        height: 4.3rem;
        .sale1{
          width: 100%;
          height: 2.11rem;
          margin-bottom: .08rem;
        }
        .sale2{
          width: 100%;
          height: 2.11rem;
        }
      }
      .sale3{
        margin-left: .18666rem;
        width: 3.47rem;
        height: 4.3rem;
      }
    }
  }
  .recommend{
    background: #fff;
    .t{
      width: 100%;
      height: 1.2rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 5.68rem;
      }
    }
    .goods_list_2, .goods_list_1{
      height: 100%;
      background: #f4f4f4;
      ul{
        height: 100%;
        overflow: auto;
      }
    }
  }
  .over{
    overflow-y: hidden;
  }
}
</style>
