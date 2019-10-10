<template>
  <div class="result">
    <div v-show="isOrder" class="yesOrder">
      <div class="headBox">
        <div class="top">
          <span class="orderNumber">订单：{{list.trade_id}}</span>
          <span v-if="list.order_status == 0" class="orderState">已付款</span>
          <span v-else-if="list.order_status == 1" class="orderState">已结算</span>
          <span v-else-if="list.order_status == 2" class="orderState">已失效</span>
        </div>
        <div class="content">
          <img class="pic" :src="list.picUrl" alt="">
          <div class="desc">
            <p class="title">
              {{list.title}}
            </p>
            <div class="piceBox">
              <span class="newPrice"><b class="priceIcon">¥</b>{{list.product_price}}</span>
              <span class="earnings">预估收益：{{list.estimated_revenue}}</span>
            </div>
          </div>
        </div>
        <div class="time">创建时间：{{list.created_at}}</div>
      </div>
      <div class="bottom" @click="searchOrder(orderId)">确定找回</div>
    </div>
    <div class="noOrder" v-show="noOrder">
      <div class="headBox">
        <div class="flowBox">
          <img class="prc" src="../../assets/img/my/orderQueryList.png" alt="">
          <p class="alertText">未查到该订单</p>
        </div>
        <div class="queryRule">
          <p class="title"><i class="listStyle"></i>未查询到订单的可能原因：</p>
          <p class="itemList" v-html="content"></p>
        </div>
      </div>
      <div class="bottom" @click="jumpTo('orderQuery')">重新查询</div>
    </div>
    <div v-show="showToast1" class="showToast1">
      <x-dialog v-model="showToast1" class="oauthBox">
        <div class="update">
          <img src="../../assets/img/oauth.png" alt="" class="bg">
          <div class="contentBox">
            <div class="add">
              <p class="t" >淘宝渠道认证</p>
              <div class="info" >由于淘宝需要对渠道加强精细化管理，邀请您进行淘宝身份认证操作，届时没有进行身份认证得，将可能无法分享推广淘宝商品功能，请您提前认证。</div>
            </div>
            <div class="update_btn" ><span @click="showToast1 = false" >稍后再说</span><span @click="oauth">马上认证</span></div>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
import { dateFormat } from 'vux'
export default {
  name: 'orderQueryList',
  components: {
    GoodsItem
  },
  data () {
    return {
      list: '',
      isOrder: false,
      noOrder: false,
      showToast1: false,
      content: '1.订单有延迟，建议下单后15分钟再查询<br>2.非您购买或推广的订单<br>3.不是通过此app下的订单<br>4.创建订单超过40分钟付款，次日才能同步',
      orderId: '',
      oauth_url: ''
    }
  },
  methods: {
    upCallback (value) {
      this.$http.post('amoy/user/see-order', {orderId:value}, true, true).then(res => {
        if (res.code == 1) {
        	this.noOrder = true
        } else {
          this.isOrder = true
          this.list = res.data
          this.list.created_at = dateFormat(res.data.created_at*1000, 'YYYY-MM-DD HH:mm:ss')
        }
        console.log(res)
      })
    },
    searchOrder(value) {
      this.$http.post('amoy/user/search-order', {orderId:value}, true, true).then(res => {
        if (res.code == 4) {
          this.oauth_url = res.data
          this.showToast1 = true
          console.log(this.oauth_url)
          return
        }
        this.$vux.toast.show({
          type: 'text',
          text: res.msg,
          time: 500,
          position: 'middle'
        })
      })
    },
    oauth () {
      let that = this
      if (that.$aliPay === 1) {
        let aliBC = api.require('aliBC')
        aliBC.asyncInit({
        }, function (ret, err) {
          if (ret.status) {
            aliBC.showLogin(function (ret, err) {
              if (ret.status) {
                api.openWin({
                  name: 'oauth',
                  url: '../html/oauth.html',
                  reload: true,
                  pageParam: {
                    url: that.oauth_url,
                    // back: '/supergoods?type=' + that.$route.query.type + '&id=' + that.$route.query.id + '&i=0&way=1',
                    back: '/orderQueryList'
                  },
                  animation: {
                    type: 'push',
                    subType: 'from_right',
                    duration: 300
                  },
                  bounces: false,
                  slidBackEnabled: false,
                  allowEdit: true
                })
              } else {
                that.$vux.toast.text(err.message)
              }
            })
          }
        })
      } else {
        let browser = api.require('webBrowser')
        browser.open({
          url: that.oauth_url,
          titleBar: {
            textColor: '#333',
            bg: '#fff'
          }
        })
      }
    }
  },
  activated () {
  },
  mounted() {
    this.orderId = decodeURIComponent(this.$route.query.search)
  	this.upCallback(decodeURIComponent(this.$route.query.search))
    let that = this
    if (window.api) {
      api.addEventListener({
        name: 'oauthEnd'
      }, function (ret, err) {
        that.showToast1 = false
        that.$vux.toast.text('认证成功')
      })
    }
  }
}
</script>
<style lang="less">
  .result{
    .resultTab{
      .vux-tab-item{
        font-size: .26rem;
      }
    }
    .rank{
      .tab{
        .vux-tab-item{
         background: none;
        }
      }
    }
    .oauthBox{
      margin: auto;
      .weui-dialog{
        max-width: 5.1rem !important;
        width: 5.1rem !important;
      }
      .weui-mask{
        background: rgba(0, 0, 0, 0.7);
      }
      .weui-dialog{
        background: none;
      }
      .update{
        position: relative;
        /*left: 50%;*/
        /*top: 50%;*/
        /*transform: translate(-50%, -50%);*/
        width: 5.1rem;
        overflow: hidden;
        border-radius:0.2rem;
        .bg{
          width: 100%;
          float: left;
        }
        .contentBox{
          width: 100%;
          float: left;
          background: #fff;
          padding: 0 0.4rem 0.4rem;
          box-sizing: border-box;
          /*border-radius:  0 0 0.2rem 0.2rem;*/
        }
        .add{
          width: 100%;
          p{
            text-align: center;
            color: #666;
          }
          .t{
            font-size: .36rem;
            color: #333333;
          }
          .info{
            margin-top: .2rem;
            font-size: .24rem;
            color: #333333;
            text-align: left;
          }
          img{
            margin-top: .6rem;
            width: .76rem;
            height: .76rem;
          }
        }
        .update_btn{
          margin-top: 0.4rem;
          display: flex;
          justify-content: space-around;
          span{
            display: inline-block;
            width: 2rem;
            height: .6rem;
            border-radius: .3rem;
            text-align: center;
            background: #E5E5E5;
            line-height: .6rem;
            font-size: .3rem;
            color: #999;
          }
          span:last-of-type{
            color: #fff;
            background: linear-gradient(to right, #D456FF, #7468FF);
          }
        }
        .close{
          width: .76rem;
          height: .76rem;
          position: absolute;
          bottom: -0.76rem;
          left: 50%;
          margin-left: -0.38rem;
        }
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .result{
    height: 100%;
    position: relative;
    .yesOrder{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 500;
      .headBox{
        overflow: hidden;
        margin-top: 0.3rem;
        width: 7.1rem;
        background: #FFF;
        border-radius: 0.05rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        .top{
          width: 6.6rem;
          height: 0.24rem;
          margin-top: 0.3rem;
          margin-bottom: 0.27rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
          line-height: 0.24rem;
          .orderNumber{
            color: #333;
          }
          .orderState{
            color: @theme-col;
          }
        }
        .content{
          width: 6.6rem;
          height: 1.8rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.3rem;
          .pic{
            width: 1.8rem;
            height: 1.8rem;
          }
          .desc{
            display: flex;
            width: 4.6rem;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            .title{
              width: 100%;
              height: 0.6rem;
              font-size: 0.26rem;
              line-height: 0.3rem;
              color: #333;
              text-align: left;
            }
            .piceBox{
              width: 100%;
              height: 0.34rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 0.27rem;
              color: @theme-col;
              .newPrice{
                font-size: 0.34rem;
                line-height: 0.34rem;
                .priceIcon{
                  font-size: 0.22rem;
                  line-height: 0.22rem;
                  margin-right: 0.05rem;
                }
              }
              .earnings{
                font-size: 0.24rem;
                font-weight: 500;
                line-height: 0.24rem;
                height: 0.24rem;
              }
            }
          }
        }
        .time{
          width: 100%;
          box-sizing: border-box;
          padding: 0.14rem 0.2rem;
          text-align: right;
          color: #999999;
          font-size: 0.22rem;
          line-height: 0.22rem;
          border-top: 1px solid #f7f7f7;
        }
      }
      .bottom{
        width: 5.2rem;
        height: 0.88rem;
        border-radius: 0.44rem;
        background: linear-gradient(270deg,rgba(236,100,81,1),rgba(240,150,126,1));
        text-align: center;
        font-size: 0.34rem;
        line-height: 0.88rem;
        color: white;
        margin-top: 0.6rem;
      }
    }
    .noOrder{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .headBox{
        overflow: hidden;
        margin-top: 0.3rem;
        width: 7.1rem;
        background: #FFF;
        border-radius: .2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 0.4rem;
        .flowBox{
          overflow: hidden;
          width: 6.4rem;
          padding-top: 0.5rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid #EEE;
          .prc{
            width: 2.46rem;
            max-width: 2.46rem;
          }
          .alertText{
            font-size: 0.26rem;
            line-height: 0.26rem;
            font-weight: 500;
            color: #999999;
          }
        }
        .queryRule{
          overflow: hidden;
          margin-top: 0.3rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title{
            display: flex;
            width: 6.4rem;
            align-items: center;
            justify-content: flex-start;
            font-size: 0.28rem;
            line-height: 0.28rem;
            height: 0.28rem;
            color: #333;
            .listStyle{
              display: block;
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              margin-right: 11px;
              background: #F6846D;
            }
          }
          .itemList{
            width: 6.4rem;
            box-sizing: border-box;
            padding-left: 0.22rem;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
            text-align: left;
            font-size: 0.24rem;
            line-height: 0.42rem;
            color: #999999;
          }
        }
      }
      .bottom{
        width: 5.2rem;
        height: 0.88rem;
        border-radius: 0.44rem;
        background: linear-gradient(270deg,rgba(236,100,81,1),rgba(240,150,126,1));
        text-align: center;
        font-size: 0.34rem;
        line-height: 0.88rem;
        color: white;
        margin-top: 0.6rem;
      }
    }
    .showToast1{
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, .5);
    }
  }
</style>
