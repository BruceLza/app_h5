<template>
  <div class="under-buy" v-if="isShow">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">提交订单</a>
    </x-header>
    <div class="under-body">
      <div class="under-title">
        <div class="title-one">
          <div>
            <img v-lazy="shopInfo.logo" alt="">
            <p>{{shopInfo.title}}</p>
          </div>
        </div>
        <div class="title-two">
          <div>
            <img v-lazy="detail.thumb" alt="">
            <div>
              <p>{{detail.goodsName}}</p>
              <span><span v-for="(item,i) in equityInfo" :key="i" v-if="item.status == 1" style="margin-left: .1rem">{{item.title}}</span></span>
            </div>
          </div>
          <p>￥{{detail.spe_price}}</p>
        </div>
        <div class="title-one">
          <p>购买数量</p>
          <div class="handle-count">
            <img src="../../../assets/mall/img/under/desc.png" alt="" @click.stop="handleDesc()">
            <input type="text" v-model="count">
            <img src="../../../assets/mall/img/under/add.png" alt="" @click.stop="handleAdd()">
          </div>
        </div>
        <div class="title-one">
          <p>实付款</p>
          <span>￥{{data.goodsPrice}}</span>
        </div>
      </div>
      <div class="details">
        <div class="one">
          <span>留言：</span>
        </div>
        <div class="two">
          <textarea name="site" v-model="note" id="" cols="42" rows="3" placeholder="亲，您可以给商家留言哦！"></textarea>
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
      <div class="goPay1">
        <div>
          <p>合计：<span>￥</span><span>{{sumPrice}}</span></p>
        </div>
        <div @click="promptlyBuy()">
          <span>立即购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './underLess.less'
import * as apiHttp from '../../../api/index'
export default {
  data () {
    return {
      count: 1,
      data: {},
      detail: {},
      equityInfo: {},
      shopInfo: {},
      isShow: false,
      goodsInfo: null,
      notes: [],
      note: null,
      deduceInfo: null,
      useJifen: false,
      inputJifenNum: '',
      useJifenNum: 0,
      jifenRate: 0 // 每元有多少积分
    }
  },
  mounted () {
    this.getInfo()
  },
  computed: {
    availableJifen () {
      if (this.useJifen) {
        // 如果开启使用积分
        if (this.deduceInfo.type == 3) {
          // 如果是用户手动输入
          return this.detail.credit1 - this.useJifenNum
        } else {
          // 如果是固定积分
          return this.detail.credit1 - this.deduceInfo.credit1
        }
      } else {
        return this.detail.credit1
      }
    },
    sumPrice () {
      // 计算合计
      let sumPrice = +this.data.goodsPrice
      if (this.useJifen) {
        if (this.deduceInfo.type == 3) {
          sumPrice = sumPrice - this.useJifenNum / this.jifenRate
        } else {
          sumPrice = sumPrice - this.deduceInfo.price
        }
      }
      return sumPrice
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
          if (+this.inputJifenNum / this.jifenRate > this.data.goodsPrice) {
            // 当积分价值超过商品价值
            this.inputJifenNum = this.data.goodsPrice * this.jifenRate
          }
        }
        this.useJifenNum = this.inputJifenNum
      } else {
        // 当抵扣类型为固定积分抵扣时，需要考虑可用积分是否足够
        if (this.detail.credit1 < this.deduceInfo.credit1) {
          this.useJifen = 0
          this.$vux.toast.text('当前可用积分不足')
        }
      }
    },
    getInfo () {
      apiHttp.underShopGoodsDetails(this.$route.query.goodsId, this.count).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data
          this.equityInfo = res.data.equityInfo
          this.detail = res.data.detail
          this.count = res.data.goodsNum
          this.shopInfo = res.data.shopInfo
          this.goodsInfo = res.data.goodsInfo
          this.deduceInfo = this.detail.deduceInfo
          this.jifenRate = this.deduceInfo.exchange / 100
        }
      })
    },
    handleDesc () {
      if (this.count > 1) {
        this.count--
        this.getInfo()
      }
    },
    handleAdd () {
      this.count++
      this.getInfo()
    },
    promptlyBuy () {
      if (this.note) {
        this.notes[this.shopInfo.id] = this.note
      }
      let deduce = []
      if (this.useJifen) {
        if (this.deduceInfo.type == 3) {
          deduce[this.shopInfo.id] = this.useJifenNum
        } else {
          deduce[this.shopInfo.id] = 1
        }
      }
      console.log('this.useJifenNum: ', this.useJifenNum)
      apiHttp.underShopGoodBuy('oto', this.goodsInfo, this.notes, deduce).then(res => {
        if (res.code === 0) {
          this.$router.push({name: 'mallUnderpayMent', query: {spidInfo: res.data, goodsId: this.data.goodsId}})
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.under-buy{
  .under-body{
    margin-top: @margin-top;
    .details{
      padding: 0 .3rem .4rem;
      background: #ffffff;
      .one{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1rem;
        color: @font-middle-color;
        font-size: @font-big;
      }
      .two{
        width: 94%;
        height: 1.5rem;
        margin: 0 auto;
        border-radius: 0.1rem;
        background: #F7F7F7;
        display: flex;
        justify-content: center;
        align-items: center;
        textarea{
          border:none;
          resize: none;
          background: #F7F7F7;
          outline: none;
          font-size: @font-nomal;
        }
      }
    }
    .content_main{
      padding:0 0.3rem;
      background:#fff;
      margin-top:0.2rem;
      .jifen-box{
        padding: 0.3rem 0;
        .line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            flex-grow: 1;
            font-size: 0.3rem;
          }
          img{
            width: 0.4rem;
            height: 0.4rem;
          }
          img:first-child{
            margin-right: 0.1rem;
          }
        }
        input{
          background: #f4f4f4;
          border: none;
          text-indent: 1em;
          border-radius: 4px;
          line-height: 2em;
          font-size: 0.3rem;
          width: 100%;
          margin-top: 0.2rem;
        }
      }
    }
    .goPay1{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.1rem;
      background-color: #fff;
      box-shadow: 0 2px 1px 1px #b6b6b6;
      display: flex;
      align-items: center;
      padding: 0 .3rem;
      justify-content: space-between;
      box-sizing: border-box;
      div:first-child{
        p{
          color:@font-light-color;
          font-size: @font-nomal;
          span:first-child{
            color: @main-red-color;
          }
          span:nth-child(2){
            color:@main-red-color;
            font-size: .33rem;
            font-weight: 600;
          }
        }
      }
      div:last-child{
        background: @main-red-color;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        height: 0.75rem;
        width: 30%;
        span{
          display: inline-block;
          line-height: 0.8rem;
          margin-left: 0;
          font-size: @font-more-big;
        }
      }
    }
  }
}
</style>
