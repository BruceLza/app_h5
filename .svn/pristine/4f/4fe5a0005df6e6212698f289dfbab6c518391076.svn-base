<template>
  <div id="homeFirmOrder" class="homeFirmOrder" >
    <!--<div class="headerConBox">-->
      <!--<div class="header">-->
        <!--<i class="iconfont icon-back" @click="goBack()"></i>-->
        <!--<p class="title">确认订单</p>-->
      <!--</div>-->
    <!--</div>-->
    <div class="orderBox">
      <div class="shopHeaderBox">
        <div class="headerBox">
          <div class="headerTitleImg" :style="{backgroundImage: 'url('+data.img[0]+')'}"></div>
        </div>
        <div class="titlePicBox">
          <div class="headerTitle">
            {{data.title}}
          </div>
          <div class="headerPic">
            <span class="picIcon">
              ￥
            </span>
            <span class="picNumber">{{data.price}}</span>
          </div>
          <div class="clickSetMeal">已选{{data.level_title}}套餐</div>
        </div>
      </div>
      <div class="setMealBox">
        <div class="setMealTitle">套餐分类</div>
        <div class="setMealItemBox">
          <div class="setMealItem setMealItemActive">
            <img class="setMealIcon" :src="data.thumb" alt="" v-show="data.thumb">
            <span class="setMealText">{{data.level_title}}套餐</span>
          </div>
        </div>
      </div>
      <div class="standardBox" v-show="data.type != 0">
        <div class="standardTitle">规格</div>
        <div class="standardItemBox">
          <div v-if="data.type == 1" class="standardItem standardItemActive">
            月付
          </div>
          <div v-else-if="data.type == 2" class="standardItem standardItemActive">
            年付
          </div>
          <div v-else-if="data.type == 3" class="standardItem standardItemActive">
            永久
          </div>
        </div>
      </div>
      <div class="noOrderBox" v-if="!addressList">
        <span class="orderTitle">收货地址</span>
        <p class="addOrderBtn">
          <span class="addBtnText" @click="jumpTo('/addOrder')">添加收货地址</span>
          <img class="addBtnIcon" src="../../assets/img/giftBag/jiantao.png" alt="">
        </p>
      </div>
      <div class="yesOrderBox" v-else>
        <div class="orderTitle">收货地址</div>
        <!-- <div class="orderName"></div>
        <div class="orderCellphone"></div>
        <div class="orderArea">
          <div class="areaText"></div>
          <span class="areaBtn"></span>
        </div>
        <div class="detailArea"></div> -->
        <div class="orderArea orderAreaBorder">收货人：{{addressList.username}}</div>
        <div class="orderArea orderAreaBorder">手机号码：{{addressList.mobile}}</div>
        <div class="orderAreaTwo orderAreaBorder">
          <div class="areaText">所在地区：{{addressList.province}}  {{addressList.city}}  {{addressList.district}}</div>
          <span class="areaBtn" @click="updateAddress(addressList)">编辑</span>
        </div>
        <div class="orderArea">详细地址：{{addressList.address}}</div>
      </div>
    </div>
    <div class="yesBtn" @click="goShopp()">确认</div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'homeFirmOrder',
  components: {
    MescrollVue,
  },
  data () {
    return {
      id: '',
      data: '',
      addressList: ''
    }
  },
  methods: {
    getInfo() {
      var that = this
      this.$http.get('/amoy/user/upgrade-goods', {id: that.id}, true).then(res => {
        if(res.code == 0){
          that.data = res.data[0]
        }
      })
    },
    getCardCheckout() {
      var that = this
      this.$http.post('/amoy/user/address-list', {}, true).then(res => {
        if(res.code == 0){
          that.addressList = res.data.list[0]
        }
      })
    },
    updateAddress (item) {
      this.$router.push({
        name: 'updateOrder',
        query: item
      })
    },
    goShopp() {
      var that = this
      if(!that.addressList) {
        that.$vux.toast.text('请添加收货地址')
        return
      }
      this.$router.push({
        name: 'payGiftBag',
        query: {id:that.id}
      })
    }
  },
  beforeMount() {
    var that = this
    that.id = that.$route.query.id
    // that.analysisUrl = JSON.parse(localStorage.getItem("analysisUrl"))
  },
  mounted () {
    this.getInfo()
    this.getCardCheckout()
  }
}
</script>
<style scoped lang="less">
  .homeFirmOrder{
    font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background: #F7F7F7;
    z-index: 3;
    .headerConBox{
      position: absolute;
      overflow: hidden;
      width: 100%;
      background: #fff;
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
    .orderBox{
      width: 7.5rem;
      background: #fff;
      margin-top: 1.08rem;
      .shopHeaderBox{
        width: 6.9rem;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        margin: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .headerBox{
          position: relative;
          overflow: hidden;
          width: 1.85rem;
          height: 1.85rem;
          background: #999999;
          .headerTitleImg{
            overflow:hidden;
            width:100%;
            height:0;
            padding-bottom: 100%;
            background-position: center center;
            background-repeat: no-repeat;
            -webkit-background-size:cover;
            -moz-background-size:cover;
            background-size:cover;
          }
        }
        .titlePicBox{
          flex: 1;
          box-sizing: border-box;
          padding-left: 0.3rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .headerTitle{
            width: 100%;
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.42rem;
            color: #333333;
          }
          .headerPic{
            width: 100%;
            color: #FF5847;
            padding-top: 0.03rem;
            padding-bottom: 0.15rem;
            .picIcon{
              font-size: 0.24rem;
              font-weight: 500;
              line-height: 0.32rem;
            }
            .picNumber{
              font-size: 0.32rem;
              font-weight: 500;
              line-height: 0.32rem;
            }
          }
          .clickSetMeal{
            width: 100%;
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.3rem;
            color: #333333;
          }
        }
      }
      .setMealBox{
        width: 6.9rem;
        margin: auto;
        border-top: 1px solid rgba(238, 238, 238, 1);
        .setMealTitle{
          width: 100%;
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.3rem;
          color: #333333;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        }
        .setMealItemBox{
          width: 100%;
          box-sizing: border-box;
          padding-bottom: 0.15rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          .setMealItem{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.66rem;
            margin-bottom: 0.15rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            border-radius: 0.12rem;
            background: #F5F5F5;
            .setMealIcon{
              width: 0.46rem;
              margin-right: 0.08rem;
            }
            .setMealText{
              font-size: 0.26rem;
              font-weight: 500;
              line-height: 0.26rem;
              color: #333333;
            }
          }
          .setMealItemActive{
            border: 0.01rem solid #FF5847;
            .setMealText{
              color: #FF5847;
            }
          }
        }
      }
      .standardBox{
        width: 6.9rem;
        margin: auto;
        border-top: 1px solid rgba(238, 238, 238, 1);
        .standardTitle{
          width: 100%;
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.3rem;
          color: #333333;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        }
        .standardItemBox{
          width: 100%;
          padding-bottom: 0.15rem;
          display: flex;
          justify-content: flex-start;
          .standardItem{
            width: 1.3rem;
            height: 0.54rem;
            margin-right: 0.85rem;
            margin-bottom: 0.15rem;
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.54rem;
            text-align: center;
            color: #333333;
            border: 0.01rem solid #333333;
            border-radius: 0.1rem;
          }
          .standardItemActive{
            border-color: #FF5847;
            color: #FF5847;
          }
        }
      }
      .noOrderBox{
        width: 7.5rem;
        box-sizing: border-box;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        height: 0.88rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        border-top: 1px solid rgba(238, 238, 238, 1);
        span.orderTitle{
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.3rem;
          color: #333333;
        }
        .addOrderBtn{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .addBtnText{
            font-size: 0.26rem;
            font-weight: 500;
            line-height: 0.26rem;
            color: #999999;
          }
          .addBtnIcon{
            width: 0.16rem;
            margin-left: 0.11rem;
          }
        }
      }
      .yesOrderBox{
        width: 7.5rem;
        box-sizing: border-box;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        border-top: 0.01rem solid rgba(238, 238, 238, 1);
        .orderTitle{
          width: 100%;
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.3rem;
          color: #333333;
          padding-top: 0.3rem;
        }
        .orderArea{
          width: 100%;
          font-size: 0.26rem;
          font-weight: 500;
          line-height: 0.4rem;
          color: #666;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        }
        .orderAreaBorder{
          border-bottom: 0.01rem solid rgba(238, 238, 238, 1);
        }
        .orderAreaTwo{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.26rem;
          font-weight: 500;
          line-height: 0.4rem;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
          .areaText{
            color: #666;
          }
          .areaBtn{
            margin-right: 0.05rem;
            color: #19A3F2;
          }
        }
      }
    }
    .yesBtn{
      width: 5.2rem;
      height: 0.88rem;
      margin: auto;
      margin-top: 0.4rem;
      font-size: 0.36rem;
      font-weight: bold;
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      background: linear-gradient(270deg,rgba(246,61,54,1),rgba(248,123,100,1));
      border-radius: 0.44rem;
    }
  }
</style>
