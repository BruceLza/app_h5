<template>
    <div class="profitDetail">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        明细
        <span class="save" slot="right" style="color:#666;" @click="chooseTime">日期筛选</span>
      </x-header>
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="high"></div>
        <div class="time-box" v-for="(monthItem, key) in list" :key="key">
          <div class="show-time">
            <span class="time">{{key}}</span>
            <span class="price">{{countPrice(monthItem)}}</span>
          </div>
          <div class="list-box">
            <div class="list-profit-item" v-for="(item, index) in monthItem" :key="index">
              <div class="line-1">
                <div class="title text-overflow_1-xzh">{{item.title}}</div>
                <div class="price">+{{item.rebate}}</div>
              </div>
              <div class="line-2">
                <span>创建日{{item.created_at}}</span>
                <span v-if="item.updated_at != item.created_at">结算日{{item.updated_at}}</span>
                <span>订单金额{{item.price}}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { Datetime, Group } from 'vux'
export default {
  name: 'profitDetail',
  components: {
    InfiniteLoading, MescrollVue, Datetime, Group
  },
  data () {
    return {
      year: '',
      month: '',
      list: {},
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false,
        use: false
      },
      isFilter: false,
      mescrollUp: {
        callback: this.upCallback,
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
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    countPrice (orderList) {
      let total = 0
      for (let i in orderList) {
        total += +orderList[i].rebate
      }
      return total.toFixed(2)
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/user/income-detail', {
        year: this.year, month: this.month
      }, true, true).then((res) => {
        if (res.code === 0) {
          // this.list = Object.assign({}, this.list, res.data)
          this.list = res.data
          this.$nextTick(() => {
            if (JSON.stringify(this.list) === '{}' || JSON.stringify(this.list) === '[]') {
              mescroll.endSuccess(0)
            } else {
              mescroll.endSuccess(1)
            }
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    chooseTime () {
      let that = this
      this.$vux.datetime.show({
        value: `${this.year}-${this.month}`,
        format: 'YYYY-MM',
        maxYear: new Date().getFullYear(),
        cancelText: '取消',
        confirmText: '确认',
        onConfirm: (value) => {
          that.year = value.split('-')[0]
          that.month = value.split('-')[1]
          that.upCallback(0, that.mescroll)
        }
      })
    },
    initTime () {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
    },
    reset (type) {
      this.type = type
      this.getInfo()
    }
  },
  mounted () {
    this.initTime()
  }
}
</script>
<style scoped lang="less">
@import "../../assets/less/common";
.profitDetail{
  padding-top: .88rem;
  height: 100%;
  box-sizing: border-box;
  .time-box{
    .show-time{
      font-size: .32rem;
      padding: .4rem .22rem;
      display: flex;
      align-items: center;
      .time{
        margin-right: .3rem;
      }
      .price{
        color: @theme-col;
      }
    }
    .show-time:before{
      content: '';
      margin-right: .1rem;
      height: .3rem;
      display: inline-block;
      border-radius: .04rem;
      width: 0.04rem;
      background: @theme-col;
    }
    .list-box{
      background: white;
      padding: 0 .23rem;
      .list-profit-item{
        padding: .35rem 0;
        >div{
          display: flex;
          justify-content: space-between;
          .title{
            font-size: .28rem;
            width: 70%;
            margin-bottom: .35rem;
          }
          .price{
            font-size: .32rem;
            color: @theme-col;
          }
        }
        .line-2{
          color: #999;
          font-size: .24rem;
        }
      }
      .list-profit-item:not(:last-child){
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
