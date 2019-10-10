<template>
  <div class="withdraw">
    <x-header  :left-options="{showBack: false}"><a slot="left" @click="goBack()"   class="backBox">
      <i class="iconfont icon-back"></i></a>{{title}}
      <span class="save" slot="right" @click="jumpTo('/couponList')">兑换记录</span>
    </x-header>
    <div class="box">
      <div class="head">
        <div class="moneyBox">
          <p>账户{{info.couponpass_name}}<span>(元)</span></p>
          <p class="money"><span>¥</span>{{couponpassMoney}}</p>
        </div>
        <div class="list" @click="jumpTo('/couponDraw')">领券记录 <img src="../../assets/img/coupon/look.png" alt=""></div>
      </div>
      <div class="high"></div>
      <div class="inputBox">
        <input type="text" placeholder="请输入卡密或扫描卡密二维码" v-model="coupon">
        <span @click="scan"><img src="../../assets/img/coupon/scan.png" alt=""></span>
      </div>
      <div class="btns" @click="changeCode">确认</div>
      <div class="explain" v-html="info.desc"></div>
    </div>
  </div>
</template>

<script>
import {Group, XInput, XHeader, Actionsheet} from 'vux'
export default {
  name: 'coupon',
  components: {
    Group, XInput, XHeader, Actionsheet
  },
  data () {
    return {
      title: this.$route.query.title ? this.$route.query.title : '优惠券余额',
      text: '',
      coupon: '',
      couponpassMoney: this.$store.state.user.couponpassMoney ? Number(this.$store.state.user.couponpassMoney) : 0,
      info: ''
    }
  },
  methods: {
    scan () {
      var FNScanner = api.require('FNScanner')
      let that = this
      FNScanner.open({
        autorotation: true
      }, function (ret, err) {
        if (ret.eventType === 'success') {
          console.log(ret.content)
          that.coupon = ret.content
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    ways (key) {
      if (key === 'menu1') {
        this.way = 'alipay'
      } else {
        this.way = 'wxpay'
      }
    },
    change () {
      this.show = true
    },
    changeCode () {
      if (!this.coupon) {
        this.$vux.toast.text('请输入卡密或扫描卡密二维码')
        return
      }
      this.$http.post('/amoy/couponpass/exchange-pass', {
        cdkey: this.coupon
      }, true).then(res => {
        this.$vux.toast.text(res.msg)
        if (res.code === 0) {
          this.coupon = ''
          this.getInfo()
        }
      })
    },
    getInfo () {
      this.$http.post('/amoy/couponpass/exchange-info', {}, true).then(res => {
        this.info = res.data
        this.couponpassMoney = res.data.couponpass_money
        this.$store.commit('setCouponpassMoney', res.data.couponpass_money)
      })
    }
  },
  mounted () {
    // 删除
    this.getInfo()
  }
}
</script>
<style lang="less">
  .withdraw{
    .vux-header{
      position: absolute !important;
    }
    .weui-cells{
      margin-top: 0;
      font-size: 12px;
      .weui-cell:before{
        right: 15px;
      }
      .weui-input{
        font-size: 14px;
        color: #999;
      }
      .weui-label{
        font-size: 14px;
      }
      /*.weui-cell__bd{*/
      /*display: flex;*/
      /*}*/
    }
    .weui-cells:after,.weui-cells:before{
      left: 15px;
      right: 15px;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.4);
    }
    .weui-actionsheet_toggle{
      bottom: 30px;
      width: 90%;
      left: 5%;
      background: none;
      .weui-actionsheet__menu{
        border-radius: 5px;
      }
      .weui-actionsheet__action{
        border-radius: 5px;
      }
      .vux-actionsheet-menu-default{
        color: #666;
        font-size: .28rem;
      }
      .weui-actionsheet__cell{
        font-size: .3rem;
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .hint{
    font-size: 0.22rem;
    padding-left: 0.4rem;
    color: #666;
  }
  .withdraw{
    height: 100%;
    background: #F7F7F7;
    overflow-y: auto;
    position: relative;
    .btns{
      width: 6.2rem;
      height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.36rem;
      color: #fff;
      background: linear-gradient(to right, #F87B64, #F63D36);
      margin: 0.4rem auto;
      border-radius: 0.44rem;
    }
    .single_get{
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      .get_info{
        width: 6.38rem;
        position: absolute;
        top:4.66rem;
        left: 50%;
        margin-left: -3.19rem;
        background: #ffffff;
        border-radius: .16rem;
        padding-bottom: .5rem;
        p:first-child{
          font-size: .28rem;
          color: #666666;
          text-align: center;
          margin-top: .68rem;
          font-weight:500;
        }
        p:nth-child(2){
          color: #333333;
          font-size: .32rem;
          text-align: center;
          margin-top: .26rem;
          font-weight:500;
        }
        .get_confirm{
          padding: 0 .74rem;
          box-sizing: border-box;
          height: .7rem;
          margin-top: 0.4rem;
          display: flex;
          justify-content: space-between;
          span{
            display: inline-block;
            width: 1.9rem;
            height: .7rem;
            border-radius:.35rem;
            font-size: .28rem;
            font-weight:500;
            text-align: center;
            line-height: .7rem;
          }
          span:first-child{
            background: #F0F0F0;
            color: #898787;
          }
          span:last-child{
            background: #FF2556;
            color: #ffffff;
          }
        }
      }
    }
    .save{
      color: #666;
    }
    .box{
      position: absolute;
      left: 0;
      top: .88rem;
      bottom: 0;
      width: 100%;
      .head{
        width: 100%;
        height: 3rem;
        background: url("../../assets/img/coupon/bg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        /*flex-direction: column;*/
        .moneyBox{
          flex: 1;
          border-right: 1px solid #fff;
          p{
            font-size: .3rem;
            color: #fff;
            text-align: center;
            span{
              margin: 0 .1rem;
            }
          }
        }
        .list{
          flex: 1;
          text-align: center;
          font-size: 0.3rem;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 15px;
            margin-left: 0.06rem;
          }
        }
        .money{
          margin-top: .2rem;
          font-size: .4rem;
          margin-right: .3rem;
          span{
            font-size: .34rem;
          }
        }
      }
      .info{
        display: flex;
        div{
          position: relative;
          flex: 1;
          height: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          span{
            font-size: .24rem;
            color: #666;
          }
          span:last-of-type{
            font-size: .32rem;
          }
        }
        div:first-of-type:after{
          content: '';
          position: absolute;
          top: .2rem;
          height: 1rem;
          right: 0;
          width: 1px;
          border-right: 1px solid #dedede;
          transform-origin: 0 0;
          transform: scaleX(.5);
        }
      }
      .high{
        overflow: hidden;
        width: 100%;
        height: .1rem;
        background: #f4f4f4;
      }
      .account{
        padding: .3rem;
        .t{
          color: #333;
          font-size: .3rem;
          margin-bottom: .2rem;
          span{
            float: right;
            font-size: .26rem;
          }
        }
        .number{
          display: flex;
          align-items: center;
          position: relative;
          padding-bottom: .3rem;
          img{
            width: .85rem;
            height: .85rem;
            margin-right: .25rem;
          }
          .info{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            .name{
              font-size: .3rem;
              color: #666;
            }
            .mobile{
              color: #999;
              font-size: .24rem;
            }
          }
        }
        .number:before{
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #c8c8cd;
          border-style: solid;
          -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
          transform: matrix(.71,.71,-.71,.71,0,0);
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 2px;
        }
        .number:after{
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px solid #e9e8e8;
          transform-origin: 0 0;
          transform: scaleY(.5);
        }
      }
      .inputBox{
        border-radius: .05rem;
        display: flex;
        align-items: center;
        height: .9rem;
        margin: .2rem;
        input{
          flex: 1;
          height: .8rem;
          line-height: .8rem;
          padding-left: .2rem;
          border: none;
          outline: none;
          background: #fff;
          border-radius: 0.1rem;
        }
        span{
          margin-left: 0.2rem;
          font-size: .3rem;
          width: 1.8rem;
          height: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #FFAFA1;
          border-radius: 0.1rem;
          img{
            width: 0.46rem;
            height: 0.46rem;
          }
        }
      }
      .explain{
        padding: .3rem;
      }
    }
  }
</style>
