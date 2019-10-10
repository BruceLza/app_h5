<template>
  <div id="giftBag" class="giftBag" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">礼包详情</p>
      </div>
    </div>
    <div class="contentBox">
      <div class="bannerBox" v-if="data">
        <swiper :options="swiperOption" ref="smallImages">
          <swiper-slide class="goods_swiper" v-for="(item, index) in data.img" :key="index">
            <img :src="item" alt="">
          </swiper-slide>
        </swiper>
        <p class="goods_page_box" v-if="data.img && data.img.length"><span>{{index + 1}}</span>/{{data.img.length}}</p>
      </div>
      <div class="titleBox" v-if="data">
        <div class="titleText">
          <span class="titleIcon">优选</span>{{data.title}}
        </div>
      </div>
      <div class="piceBox" v-if="data">
        <span class="newPicIcon">￥</span>
        <span class="newPic">{{data.price}}</span>
         <span class="picTitle"> 库存：</span>
        <span class="picIcon"></span>
        <span >{{data.stock}}</span> 
      </div>
      <div class="giftBagBox">
        <img class="giftIcon" src="../../assets/img/giftBag/liwu.png" alt="">
        <p class="text">升级专享礼包</p>
      </div>
      <div class="serveBox">
        <div class="serve">
          <div class="title">服务</div>
          <div class="descBoxText">
            <div class="descitem" v-for="(item, index) in descBoxTextList" :key="'descBoxTextList'+index"><span class="itemText">{{item}}</span><i v-if="index !== descBoxTextList.length - 1" class="itemIcon"></i></div>
          </div>
        </div>
      </div>
      <div class="descBox" v-if="data">
        <div class="descTitle">图文详情</div>
        <div class="desc" v-html="data.describe"></div>
      </div>
    </div>
    <div class="buyBox">
      <div v-if="data.stock=='0'" style="background:rgb(200,200,200)" class="buyBtn" >暂无库存</div>
      <div v-else class="buyBtn" @click="jumpTo('/homeFirmOrder?id=' + id)">立即购买</div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'giftBag',
  components: {
    MescrollVue,
  },
  data () {
    return {
      id: '',
      data: '',
      index: 0,
      descBoxTextList: ['正品保证','限时包邮','售后无忧'],
      swiperOption: {
        loop: true,
        on: {
          transitionEnd: () => {
            if (this.$refs.smallImages.swiper) {
              this.index = this.$refs.smallImages.swiper.realIndex
            }
          },
          sliderMove: function (event) {
            window.canRightSlipBack = false
          },
          touchEnd: function (event) {
            setTimeout(() => {
              window.canRightSlipBack = true
            }, 600)
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  methods: {
    getInfo() {
      var that = this
      this.$http.get('/amoy/user/upgrade-goods', {id: that.id}, true).then(res => {
        if(res.code == 0){
          that.data = res.data[0]
        }
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
  }
}
</script>
<style scoped lang="less">
  .giftBag{
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
      position: absolute;
      overflow: auto;
      top: 0.88rem;
      bottom: 0;
      width: 100%;
      .bannerBox{
        position: relative;
        overflow: hidden;
        width: 7.5rem;
        height: 7.5rem;
        font-size: 0;
        img {
          width: 100%;
        }
        .goods_page_box{
          z-index: 1001;
          padding: 0 .2rem;
          color: #fff;
          border-radius: .2rem;
          justify-content: center;
          letter-spacing: 3px;
          display: flex;
          align-items: center;
          position: absolute;
          right: .30rem;
          bottom: .33rem;
          height: .4rem;
          font-size: .2rem;
          background: rgba(0,0,0,0.4);
        }
      }
      .titleBox{
        position: relative;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 0.3rem 0.58rem 0.1rem 0.2rem;
        .titleText{
          .titleIcon{
            height: 0.36rem;
            margin-right: 0.1rem;
            margin-top: -0.1rem;
            display: inline-block;
            padding: 0rem 0.15rem 0rem 0.15rem;
            font-size: 0.26rem;
            font-weight: 500;
            line-height: 0.36rem;
            border-radius: 0.18rem;
            color: #fff;
            background: #FF5847;
          }
          font-size: 0.32rem;
          font-weight: bold;
          line-height: 0.38rem;
          color: #333333;
        }
      }
      .piceBox{
        width: 100%;
        padding: 0.26rem 0 0.26rem 0.2rem;
        box-sizing: border-box;
        background: #fff;
        .newPicIcon{
          font-size: 0.3rem;
          font-weight: bold;
          line-height: 0.46rem;
          color: #FF5847;
        }
        .newPic{
          font-size: 0.46rem;
          font-weight: bold;
          line-height: 0.46rem;
          color: #FF5847;
        }
        .picTitle{
          font-size: 0.26rem;
          font-weight: 500;
          line-height: 0.46rem;
          color: #999999;
        }
        .picIcon{
          font-size: 0.26rem;
          font-weight: 500;
          line-height: 0.46rem;
          color: #999999;
        }
        .pic{
          font-size: 0.26rem;
          font-weight: 500;
          line-height: 0.46rem;
          text-decoration: line-through;
          color: #999999;
        }
      }
      .giftBagBox{
        position: relative;
        width: 100%;
        height: 0.8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: rgba(255,238,235,1);
        .giftIcon{
          width: 0.4rem;
          margin-left: 0.2rem;
          margin-right: 0.1rem;
        }
        .text{
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.3rem;
          color: #FF5847;
        }
      }
      .serveBox{
        position: relative;
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        .serve{
          width: 7.1rem;
          height: 0.9rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: auto;
          .title{
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.28rem;
            color: #999;
          }
          .descBoxText{
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .descitem{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .itemText{
                padding-left: 0.25rem;
                padding-right: 0.25rem;
                font-size: 0.28rem;
                font-weight: 500;
                line-height: 0.28rem;
                color: #333333;
              }
              .itemIcon{
                display: inline-block;
                width: 0.04rem;
                height: 0.04rem;
                border-radius: 50%;
                background: #333333;
              }
            }
          }
        }
      }
      .descBox{
        position: relative;
        width: 100%;
        margin-top: 0.2rem;
        background: #fff;
        .descTitle{
          width: 100%;
          box-sizing: border-box;
          padding-left: 0.2rem;
          padding-top: 0.3rem;
          font-size: 0.28rem;
          font-weight: 500;
          line-height: 0.3rem;
          color: #999;
        }
        /deep/.desc{
          width: 7.5rem;
          box-sizing: border-box;
          padding: 0.2rem 0.2rem 1rem 0.2rem;
          p {
            font-size: 0;
          }
          img{
            margin-top:-6px !important;
          }
        }
      }
    }
    .buyBox{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .buyBtn{
        width: 6.7rem;
        height: 0.8rem;
        background: linear-gradient(90deg,rgba(255,145,120,1),rgba(255,88,71,1));
        border-radius: 0.4rem;
        font-size: 0.32rem;
        font-weight: bold;
        line-height: 0.8rem;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
