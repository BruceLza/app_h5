<template>
  <div class="payUnder">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        确认支付
      </x-header>
    </div>
    <div class="payUnder_content">
      <div class="payUnder_box">
          <div class="img_box">
            <img v-lazy="shopInfo.logo" alt="">
          </div>
          <div class="text">
            <p>{{shopInfo.title}}</p>
          </div>
        <div>
        </div>
      </div>
      <div class="input_title">选择支付金额</div>
      <div class="input_box">
        <div class="left">
          ¥
        </div>
        <div class="right">
          <input type="text" placeholder="请输入支付金额" v-model="price">
        </div>
      </div>
    </div>
    <div class="content_main" v-if="deduceInfo" style="margin-top:0.1rem;">
      <div class="list jifen-box">
        <div class="line">
          <img src="../../../assets/mall/img/jifen.png">
          <p>可用积分: {{availableJifen}}</p>
          <img v-if="!useJifen" src="../../../assets/img/balance/weixuan.png" @click="changeJifen(1)">
          <img src="../../../assets/img/balance/yixuan.png" v-else  @click="changeJifen(0)">
        </div>
        <div v-if="deduceInfo.type!=3" style="padding-left: 0.5rem; color: #999999;">*{{deduceInfo.info}}</div>
        <input v-else type="number" placeholder="请输入积分数量" v-model="inputJifenNum" @blur="changeJifen(inputJifenNum)">
      </div>
    </div>
    <div class="btns" @click="handleBuy(shopInfo.id)">
      <div class="btn">立即购买</div>
    </div>
  </div>
</template>

<script>
import './underLess.less'
import * as apiHttp from '../../../api/index'
export default {
  name: 'payMent',
  data () {
    return {
      active: 'alipay',
      shopInfo: {},
      deduceInfo: {},
      useJifen: false,
      inputJifenNum: '',
      useJifenNum: 0,
      price: this.$route.query.price ? this.$route.query.price : null
    }
  },
  mounted: function () {
    apiHttp.underPaymentBe(this.$route.query.spid).then(res => {
      if (res.code === 0) {
        this.shopInfo = res.data.shopInfo
        this.deduceInfo = res.data.deduceInfo
        this.jifenRate = this.deduceInfo.exchange / 100
      }
    })
  },
  computed: {
    availableJifen () {
      return this.shopInfo.credit1
    }
  },
  methods: {
    // 切换使用积分时调用
    changeJifen (val) {
      this.useJifen = val
      if (this.deduceInfo.type == 3) {
        // 当抵扣类型为用户输入时，要做验证，数字输入不能过大
        if (this.inputJifenNum < this.useJifenNum) {
          // 当减少数量时
          this.availableJifen = this.availableJifen + (this.useJifenNum - this.inputJifenNum)
        } else {
          // 当增加数量时
          if (+val > +this.availableJifen) {
            // 当数字超过已有积分数量
            this.inputJifenNum = +this.availableJifen + +this.useJifenNum
          }
        }
        this.useJifenNum = this.inputJifenNum
      }
    },
    handChange (key) {
      this.active = key
    },
    handleBuy (id) {
      if (!this.price) {
        this.$vux.toast.text('请填写金额!')
        return
      }
      let deduce = 0
      if (this.useJifen) {
        if (this.deduceInfo.type == 3) {
          deduce = this.useJifenNum
        } else {
          deduce = 1
        }
      }
      apiHttp.underPayInfo('save', id, this.price, deduce).then(res => {
        if (res.code === 0) {
          this.$router.push({name: 'mallUnderpayMent', query: {spidInfo: res.data, spid: this.$route.query.spid}})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
