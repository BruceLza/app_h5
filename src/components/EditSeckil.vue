<template>
    <div>
      <div class="seckillList" v-if="list" ref="editSeckill" id="editSeckillBox">
        <div class="tiemBox" style="height: 1rem;width: 100%;position: relative;bottom: 0;background: #fff;z-index: 1000;" id="editSeckill" ref="editSeckillTitle">
          <!-- <vueScroller lock-y :scrollbar-x=false :bounce="false"> -->
          <div class="times" style="width: 22.5rem;" :style="{transform:LeftMove}">
            <div class="time" style="position: relative;float: left;width: 1.5rem;height: 1.16rem;" v-for="(item, index) of times" :key="index" @click="jumpTo('/fastrobNew')">
              <div class="contentText" style="overflow: hidden;height: 1rem;background: #FF0036;" v-if="active === index">
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;margin-top: 0.1rem;font-size: .32rem;line-height: 0.42rem;font-weight: bold;color: #fff;" class="textOne textColor">{{item.time}}</p>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;color: #fff;" v-if="active > index" class="textColor">已开抢</p>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;color: #fff;" v-else-if="active < index" class="textColor">即将开始</p>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;color: #fff;" v-else-if="active == index" class="textColor">抢购中</p>
              </div>
              <div class="contentText" style="overflow: hidden;height: 1rem;" v-else>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;margin-top: 0.1rem;font-size: .32rem;line-height: 0.42rem;font-weight: bold;color: #333;" class="textOne textColor">{{item.time}}</p>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;" v-if="active > index" class="textColor">已开抢</p>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;" v-else-if="active < index" class="textColor">即将开始</p>
                <p style="text-align: center;color: #999;font-size: .24rem;font-weight: 500;" v-else-if="active == index" class="textColor">抢购中</p>
              </div>
              <div class="triangle" style="position: absolute;left: calc( 50% - 0.2rem );width: 0;border-top: 0.16rem solid #FF0036;border-left: 0.2rem solid rgba(0, 0, 0, 0);border-right: 0.2rem solid rgba(0, 0, 0, 0);" v-show="active === index"></div>
            </div>
          </div>
          <!-- </vueScroller> -->
        </div>
        <div class="shopList" id="editSeckillList">
          <div v-for="(item, index) in list" :key="index" :class="{oneBackColor: index == 0}">
            <div class="shopItemOne" v-if="index == 0" @click="detail(item)">
              <p class="titleBox"><img class="titleIcon" src="../assets/img/home/haohuo.png" alt=""><span class="haoText">好货必抢</span></p>
              <div class="shopBox">
                <div class="shopImgBox">
                  <div class="shopImg" :style="{backgroundImage: 'url('+ item.thumb +')'}"></div>
                </div>
                <div class="descBox">
                  <p class="shopTitle">
                    <img class="shopTitleIcon" src="../assets/img/home/tblogo.png" alt="" v-if="item.type == 11">
                    <img class="shopTitleIcon" src="../assets/img/home/tmlogo.png" alt="" v-if="item.type == 12">
                    <span class="shopTitleText">{{item.title}}</span>
                  </p>
                  <div class="lableBox" v-if="item.level_commission_money && item.level_commission_money != 0">
                    <div class="future" v-if="item.commission_money">预估赚￥{{item.commission_money}}</div>
                    <div class="upMoney" v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚￥{{item.level_commission_money}}</div>
                  </div>
                  <div class="progressBar">
                    <span class="progressBarNoText">已售{{item.couponreceive}}件</span>
                    <div class="progressYes" :style="{width:(item.couponreceive / item.couponnum) * 100 > 100 ? 100 : (item.couponreceive / item.couponnum) * 100 + '%'}">
                      <span class="progressBarText">已售{{item.couponreceive}}件</span>
                    </div>
                  </div>
                  <div class="ticketBox">
                    <i class="tickLeft"></i>
                    <span class="tickText">{{item.coupon_money}}元券</span>
                    <i class="tickRight"></i>
                  </div>
                  <div class="priceAndBtn">
                    <div class="priceBox">
                      <span class="newPriceIcon">￥</span>
                      <span class="newPrice">{{+item.coupon_price}}</span>
                      <span class="price">￥{{+item.origin_price}}</span>
                    </div>
                    <div class="robBtn" v-if="item.couponreceive == item.couponnum">已抢完</div>
                    <div class="robBtn" v-else @click="detail(item)">马上抢</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="shopItemTwo" v-else @click="detail(item)">
              <div class="shopBox">
                <div class="shopImgBox">
                  <div class="shopImg" :style="{backgroundImage: 'url('+ item.thumb +')'}"></div>
                </div>
                <div class="descBox">
                  <p class="shopTitle">
                    <img class="shopTitleIcon" src="../assets/img/home/tblogo.png" alt="" v-if="item.type == 11">
                    <img class="shopTitleIcon" src="../assets/img/home/tmlogo.png" alt="" v-if="item.type == 12">
                    <span class="shopTitleText">{{item.title}}</span>
                  </p>
                  <div class="lableBox" v-if="item.level_commission_money && item.level_commission_money != 0">
                    <div class="future" v-if="item.commission_money">预估赚￥{{item.commission_money}}</div>
                    <div class="upMoney" v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚￥{{item.level_commission_money}}</div>
                  </div>
                  <div class="progressBar">
                    <span class="progressBarNoText">已售{{item.couponreceive}}件</span>
                    <div class="progressYes" :style="{width:(item.couponreceive / item.couponnum) * 100 > 100 ? 100 : (item.couponreceive / item.couponnum) * 100 + '%'}">
                      <span class="progressBarText">已售{{item.couponreceive}}件</span>
                    </div>
                  </div>
                  <div class="ticketBox">
                    <i class="tickLeft"></i>
                    <span class="tickText">{{item.coupon_money}}元券</span>
                    <i class="tickRight"></i>
                  </div>
                  <div class="priceAndBtn">
                    <div class="priceBox">
                      <span class="newPriceIcon">￥</span>
                      <span class="newPrice">{{+item.coupon_price}}</span>
                      <span class="price">￥{{+item.origin_price}}</span>
                    </div>
                    <div class="robBtn" v-if="item.couponreceive == item.couponnum">已抢完</div>
                    <div class="robBtn" v-else @click="detail(item)">马上抢</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;height: 0.01rem;" ref="seckillEnd"></div>
    </div>
</template>

<script>
import {Scroller as VueScroller, Panel} from 'vux'
import * as utils from '../utils'
export default {
  name: 'seckillList',
  components: {
    Panel, VueScroller
  },
  props: ['list','seckillScoll', 'tabHeight'],
  data () {
    return {
      times: [
        {time: '00:00', name: '昨日开抢'},
        {time: '10:00', name: '昨日开抢'},
        {time: '12:00', name: '昨日开抢'},
        {time: '15:00', name: '昨日开抢'},
        {time: '20:00', name: '昨日开抢'},
        {time: '00:00', name: '今日开抢'},
        {time: '10:00', name: '今日开抢'},
        {time: '12:00', name: '今日开抢'},
        {time: '15:00', name: '今日开抢'},
        {time: '20:00', name: '今日开抢'},
        {time: '00:00', name: '明日开抢'},
        {time: '10:00', name: '明日开抢'},
        {time: '12:00', name: '明日开抢'},
        {time: '15:00', name: '明日开抢'},
        {time: '20:00', name: '明日开抢'}
      ],
      active: 10,
      LeftMove: '',
    }
  },
  methods: {
    detail (item) {
      // this.$emit('detail', item)
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0&way=1')
    },
    openVideo (item) {
      this.$emit('openVideo', item)
    },
    move (i) {
      // this.mescrollUp.htmlLoading = ''
      this.LeftMove = 'translateX(' + (-1.5 * (i - 2)) + 'rem)'
      // this.list = []
      // this.finish = false
      // this.hour_type = i + 1
      this.active = i
      // this.mescrollUp.page.num = 1
      // this.mescroll.resetUpScroll()
    },
    getHour () {
      var that = this
      var time = new Date()
      var hour = time.getHours()
      if (hour >= 20) {
        that.move(9)
      } else if (hour >= 15) {
        that.move(8)
      } else if (hour >= 12) {
        that.move(7)
      } else if (hour >= 10) {
        that.move(6)
      } else {
        that.move(5)
      }
    },
    handleScroll() {
      var that = this
      var headerTop
      var size = (document.documentElement.clientWidth / 7.5)
      if(this.$refs.editSeckill){
        var seckillDom = document.getElementById('editSeckill')
        if(seckillDom) {
          var seckillList = document.getElementById('editSeckillList')
          headerTop = that.tabHeight
          if(that.$refs.editSeckill.offsetTop - headerTop <= that.seckillScoll && that.seckillScoll < that.$refs.seckillEnd.offsetTop - headerTop) {
            seckillDom.style.position = 'fixed'
            seckillDom.style.display = 'block'
            seckillList.style.marginTop = '1rem'
            seckillDom.style.top = headerTop +'rem'
            document.getElementById('home').appendChild(seckillDom)
            // document.body.appendChild(seckillDom)
            this.$emit('seckillTop', that.$refs.editSeckillTitle)
          } 
          // if(that.seckillScoll > that.$refs.seckillEnd.offsetTop - (1.5*size)){
          //   seckillDom.style.display = 'none'
          //   seckillDom.style.top = 0
          // }
          if(that.seckillScoll < that.$refs.editSeckill.offsetTop ) {
            seckillDom.style.position = 'absolute'
            seckillList.style.marginTop = '1rem'
            seckillDom.style.display = 'block'
            seckillDom.style.top = 0
            document.getElementById('editSeckillBox').appendChild(seckillDom)
          }
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true);
    this.$nextTick(() => {
      this.getHour()
    })
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/common";
.seckillList{
  position: relative;
  overflow: hidden;
  background: #F4F4F4;
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial,"Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif;
  .tiemBox{
    height: 1rem;
    width: 100%;
    position: relative;
    bottom: 0;
    background: #fff;
    z-index: 2;
    /*overflow-x: auto;*/
    /*display: -webkit-box;*/
    /*flex-wrap: nowrap;*/
    .time{
      position: relative;
      float: left;
      width: 1.5rem;
      height: 1.16rem;
      .contentText{
        overflow: hidden;
        height: 1rem;
        p{
          text-align: center;
          color: #999;
          font-size: .24rem;
          font-weight: 500;
        }
        .textOne{
          margin-top: 0.1rem;
          font-size: .32rem;
          line-height: 0.42rem;
          font-weight: bold;
          color: #333;
        }
      }
      .triangle{
        position: absolute;
        left: calc( 50% - 0.2rem );
        width: 0;
        border-top: 0.16rem solid #FF0036;
        border-left: 0.2rem solid rgba(0, 0, 0, 0);
        border-right: 0.2rem solid rgba(0, 0, 0, 0);
      }
    }
    .times{
      width: 22.5rem;
      .active{
        background: #FF0036;
        .textColor{
          color: #fff;
        }
      }
    }
  }
  .shopList{
    position: relative;
    width: 100%;
    // padding-top: 0.35rem;
    background: #F4F4F4;
    z-index: 1;
    .oneBackColor{
      padding-top: 0.35rem;
      background:linear-gradient(0deg,rgba(247,247,247,1),rgba(255,246,213,1));
    }
    .shopItemOne{
      position: relative;
      overflow: hidden;
      width: 7.1rem;
      height: 3.7rem;
      margin-bottom: 0.2rem;
      box-sizing: border-box;
      padding: 0.2rem 0.3rem 0.2rem 0.2rem;
      margin: auto;
      margin-bottom: 0.2rem;
      background: #fff;
      border-radius: 0.2rem;
      box-shadow:0px 0.05rem 0.13rem 0px rgba(0, 0, 0, 0.12);
      .titleBox{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.05rem;
        img.titleIcon{
          width: 0.4rem;
          margin-right: 0.05rem;
        }
        span.haoText{
          font-size: 0.32rem;
          font-weight: bold;
          color: #FF0036;
        }
      }
      .shopBox{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.6rem;
        .shopImgBox{
          position: relative;
          overflow: hidden;
          width: 2.7rem;
          height: 2.7rem;
          .shopImg{
            width:0;
            height:100%;
            padding-left: 100%;
            overflow:hidden;
            background-position: center center;
            background-repeat: no-repeat;
            -webkit-background-size:cover;
            -moz-background-size:cover;
            background-size:cover;
          }
        }
        .descBox{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          width: 3.7rem;
          height: 2.7rem;
          margin-left: 0.2rem;
          p.shopTitle{
            width: 100%;
            margin-top: 0.1rem;
            margin-bottom: 0.25rem;
            display: flex;
            justify-content: center;
            align-content: center;
            img.shopTitleIcon{
              width: 0.33rem;
              height: 0.33rem;
              margin-right: 0.16rem;
            }
            span.shopTitleText{
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              box-sizing: border-box;
              height: 0.33rem;
              font-size: 0.28rem;
              font-weight: 500;
              line-height: 0.33rem;
              color: #333;
            }
          }
          .lableBox{
            width: 100%;
            margin-bottom: 0.25rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .future{
              padding: 0.1rem 0.05rem 0.1rem 0.05rem;
              font-size: 0.18rem;
              font-weight: 500;
              line-height: 0.18rem;
              color: #fff;
              border-radius: 0.05rem;
              background: #FF0036;
              margin-right: 0.2rem;
            }
            .upMoney{
              padding: 0.1rem 0.05rem 0.1rem 0.05rem;
              font-size: 0.18rem;
              font-weight: 500;
              line-height: 0.18rem;
              color: #fff;
              border-radius: 0.05rem;
              background: #9A54E9;
            }
          }
          .progressBar{
            position: relative;
            overflow: hidden;
            height: 0.26rem;
            width: 3.7rem;
            margin-bottom: 0.3rem;
            border-radius: 0.13rem;
            background: #F7F7F7;
            z-index: 1;
            span.progressBarNoText{
              position: absolute;
              display: block;
              font-size: 0.2rem;
              font-weight: 500;
              width: 1.5rem;
              height: 0.26rem;
              line-height: 0.3rem;
              text-align: left;
              color: #F59000;
              margin-left: 0.2rem;
              z-index: 1;
            }
            .progressYes{
              position: relative;
              overflow: hidden;
              height: 0.26rem;
              background: #FF0036;
              z-index: 2;
              span.progressBarText{
                position: absolute;
                display: block;
                font-size: 0.2rem;
                font-weight: 500;
                width: 1.5rem;
                height: 0.26rem;
                line-height: 0.3rem;
                text-align: left;
                color: #fff;
                margin-left: 0.2rem;
              }
            }
          }
          .ticketBox{
            position: relative;
            display: flex;
            margin-bottom: 0.05rem;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.04rem;
            padding-bottom: 0.04rem;
            border-radius: 0.03rem;
            background: linear-gradient(90deg,rgba(255,0,54,1),rgba(255,114,0,1));
            .tickLeft{
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
              margin-left: -0.05rem;
              background: #fff;
            }
            .tickText{
              margin-left: 0.05rem;
              margin-right: 0.05rem;
              font-size: 0.2rem;
              font-weight: 500;
              color: #fff;
            }
            .tickRight{
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
              margin-right: -0.05rem;
              background: #fff;
            }
          }
          .priceAndBtn{
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .priceBox{
              position: relative;
              span.newPriceIcon{
                font-size: 0.24rem;
                font-weight: bold;
                line-height: 0.5rem;
                color: #FF0036;
              }
              span.newPrice{
                font-size: 0.34rem;
                font-weight: bold;
                line-height: 0.5rem;
                color: #FF0036;
              }
              span.price{
                margin-left: 0.1rem;
                font-size: 0.2rem;
                font-weight: 500;
                line-height: 0.5rem;
                text-decoration: line-through;
                color: #C1C1C1;
              }
            }
            .robBtn{
              padding: 0.07rem 0.14rem 0.07rem 0.14rem;
              font-size: 0.28rem;
              font-weight: 500;
              line-height: 0.3rem;
              color: #fff;
              border-radius: 0.05rem;
              background: linear-gradient(90deg,rgba(255,0,54,1),rgba(255,114,0,1));
            }
          }
        }
      }
    }
    .shopItemTwo{
      position: relative;
      overflow: hidden;
      width: 7.5rem;
      height: 3.2rem;
      box-sizing: border-box;
      padding: 0.2rem 0.3rem 0.2rem 0.2rem;
      margin: auto;
      margin-bottom: 0.2rem;
      background: #fff;
      .shopBox{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7.1rem;
        .shopImgBox{
          position: relative;
          overflow: hidden;
          width: 2.7rem;
          height: 2.7rem;
          .shopImg{
            width:0;
            height:100%;
            padding-left: 100%;
            overflow:hidden;
            background-position: center center;
            background-repeat: no-repeat;
            -webkit-background-size:cover;
            -moz-background-size:cover;
            background-size:cover;
          }
        }
        .descBox{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          width: 4.4rem;
          height: 2.7rem;
          margin-left: 0.2rem;
          p.shopTitle{
            width: 100%;
            margin-top: 0.1rem;
            margin-bottom: 0.25rem;
            display: flex;
            justify-content: center;
            align-content: center;
            img.shopTitleIcon{
              width: 0.33rem;
              height: 0.33rem;
              margin-right: 0.16rem;
            }
            span.shopTitleText{
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              box-sizing: border-box;
              height: 0.33rem;
              font-size: 0.28rem;
              font-weight: 500;
              line-height: 0.33rem;
              color: #333;
            }
          }
          .lableBox{
            width: 100%;
            margin-bottom: 0.25rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .future{
              padding: 0.1rem 0.05rem 0.1rem 0.05rem;
              font-size: 0.18rem;
              font-weight: 500;
              line-height: 0.18rem;
              color: #fff;
              border-radius: 0.05rem;
              background: #FF0036;
              margin-right: 0.2rem;
            }
            .upMoney{
              padding: 0.1rem 0.05rem 0.1rem 0.05rem;
              font-size: 0.18rem;
              font-weight: 500;
              line-height: 0.18rem;
              color: #fff;
              border-radius: 0.05rem;
              background: #9A54E9;
            }
          }
          .progressBar{
            position: relative;
            overflow: hidden;
            height: 0.26rem;
            width: 3.7rem;
            margin-bottom: 0.3rem;
            border-radius: 0.13rem;
            background: #F7F7F7;
            z-index: 1;
            span.progressBarNoText{
              position: absolute;
              display: block;
              font-size: 0.2rem;
              font-weight: 500;
              width: 1.5rem;
              height: 0.26rem;
              box-sizing: border-box;
              line-height: 0.3rem;
              text-align: left;
              color: #F59000;
              margin-left: 0.2rem;
              z-index: 1;
            }
            .progressYes{
              position: relative;
              overflow: hidden;
              height: 0.26rem;
              background: #FF0036;
              z-index: 2;
              span.progressBarText{
                position: absolute;
                display: block;
                font-size: 0.2rem;
                font-weight: 500;
                width: 1.5rem;
                height: 0.26rem;
                line-height: 0.3rem;
                text-align: left;
                color: #fff;
                margin-left: 0.2rem;
              }
            }
          }
          .ticketBox{
            position: relative;
            display: flex;
            margin-bottom: 0.05rem;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.04rem;
            padding-bottom: 0.04rem;
            border-radius: 0.03rem;
            background: linear-gradient(90deg,rgba(255,0,54,1),rgba(255,114,0,1));
            .tickLeft{
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
              margin-left: -0.05rem;
              background: #fff;
            }
            .tickText{
              margin-left: 0.05rem;
              margin-right: 0.05rem;
              font-size: 0.2rem;
              font-weight: 500;
              color: #fff;
            }
            .tickRight{
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
              margin-right: -0.05rem;
              background: #fff;
            }
          }
          .priceAndBtn{
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .priceBox{
              position: relative;
              span.newPriceIcon{
                font-size: 0.24rem;
                font-weight: bold;
                line-height: 0.5rem;
                color: #FF0036;
              }
              span.newPrice{
                font-size: 0.34rem;
                font-weight: bold;
                line-height: 0.5rem;
                color: #FF0036;
              }
              span.price{
                margin-left: 0.1rem;
                font-size: 0.2rem;
                font-weight: 500;
                line-height: 0.5rem;
                text-decoration: line-through;
                color: #C1C1C1;
              }
            }
            .robBtn{
              padding: 0.07rem 0.14rem 0.07rem 0.14rem;
              font-size: 0.28rem;
              font-weight: 500;
              line-height: 0.3rem;
              color: #fff;
              border-radius: 0.05rem;
              background: linear-gradient(90deg,rgba(255,0,54,1),rgba(255,114,0,1));
            }
          }
        }
      }
    }
  }
}
</style>
