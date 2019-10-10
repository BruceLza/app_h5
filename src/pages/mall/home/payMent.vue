<template>
  <div class="payMent">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        支付
      </x-header>
    </div>
    <div class="content">
      <div class="payMent_parse">
        <div class="left">
          订单金额 <span v-if="!data.order.payCredit1=='0.00'&&data.order.payCredit2=='0.00'"  style="color:gray">(<span v-if="data.order.payCredit1!=='0.00'">抵扣{{data.order.payCredit1}}消费积分</span><span v-if="data.order.payCredit2!=='0.00'">可用抵扣{{data.order.payCredit2}}</span> )</span> 
        </div>
        <div class="right">
          <span>¥</span>{{data.order ? data.order.payPrice : 0}}
        </div>
      </div>
      <div class="payMent_list">
        <div class="list_title">
          选择支付方式
        </div>
        <div class="list" v-for="(item,index) in payType" @click="handChange(index)" v-if="item.status">
          <div class="img_box">
            <img v-if="index == 'credit'" src="../../../assets/mall/img/home/yue.png" alt="">
            <img v-if="index == 'alipay'" src="../../../assets/mall/img/home/apliy.png" alt="">
            <img v-if="index == 'wechat'" src="../../../assets/mall/img/home/wheat.png" alt="">
            <span>{{item.title}}</span>
          </div>
          <div class="checkbox">
            <img :src="active == index ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="btn" @click="handBuy">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
import axios from 'axios'
export default {
  name: 'payMent',
  data () {
    return {
      active: 'credit',
      data: {},
      payType: {},
      isCridit:false
    }
  },
  mounted: function () {
    // 删除
    apiHttp.paymentDisplay(this.$route.query.orderId).then(response => {
      if (response.code === 0) {
        this.data = response.data
        if(response.data.credit==0){
          this.isCridit = true
        }
        this.payType = response.data.payType
      }
    })
  },
  methods: {
    handChange (key) {
      this.active = key
    },
    // 点击支付
    getWay (type) {
      this.$http.post('/amoy/user/upgrade-agent', {
        id: this.index,
        upgrade_type: 1,
        type: type
      }, true).then(res => {
        this.dialog = false
        if (res.code === 0) {
          if (type === 'alipay') {
            this.plusReady(1, res.data.payOrder)
          } else {
            this.plusReady(0, res.data.payOrder)
          }
        }
      })
    },
    // 获取支付通道
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
          console.log(JSON.stringify(err))
          switch (ret.code) {
            case '9000':
              that.$vux.toast.text('支付成功')
              that.$router.push({
                name: 'mallPaySuccess'
              })
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
      }else if (index === 2) {
        console.log(JSON.stringify(data))
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
            that.$vux.toast.text('支付成功')
            that.$router.push({
              name: 'mallPaySuccess'
            })
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
    },
    handBuy () {
      if(this.isCridit&&this.active === 'credit'){
        this.$vux.toast.text("请选择支付方式");
        return;
      }
      if (this.active === 'credit') {
        apiHttp.paymentPayType(this.$route.query.orderId, this.active).then(response => {
          if (response.code === 0) {
            // axios.post(response.data.notify)
            this.$router.push({
              name: 'mallPaySuccess'
            })
          }
        })
      } else if (this.active === 'alipay') {
        apiHttp.paymentPayType(this.$route.query.orderId, this.active).then(response => {
          if (response.code === 0) {
            this.plusReady(1, response.data.payOrder)
          }
        })
      } else {
        apiHttp.paymentPayType(this.$route.query.orderId, this.active).then(response => {
          if (response.code === 0) {
            // this.$vux.toast.text('暂未开放该支付通道')
            this.plusReady(2, response.data.payOrder)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
