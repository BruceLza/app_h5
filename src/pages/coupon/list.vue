<template>
  <div class="dayingShop">
    <div class="listBox">
      <!--<p class="notice"  v-if="list.length === 0">温馨提醒：已兑换优惠券得商品再次购买不会消耗余额~</p>-->
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <!--<div class="list" v-for="(item, index) of list" :key="index">-->
        <div class="list" v-for="(item, index) of list" :key="index">
          <p v-if="item.type === '0'">店铺兑换券</p>
          <p v-else-if="item.type === '11'">淘宝店铺兑换券</p>
          <p v-else-if="item.type === '12'">天猫店铺兑换券</p>
          <p v-else-if="item.type === '21'">京东店铺兑换券</p>
          <p v-else-if="item.type === '31'">拼多多店铺兑换券</p>
          <p>兑换时间:{{item.created_at*1000 | dateFormat('YYYY-MM-DD')}}</p>
          <p>有效期至:{{item.end_at*1000 | dateFormat('YYYY-MM-DD')}}</p>
          <span class="money">{{item.money}}元</span>
        </div>
        <!--<div class="list">-->
          <!--<p>天猫店铺兑换券</p>-->
          <!--<p>兑换时间:2019-04-26</p>-->
          <!--<p>有效期至2019-04-26</p>-->
          <!--<span class="money">50元</span>-->
        <!--</div>-->
        <div id="empty"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import {dateFormat} from 'vux'
export default {
  name: 'couponList',
  filters: {
    dateFormat
  },
  components: {
    MescrollVue
  },
  data () {
    return {
      list: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.reset
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
          icon: require('../../assets/img/coupon/empty.png'),
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/couponpass/couponpass-list', {
        page: page.num
      }, true, true).then((res) => {
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
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
  .dayingShop{
    height: 100%;
    overflow: hidden;
    position: relative;
    .listBox{
      position: relative;
      height: 100%;
    }
    .notice{
      position: absolute;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: .5rem;
      font-size: .26rem;
      background: #FFF6E4;
      color: #FF5847;
    }
    .list{
      margin: 0.2rem 0.1rem;
      background: #fff;
      background: url("../../assets/img/coupon/card.png") no-repeat;
      height: 2.2rem;
      box-sizing: border-box;
      background-size: 100% 100%;
      background-position: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0.3rem 0 0.3rem 1.4rem;
      p{
        color: #FFF5D5;
        font-size: 0.24rem;
      }
      .money{
        position: absolute;
        font-size: 0.4rem;
        color: #FF5847;
        height: 100%;
        width: 1.9rem;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
