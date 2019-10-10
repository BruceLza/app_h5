<template>
    <div class="order">
      <div class="head">
        <i class="iconfont icon-back" @click="$router.go(-1)"></i>
        <div class="searchBox">
          <div class="search">
            <div class="show-placeholder" v-if="!isSearching && keyword==''"><i class="iconfont icon-search"></i>搜索订单号</div>
            <input type="search" @keyup.enter="search" v-model="keyword" @focus="isSearching=true" @blur="isSearching=false">
          </div>
        </div>
        <div class="select-type" @click="(showSelect=!showSelect)">
          <span>{{companyList[selectedCompanyIndex]}}</span>
          <i class="iconfont icon-unfold" :style="{color: $store.state.global.theme.mainColor}"></i>
          <div class="select-box" v-if="showSelect">
            <div class="select-item" v-for="(item, index) in companyList" :key="index" v-if="index!=selectedCompanyIndex" @click="changeCompany(index)">{{item}}</div>
          </div>
        </div>
      </div>
      <tab :line-width="2" class="my-or-team" custom-bar-width=".4rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type" v-if="!isSearchResult">
        <tab-item @on-item-click="reset(0)">我的订单</tab-item>
        <tab-item @on-item-click="reset(1)">团队订单</tab-item>
      </tab>
      <tab :line-width="2" custom-bar-width=".4rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-if="!isSearchResult" v-model="statusTabIndex">
        <tab-item @on-item-click="resetStatus('all')">全部</tab-item>
        <tab-item @on-item-click="resetStatus(1)">已结算</tab-item>
        <tab-item @on-item-click="resetStatus(0)">已付款</tab-item>
        <tab-item @on-item-click="resetStatus(2)">已失效</tab-item>
      </tab>
      <div class="listBox" :style="{height: isSearchResult? 'calc(100% - 1.6rem)' :'calc(100% - 88px - 1.6rem)'}">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="high"></div>
          <div class="list" v-for="(item, index) of list" :key="index">
            <div class="top">
              <p>订单：{{item.trade_id}}</p>
              <span v-if="item.status === '已失效'">{{item.order_status}}</span>
              <span class="active" :style="{color: $store.state.global.theme.mainColor}"  v-else>{{item.order_status}}</span>
            </div>
            <div class="centerBox">
              <img v-lazy="item.picUrl" alt="" :key="item.picUrl">
              <div class="info">
                <p class="t">{{item.title}}</p>
                <div class="money" :style="{color: $store.state.global.theme.mainColor}">
                  <p class="price" >¥<span>{{item.payment_price}}</span></p>
                  <p class="profit">预估收益：{{item.price}}</p>
                </div>
              </div>
            </div>
            <div class="bot">
              <div class="time">
                <span>创建时间：{{item.created_at*1000 | dateFormat}}</span>
              </div>
            </div>
          </div>
          <div id="empty"></div>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import {Tab, TabItem, dateFormat} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'order',
  components: {
    Tab, TabItem, MescrollVue
  },
  filters: {
    dateFormat
  },
  data () {
    return {
      data: '',
      showSelect: false,
      isSearching: false,
      companyList: ['淘宝', '京东', '拼多多'],
      selectedCompanyIndex: 0,
      keyword: '',
      type: 0,
      selectedStatus: 'all',
      statusTabIndex: 0,
      list: [],
      page: 1,
      finish: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 1
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
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  computed: {
    isSearchResult () {
      return this.keyword != ''
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.mescroll) {
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
    }
    next()
  },
  methods: {
    search () {
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    changeCompany (index) {
      this.selectedCompanyIndex = index
      this.keyword = ''
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      let param = {}
      if (this.isSearchResult) {
        // 是搜索订单时
        param.trade_id = this.keyword
      } else {
        // 不是搜索订单时
        param = {
          type: this.type + 1,
          page: page.num,
          order_type: this.selectedCompanyIndex + 1,
          order_status: this.selectedStatus
        }
      }
      this.$http.post('/amoy/user/order-list', param, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    reset (type) {
      this.type = type
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    resetStatus (data) {
      this.selectedStatus = data
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
.order{
  height: 100%;
  overflow-y: auto;
  .head{
    width: 100%;
    position: relative;
    background: white;
    padding-top: .5rem;
    .icon-back{
      position: absolute;
      left: .3rem;
      font-size: .4rem;
      line-height: 1.1rem;
    }
    .searchBox{
      height: 1.1rem;
      display: flex;
      align-items: center;
      .search{
        position: relative;
        height: .7rem;
        width: 5rem;
        background: #eee;
        display: flex;
        padding: 0 .35rem;
        box-sizing: border-box;
        border-radius: .35rem;
        align-items: center;
        margin-left: 1.04rem;
        .show-placeholder{
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          line-height: .7rem;
          text-align: center;
          width: 100%;
          i{
            font-size: .25rem;
          }
        }
        input{
          flex: 1;
          position: relative;
          z-index: 1;
          background: none;
          outline: none;
          border: none;
        }
      }
    }
    .select-type{
      position: absolute;
      right: .23rem;
      top: .5rem;
      font-size: .28rem;
      line-height: 1.1rem;
      i{
        font-size: .21rem;
      }
      .select-box{
        position: absolute;
        right: 0;
        top: 100%;
        border-radius: .1rem;
        background: white;
        padding: 0 .2rem;
        width: 1.8rem;
        z-index: 1;
        box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: .7rem;
        .select-item:not(:last-child){
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
  .vux-tab-wrap.my-or-team{
    .vux-tab-container{
      .vux-tab{
        .vux-tab-item{
          position: relative;
        }
        .vux-tab-item:first-child:after{
          content: '';
          position: absolute;
          right: 0;
          height: .6rem;
          top: .14rem;
          border-radius: .01rem;
          width: .02rem;
          background: #eee;
        }
      }
    }
  }
  .listBox{
    position: relative;
    background: #f7f7f7;
    height: calc(100% - 88px - 1.6rem);
    .list{
      overflow: hidden;
      background: #fff;
      margin: .2rem;
      border-radius: .05rem;
      .top{
        background: #fff;
        display: flex;
        align-items: center;
        height: .8rem;
        padding: 0 .3rem;
        img{
          width: .34rem;
          margin-right: .2rem;
        }
        p{
          color: #666;
          font-size: .28rem;
          flex: 1;
        }
        span{
          font-size: .3rem;
        }
      }
      .centerBox{
        background: #fff;
        display: flex;
        padding: 0 .3rem .3rem;
        position: relative;
        img{
          width: 1.8rem;
          height: 1.8rem;
          margin-right: .3rem;
        }
        .info{
          /*height: 1.6rem;*/
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .t{
            font-size: .26rem;
          }
          .money{
            display: flex;
            justify-content: space-between;
            .price{
              font-size: .26rem;
              span{
                font-size: .38rem;
              }
            }
            .profit{
              font-size: .26rem;
              padding: 0 .2rem;
              height: .56rem;
              line-height: .56rem;
              border-radius: .28rem;
            }
          }
        }
      }
      .centerBox:after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        border-bottom: 1px solid #e0e0e0;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .bot{
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0.1rem .3rem;
        .order{
          text-align: right;
          color: #666;
          font-size: .28rem;
          padding: .1rem 0;
        }
        .time{
          text-align: right;
          font-size: .24rem;
          color: #999;
          span{
            margin-left: .4rem;
          }
        }
      }
    }
  }
}
</style>
