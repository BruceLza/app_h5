<template>
  <div class="draw">
    <div class="listBox">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="high"></div>
        <div class="list" v-for="(item, index) of list" :key="index">
          <div class="centerBox">
            <img v-lazy="item.img" alt="" :key="item.img">
            <div class="info">
              <p class="t"><img src="../../assets/img/home/tblogo.png" alt="" v-if="Number(item.type) === 11">
                <img src="../../assets/img/home/tmlogo.png" alt="" v-else-if="Number(item.type) === 12">
                <img src="../../assets/img/home/jdlogo.png" alt="" v-if="Number(item.type) === 21">
                <img src="../../assets/img/home/pddlogo.png" alt="" v-else-if="Number(item.type) === 31">{{item.title}}</p>
              <div class="money">
                <p class="price" :style="{color: $store.state.global.theme.mainColor}" >优惠券¥<span>{{item.money}}</span></p>
                <!--<p class="profit" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">预估收益：{{item.price}}</p>-->
              </div>
            </div>
          </div>
          <div class="bot">
            <div class="time">
              <span>领券时间：{{item.created_at*1000 | dateFormat}}</span>
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
import Clipboard from 'clipboard'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'orderlist',
  components: {
    Tab, TabItem, MescrollVue
  },
  data () {
    return {
      type: 0,
      list: [],
      page: 1,
      finish: false,
      sort: 'all',
      loading: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
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
  filters: {
    dateFormat
  },
  mounted: function () {
    // 删除
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/couponpass/get-log', {
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
    },
    onCopy () {
      var clipboard = new Clipboard('.copyObj')
      clipboard.on('success', e => {
        this.$vux.toast.text('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$vux.toast.text('不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    reset (status) {
      this.mescrollUp.htmlLoading = ''
      this.sort = status
      this.mescrollUp.page.num = 1
      this.finish = false
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    infinite (done) {
      this.$http.post('/amoy/user/order-list', {
        type: 1,
        page: this.page,
        order_type: this.$route.query.order_type,
        order_status: this.sort
      }, false, true).then((res) => {
        if (res.code === 0) {
          if (res.data.length === 0) {
            this.finish = true
            this.$refs.my_scroller.finishInfinite(true)
          } else {
            this.list = this.list.concat(res.data)
            this.page += 1
            done()
          }
        } else {
          this.$refs.my_scroller.finishInfinite(true)
          if (this.page === 1) {
            // this.$vux.toast.text(res.msg)
          } else {
            this.$vux.toast.text('已加载全部内容')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
  .draw{
    height: 100%;
    .high{
      overflow: hidden;
      height: .1rem;
      width: 100%;
      background: @h-col;
    }
    .listBox{
      position: relative;
      background: #f7f7f7;
      height: 100%;
    }
    .list{
      overflow: hidden;
      background: #fff;
      margin: .1rem 0;
      .top{
        background: #fff;
        display: flex;
        align-items: center;
        height: 1rem;
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
        /*height: 1.6rem;*/
        padding: .25rem .3rem;
        position: relative;
        img{
          width: 1.6rem;
          height: 1.6rem;
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
            img{
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
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
              color: #fff;
              padding: 0 .2rem;
              height: .56rem;
              line-height: .56rem;
              border-radius: .28rem;
            }
          }
        }
      }
      .centerBox:before{
        content: '';
        position: absolute;
        left: .2rem;
        right: .2rem;
        top: 0;
        height: 1px;
        border-top: 1px solid #e0e0e0;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .centerBox:after{
        content: '';
        position: absolute;
        left: .2rem;
        right: .2rem;
        bottom: 0;
        height: 1px;
        border-bottom: 1px solid #e0e0e0;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .bot{
        background: #fff;
        display: flex;
        height: 0.8rem;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 .3rem;
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
</style>
