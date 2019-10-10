<template>
    <div class="GoodsList">
      <div :class="{goods_list_2 : !styles, goods_list_1 : styles}">
        <!-- <ul class="goods_ul"  v-if="!type || Number(type) < 1">
          <li class="goods_li" v-for="item of list" :key="item.origin_id" @click="detail(item)">
            <div class="preview">
              <img v-lazy="item.thumb" alt="" :key="item.thumb">
              <img src="../assets/img/home/video.png" alt="" class="video" v-if="item.video_url && showVideo"  @click.stop="openVideo(item)">
              <p class="commission_money" v-if="item.commission_money">分享赚：{{item.commission_money}}</p>
            </div>
            <div class="con_right">
              <p class="brand">
                <img src="../assets/img/home/tblogo.png" alt="" v-if="Number(item.type) === 11">
                <img src="../assets/img/home/tmlogo.png" alt="" v-else-if="Number(item.type) === 12">
                <img src="../assets/img/home/jdlogo.png" alt="" v-else-if="Number(item.type) === 21">
                <img src="../assets/img/home/pddlogo.png" alt="" v-else-if="Number(item.type) === 31">
                {{item.title}}
              </p>
              <p class="listinfo">{{item.description}}</p>
              <div class="original"><p>原价:&nbsp;&nbsp;<del>￥{{item.zk_final_price}}</del></p><i>已售: {{item.volume}}</i></div>
              <div class="price"><span class="later" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">券后价</span><p :style="{color: $store.state.global.theme.mainColor}">￥<span>{{item.coupon_price}}</span></p><b :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">{{item.coupon_money || 0}}元券</b></div>
              <div class="up_gain" v-if="$bizId !== 1 && item.level_commission_money && item.level_commission_money != 0">
                <span v-if="item.commission_money">预估赚:￥{{item.commission_money}}</span>
                <span v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚:￥{{item.level_commission_money}}</span>
              </div>
            </div>
          </li>
        </ul> -->
        <ul class="otherList">
          <li class="goods_li" v-for="item of list" :key="item.origin_id" @click="detail(item)">
            <div class="preview">
              <img v-lazy="item.thumb" alt="" :key="item.thumb">
              <img src="../assets/img/home/video.png" alt="" class="video" v-if="item.video_url && showVideo"  @click.stop="openVideo(item)">
              <!-- <p class="commission_money" v-if="item.commission_money">分享赚：{{item.commission_money}}</p> -->
            </div>
            <div class="otherInfo">
              <p class="brand">
                <img src="../assets/img/home/tblogo.png" alt="" v-if="Number(item.type) === 11">
                <img src="../assets/img/home/tmlogo.png" alt="" v-else-if="Number(item.type) === 12">
                <img src="../assets/img/home/jdlogo.png" alt="" v-else-if="Number(item.type) === 21">
                <img src="../assets/img/home/pddlogo.png" alt="" v-else-if="Number(item.type) === 31">
                {{item.title}}
              </p>
              <div class="original"><p class="coupon">{{item.coupon_money || 0}}元券</p><i>已售: &nbsp;&nbsp;{{item.volume}}</i></div>
              <div class="original"><p class="newP"><span>￥</span>{{item.coupon_price}}<del>￥{{item.zk_final_price}}</del></p></div>
              <div class="up_gain" v-if="item.level_commission_money && item.level_commission_money != 0">
                <span v-if="item.commission_money">预估赚:{{item.commission_money}} 积分</span>
                <span v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚:￥{{item.level_commission_money}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div id="empty"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'GoodsList',
  components: {},
  props: ['list', 'styles', 'showVideo', 'type'],
  data () {
    return {}
  },
  methods: {
    detail (item) {
      this.$emit('detail', item)
    },
    openVideo (item) {
      this.$emit('openVideo', item)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/common.less";
.GoodsList{
  // 横排商品列表 一排两列
  .goods_list_1{
    background: #f7f7f7;
    font-size: 0;
    overflow-x: hidden;
    word-break: break-all;
    .otherList{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 .1rem .1rem .1rem;
      .goods_li{
        overflow: hidden;
        width: 3.45rem;
        //height: 6.2rem;
        margin-top: .2rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        border-radius: 0.1rem;
        background: #fff;
        padding-bottom: .1rem;
        position: relative;
        .preview{
          width: 3.45rem;
          height: 3.5rem;
          display: inline-block;
          position: relative;
          img{
            border-top-left-radius: 0.1rem;
            border-top-right-radius: 0.1rem;
            width: 100%;
            height: 100%;
          }
          .commission_money{
            height: .4rem;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: center;
            background: rgba(0,0,0, .4);
            color: #fff;
            font-size: .24rem;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .video{
            position: absolute;
            left: 0;
            top: 0;
            width: 3.4rem;
            height: 3.4rem;
          }
        }
        .otherInfo{
          vertical-align: top;
          width: 4.45rem;
          display: flex;
          height: 1.8rem;
          padding: .2rem 0.15rem;
          flex-direction: column;
          justify-content: space-between;
          .brand{
            width: 3.15rem;
            height: 0.4rem;
            display: inline-block;
            text-align: left;
            font-size: .28rem;
            line-height: .4rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            img{
              width: .28rem;
              height: .28rem;
              margin-top: 0.06rem;
              border-radius: .08rem;
              display: inline-block;
              vertical-align: top;
              margin-right: .05rem;
            }
          }
          .original{
            width: 3.15rem;
            color: #999;
            font-size: .22rem;
            line-height: .3rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .newP{
              font-size: 0.34rem;
              color: #FF0036;
              span{
                font-size: 0.26rem;
                color: #FF0036;
              }
              del{
                margin-left: 0.1rem;
                color: #C1C1C1;
                font-size: 0.2rem;
              }
            }
            .coupon{
              width: 0.9rem;
              padding-top: 0.05rem;
              padding-bottom: 0.05rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: .2rem;
              line-height: .2rem;
              color: #fff;
              text-align: center;
              font-weight: 500;
              position: relative;
              border-radius: 0.03rem;
              background: linear-gradient(to right, #FF0036, #FF7200);
            }
            .coupon:before{
              content: '';
              position: absolute;
              left: -0.05rem;
              top: 0.1rem;
              height: .1rem;
              width: .1rem;
              border-radius: 100%;
              background: #fff;
            }
            .coupon:after{
              content: '';
              position: absolute;
              right: -0.05rem;
              top: 0.1rem;
              height: .1rem;
              width: .1rem;
              border-radius: 100%;
              background: #fff;
            }
            i{
              display: inline-block;
              font-style: normal;
              float: right;
              font-size: 0.22rem;
              color: #999999;
            }
          }
          .share{
            //height: .55rem;
            line-height: .55rem;
            font-size: .24rem;
            //font-weight: bold;
            text-align: right;
            margin-top: .2rem;
            span:first-of-type{
              float: left;
            }
            span:last-of-type{
              float: right;
            }
          }
          .up_gain{
            width: 3.15rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              color: #ffffff;
              font-size: 0.18rem;
              line-height: 0.18rem;
              padding: 0.07rem .06rem;
              border-radius: 0.03rem;
            }
            span:first-child{
              background: #FF0036;
            }
            span:nth-child(2){
              background: #9A54E9;
            }
          }
        }
      }
    }
  }
  // 竖排商品列表 一排一列
  .goods_list_2{
    background: #f7f7f7;
    font-size: 0;
    overflow-x: hidden;
    word-break: break-all;
    .otherList{
      .goods_li{
        border-bottom: 1px solid #f4f4f4;
        background: #fff;
        padding: 0 .20rem;
        position: relative;
        display: flex;
        .preview{
          width: 2.4rem;
          height: 2.4rem;
          display: inline-block;
          margin: 0.3rem 0.3rem 0.3rem 0;
          position: relative;
          img{
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
          .commission_money{
            height: .4rem;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: center;
            background: rgba(0,0,0, .4);
            color: #fff;
            font-size: .24rem;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .video{
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .otherInfo{
          vertical-align: top;
          width: 4.4rem;
          display: flex;
          height: 2.4rem;
          padding: .3rem 0;
          flex-direction: column;
          justify-content: space-around;
          .brand{
            width: 100%;
            display: inline-block;
            text-align: left;
            font-size: .28rem;
            line-height: .4rem;
            overflow: hidden;
            display: -webkit-inline-box;
            text-overflow:ellipsis;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            img{
              width: .28rem;
              height: .28rem;
              margin-top: 0.06rem;
              border-radius: .08rem;
              display: inline-block;
              vertical-align: top;
              margin-right: .05rem;
            }
          }
          .original{
            color: #999;
            font-size: .22rem;
            line-height: .3rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .newP{
              font-size: 0.34rem;
              color: #FF0036;
              span{
                font-size: 0.22rem;
                color: #FF0036;
              }
              del{
                margin-left: 0.1rem;
                color: #C1C1C1;
                font-size: 0.2rem;
              }
            }
            .coupon{
              width: 0.9rem;
              padding-top: 0.05rem;
              padding-bottom: 0.05rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: .2rem;
              line-height: 0.2rem;
              color: #fff;
              text-align: center;
              font-weight: 500;
              position: relative;
              border-radius: 0.03rem;
              background: linear-gradient(to right, #FF0036, #FF7200);
            }
            .coupon:before{
              content: '';
              position: absolute;
              left: -0.05rem;
              top: 0.1rem;
              height: .1rem;
              width: .1rem;
              border-radius: 100%;
              background: #fff;
            }
            .coupon:after{
              content: '';
              position: absolute;
              right: -0.05rem;
              top: 0.1rem;
              height: .1rem;
              width: .1rem;
              border-radius: 100%;
              background: #fff;
            }
            i{
              display: inline-block;
              font-style: normal;
              float: right;
              font-size: 0.22rem;
              color: #999999;
            }
          }
          .share{
            //height: .55rem;
            line-height: .55rem;
            font-size: .24rem;
            //font-weight: bold;
            text-align: right;
            margin-top: .2rem;
            span:first-of-type{
              float: left;
            }
            span:last-of-type{
              float: right;
            }
          }
          .up_gain{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span{
              display: flex;
              align-items: center;
              justify-content: center;
              height: 0.36rem;
              color: #ffffff;
              font-size: 0.2rem;
              padding: 0 .1rem;
              border-radius: 0.06rem;
            }
            span:first-child{
              background: #FF0036;
              margin-right: .2rem;
            }
            span:nth-child(2){
              background: #9A54E9;
            }
          }
        }
      }
    }
  }
}
</style>
