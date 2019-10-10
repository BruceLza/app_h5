<template>
  <div id="payGiftBag" class="payGiftBag" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">支付方式</p>
      </div>
    </div>
    <div class="contentBox">
      <div class="payTab">
        <div class="payTabItem" v-for="(item,index) of payList" :class="{payTabItemCilck:isPay == index,payTabItemLast: index === 1}" @click="isPayTabItem(index)" :key="index">
          <img v-if="index == 'wxpay'" src="../../assets/img/clockIn/wx.png" alt="" class="payIcon">
          <img v-if="index == 'alipay'" src="../../assets/img/clockIn/zfubao.png" alt="" class="payIcon">
          <p class="payItemText">{{item.name}}</p>
          <i class="paySelectBut">
          </i>
        </div>
      </div>
    </div>
    <div class="buyBox">
      <div class="buyBtn" @click="pay()">立即购买</div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'payGiftBag',
  components: {
    MescrollVue,
  },
  data () {
    return {
      id: '',
      payList:{wxpay:{name:'微信支付'},alipay:{name:'支付宝支付'}},
      isPay: 0,
    }
  },
  methods: {
    isPayTabItem(index) {
      this.isPay = index
    },
    pay(){
      var that = this
      this.$http.post('/amoy/user/upgrade-level', {goods_id: that.id,type: that.isPay}, true).then(res => {
        if(res.code == 0){
          if(that.isPay == 'alipay') {
            that.plusReady(1, res.data.payOrder)
          } else if(that.isPay == 'wxpay'){
            that.plusReady(0, res.data.payOrder)
          }
        }
      })
    },
    plusReady (index, data) {
      let that = this
      if (index === 1) {
        let aliPayPlus
        if (this.$aliPay === 1) {
          aliPayPlus = api.require('aliPayTradePlus')
        } else {
          aliPayPlus = api.require('aliPayPlus')
        }
        aliPayPlus.payOrder({
          orderInfo: data
        }, function (ret, err) {
          switch (ret.code) {
            case '9000':
              // that.$vux.toast.text('支付成功')
              that.$router.push('/payGiftBagSuccess')
              setTimeout(() => {
                that.$router.go(-1)
              }, 2000)
              break
            case '6001':
              that.$vux.toast.text('取消支付')
              break
            case '8000':
              that.$vux.toast.text('正在处理中')
              break
            default:
              that.$vux.toast.text('支付失败')
          }
        })
      } else {
        let wxPay = api.require('wxPay')
        let info = {
          apiKey: data.appid,
          orderId: data.prepayid,
          mchId: data.partnerid,
          nonceStr: data.noncestr,
          timeStamp: data.timestamp,
          sign: data.sign
        }
        wxPay.payOrder(info, function (ret, err) {
          if (ret.status) {
            // that.$vux.toast.text('支付成功')
            that.$router.push('/payGiftBagSuccess')
          } else {
            console.log(JSON.stringify(err))
            if (err.code === -2) {
              that.$vux.toast.text('取消支付')
            } else {
              that.$vux.toast.text('支付失败')
            }
          }
        })
      }
    }
  },
  beforeMount() {
    var that = this
    that.id = that.$route.query.id
    // that.analysisUrl = JSON.parse(localStorage.getItem("analysisUrl"))
  },
  mounted () {
  }
}
</script>
<style scoped lang="less">
  .payGiftBag{
    font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background: #F7F7F7;
    .headerConBox{
      position: absolute;
      overflow: hidden;
      width: 100%;
      background: #fff;
      z-index: 3;
      .header{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 0.83rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #191919;
        .icon-back{
          position: absolute;
          font-size: 0.4rem;
          font-weight: 500;
          color: #666;
          left: 0.31rem;
          z-index: 3;
        }
        .title{
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 3rem;
          height: 0.83rem;
          margin: auto;
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.83rem;
          text-align: center;
          color: #333333;
        }
        .rightBut{
          position: absolute;
          right: 0.3rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.28rem;
          font-weight: 500;
          line-height: 0.83rem;
          color: #999999;
          i {
            
          }
        }
      }
    }
    .contentBox{
      position: relative;
      width: 7.5rem;
      background: #fff;
      margin-top: 1.08rem;
      .payTab{
        position: relative;
        overflow: hidden;
        width: 7.1rem;
        display: flex;
        font-weight: 500;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        border-top: 0.01rem solid #EEEEEE;
        .payTabItem{
          width: 6.6rem;
          height: 1.3rem;
          border-bottom: 1px solid #EEEEEE;
          display: flex;
          justify-content: center;
          align-items: center;
          .payIcon{
            width: 0.8rem;
            margin-left: 0.03rem;
            margin-right: 0.16rem;
          }
          .payItemText{
            width: 5.2rem;
            font-size: 0.28rem;
            line-height: 0.28rem;
            span {
              color: #666666;
              font-size: 0.26rem;
              line-height: 0.26rem;
              margin-left: 0.07rem;
            }
          }
          .paySelectBut{
            width: 0.42rem;
            height: 0.42rem;
            /* img {
              width: 100%;
            } */
            background: url(../../assets/img/clockIn/tuoyuan.png) center center no-repeat;
            background-size: 0.42rem 0.42rem;
          }
        }
        .payTabItemNo{
          color: #BEBEBE;
          .payItemText{
            width: 5.76rem;
            span {
              color: #BEBEBE;
            }
          }
          .paySelectBut{
            display: none;
          }
        }
        .payTabItemLast{
          border-width: 0;
        }
        .payTabItemCilck{
          .paySelectBut{
            background: url(../../assets/img/clockIn/dhao.png) center center no-repeat;
            background-size: 0.42rem 0.42rem;
          }
        }
      }
    }
    .buyBox{
      position: absolute;
      bottom: 1.05rem;
      width: 100%;
      height: 1rem;
      // background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .buyBtn{
        width:5.2rem;
        height: 0.88rem;
        background: linear-gradient(90deg,rgba(255,145,120,1),rgba(255,88,71,1));
        border-radius: 0.44rem;
        font-size: 0.36rem;
        font-weight: bold;
        line-height: 0.88rem;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
