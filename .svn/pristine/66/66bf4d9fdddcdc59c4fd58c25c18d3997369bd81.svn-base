<template>
  <div class="fastrob">
    <div class="robTime">
      <p class="title">限时秒杀</p>
      <i class="iconfont icon-back" @click="$router.go(-1)"></i>
      <img class="shareBtn" src="../../assets/img/fastrob/share.png" @click="jumpTo('/invite')" alt="">
      <div class="tiemBox">
        <vueScroller lock-y :scrollbar-x=false :bounce="false">
        <div class="times" :style="{transform:LeftMove}">
          <div class="time" v-for="(item, index) of times" :key="index" @click="move(index)">
            <div class="contentText" :class="{active: active === index}">
              <p class="textOne textColor">{{item.time}}</p>
              <p v-if="newHour > index" class="textColor">已开抢</p>
              <p v-else-if="newHour < index" class="textColor">即将开始</p>
              <p v-else-if="newHour == index" class="textColor">抢购中</p>
            </div>
            <div class="triangle" v-show="active === index"></div>
          </div>
        </div>
        </vueScroller>
      </div>
    </div>
    <div class="lists">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="shopList">
        <div v-for="(item, index) in list" :key="index" :class="{oneBackColor: index == 0}">
          <div class="outTime" v-if="index == 0 && active === newHour">
            <img class="outLeftIcon" src="../../assets/img/fastrob/leftIcon.png" alt="">
            <img class="outLightningIcon" src="../../assets/img/fastrob/shandian.png" alt="">
            距离下场开始还有
            <div class="timeBox">{{endHour}}</div>:
            <div class="timeBox">{{endM}}</div>:
            <div class="timeBox">{{endS}}</div>
            <img class="outRightIcon" src="../../assets/img/fastrob/rightIcon.png" alt="">
          </div>
          <div class="shopItemOne" v-if="index == 0">
            <p class="titleBox"><img class="titleIcon" src="../../assets/img/home/haohuo.png" alt=""><span class="haoText">好货必抢</span></p>
            <div class="shopBox">
              <div class="shopImgBox">
                <div class="shopImg" :style="{backgroundImage: 'url('+ item.thumb +')'}"></div>
              </div>
              <div class="descBox">
                <p class="shopTitle">
                  <img class="shopTitleIcon" src="../../assets/img/home/tblogo.png" alt="" v-if="item.type == 11">
                  <img class="shopTitleIcon" src="../../assets/img/home/tmlogo.png" alt="" v-if="item.type == 12">
                  <span class="shopTitleText">{{item.title}}</span>
                </p>
                <div class="lableBox" v-if="item.level_commission_money && item.level_commission_money != 0">
                  <div class="future" v-if="item.commission_money">预估赚￥{{item.commission_money}}</div>
                  <div class="upMoney" v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚￥{{item.level_commission_money}}</div>
                </div>
                <div class="progressBar" v-if="newHour >= active">
                  <span class="progressBarNoText">已售{{item.couponreceive}}件</span>
                  <div class="progressYes" :style="{width:(item.couponreceive / item.couponnum) * 100 > 100 ? 100 : (item.couponreceive / item.couponnum) * 100 + '%'}">
                    <span class="progressBarText">已售{{item.couponreceive}}件</span>
                  </div>
                </div>
                <div class="progressBar" v-else="">
                  <span class="progressBarNoText">即将开始</span>
                  <div class="progressYes" :style="{width:0 * 100 > 100 ? 100 : 0 * 100 + '%'}">
                    <span class="progressBarText">即将开始</span>
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
                  <div class="robBtn" v-if="newHour >= active && item.couponreceive != item.couponnum" @click="detail(item)">马上抢</div>
                  <div class="robBtn" v-if="newHour < active">即将开始</div>
                  <div class="robBtn" v-if="item.couponreceive == item.couponnum">已抢完</div>
                </div>
              </div>
            </div>
          </div>
          <div class="shopItemTwo" v-else>
            <div class="shopBox">
              <div class="shopImgBox">
                <div class="shopImg" :style="{backgroundImage: 'url('+ item.thumb +')'}"></div>
              </div>
              <div class="descBox">
                <p class="shopTitle">
                  <img class="shopTitleIcon" src="../../assets/img/home/tblogo.png" alt="" v-if="item.type == 11">
                  <img class="shopTitleIcon" src="../../assets/img/home/tmlogo.png" alt="" v-if="item.type == 12">
                  <span class="shopTitleText">{{item.title}}</span>
                </p>
                <div class="lableBox" v-if="item.level_commission_money && item.level_commission_money != 0">
                  <div class="future" v-if="item.commission_money">预估赚￥{{item.commission_money}}</div>
                  <div class="upMoney" v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚￥{{item.level_commission_money}}</div>
                </div>
                <div class="progressBar" v-if="newHour >= active">
                  <span class="progressBarNoText">已售{{item.couponreceive}}件</span>
                  <div class="progressYes" :style="{width:(item.couponreceive / item.couponnum) * 100 > 100 ? 100 : (item.couponreceive / item.couponnum) * 100 + '%'}">
                    <span class="progressBarText">已售{{item.couponreceive}}件</span>
                  </div>
                </div>
                <div class="progressBar" v-else="">
                  <span class="progressBarNoText">即将开始</span>
                  <div class="progressYes" :style="{width:0 * 100 > 100 ? 100 : 0 * 100 + '%'}">
                    <span class="progressBarText">即将开始</span>
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
                  <div class="robBtn" v-if="newHour >= active && item.couponreceive != item.couponnum" @click="detail(item)">马上抢</div>
                  <div class="robBtn" v-if="newHour < active">即将开始</div>
                  <div class="robBtn" v-if="item.couponreceive == item.couponnum">已抢完</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Scroller as VueScroller, Panel} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'fastrobNew',
  components: {
    MescrollVue, Panel, VueScroller
  },
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
      list: [],
      LeftMove: '',
      page: 1,
      active: '',
      newHour: '',
      hour_type: '',
      finish: false,
      loading: false,
      Listlength: 0,
      newListlength: 0,
      show: true,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      mescrollUp: {
        auto: false,
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹
      setTimeObj: '',
      nextTime: '',
      endHour: '',
      endM:'',
      endS:'',
    }
  },
  methods: {
    refresh () {
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/hao/fast-buy', {
        page: page.num,
        hour_type: this.hour_type
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      })
    },
    backTop () {
      let body = document.getElementById('vux_view_box_body')
      let time = ''
      time = setInterval(() => {
        let scroll = body.scrollTop
        let speed = Math.floor(scroll / 10)
        if (speed <= 5) {
          body.scrollTop = 0
          clearInterval(time)
        } else {
          body.scrollTop = scroll - speed
        }
      }, 10)
    },
    move (i) {
      this.mescrollUp.htmlLoading = ''
      this.LeftMove = 'translateX(' + (-1.5 * (i - 2)) + 'rem)'
      this.list = []
      this.finish = false
      this.hour_type = i + 1
      this.active = i
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    getHour () {
      var time = new Date()
      var hour = time.getHours()
      var that = this
      if (hour >= 20) {
        this.active = 9
        this.newHour = 9
        this.LeftMove = 'translateX(' + (-1.5 * 7) + 'rem)'
        this.hour_type = 10
        this.nextTime = 24
      } else if (hour >= 15) {
        this.active = 8
        this.newHour = 8
        this.LeftMove = 'translateX(' + (-1.5 * 6) + 'rem)'
        this.hour_type = 9
        this.nextTime = 20
      } else if (hour >= 12) {
        this.active = 7
        this.newHour = 7
        this.LeftMove = 'translateX(' + (-1.5 * 5) + 'rem)'
        this.hour_type = 8
        this.nextTime = 15
      } else if (hour >= 10) {
        this.active = 6
        this.newHour = 6
        this.LeftMove = 'translateX(' + (-1.5 * 4) + 'rem)'
        this.hour_type = 7
        this.nextTime = 12
      } else {
        this.active = 5
        this.newHour = 5
        this.LeftMove = 'translateX(' + (-1.5 * 3) + 'rem)'
        this.hour_type = 6
        this.nextTime = 10
      }
      that.setTimeObj = setInterval(() => {
        that.setEndTime(that.nextTime)
      },1000)
      this.mescroll.resetUpScroll()
    },
    setEndTime(endTime) {
      var time = new Date()
      // var endTimeNumber = new Date(time.getFullYear() + '-'+ (time.getMonth() + 1) +'-'+ time.getDate()+ ' '+ endTime + ':00')
      var newS = parseInt(endTime*3600 - time.getHours()*3600-time.getMinutes() * 60 - time.getSeconds())
      if(newS < 0) {
        this.getHour()
        return
      }
      this.endS = newS%60
      if (this.endM = parseInt(newS%3600 / 60) < 10) {
        this.endM = '0' + parseInt(newS%3600 / 60)
      } else {
        this.endM = parseInt(newS%3600 / 60)
      }
      if (this.endM = parseInt(newS%3600 / 60) < 10) {
        this.endM = '0' + parseInt(newS%3600 / 60)
      } else {
        this.endM = parseInt(newS%3600 / 60)
      }
      this.endHour = '0' + parseInt(newS/3600)
    },
    detail (item) {
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0&way=1')
    }
  },
  mounted () {
    // 删除
    this.$nextTick(() => {
      this.getHour()
    })
  },beforeDestroy() {
    var That = this
    if(That.setTimeObj) {
      clearTimeout(That.setTimeObj)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
  .fastrob{
    position: relative;
    height: 100%;
    background: #fff;
    width: 100%;
    ._v-container{
    }
    .high{
      background: @h-col;
      height: .1rem;
      width: 100%;
    }
    .robTime{
      position: absolute;
      top: 0;
      height: 1.7rem;
      width: 100%;
      // overflow: hidden;
      .title{
        position: absolute;
        left: 0;
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        text-align: center;
        color: #333;
        font-size: .36rem;
      }
      .icon-back{
        position: absolute;
        top: -0.2rem;
        color: #666;
        font-size: .4rem;
        line-height: .88rem;
        padding: .2rem;
      }
      .shareBtn{
        position: absolute;
        top: 0.29rem;
        right: 0.25rem;
        width: 0.3rem;
        height: 0.3rem;
      }
      .tiemBox{
        height: 1rem;
        width: 100%;
        position: absolute;
        bottom: -0.16rem;
        background: #fff;
        z-index: 2;
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
    }
    .lists{
      position: absolute;
      top: 1.86rem;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 0.3rem;
    }
    .shopList{
      position: relative;
      width: 100%;
      background: #fff;
      z-index: 1;
      .oneBackColor{
        padding-top: 0.35rem;
        background:linear-gradient(0deg,rgba(255,255,255,1),rgba(255,246,213,1));
        .outTime{
          position: relative;
          width: 100%;
          height: 0.38rem;
          font-size: 0.24rem;
          font-weight: 500;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.2rem;
          .outLeftIcon{
            width: 0.36rem;
            height: 0.06rem;
            margin-right: 0.2rem;
          }
          .outLightningIcon{
            width: 0.18rem;
            height: 0.24rem;
            margin-right: 0.04rem;
          }
          .timeBox{
            width: 0.38rem;
            height: 0.38rem;
            margin-left: 0.05rem;
            margin-right: 0.05rem;
            font-size: 0.24rem;
            font-weight: 500;
            line-height: 0.38rem;
            color: #fff;
            text-align: center;
            background: #333;
            border-radius: 0.07rem;
          }
          .outRightIcon{
            width: 0.36rem;
            height: 0.06rem;
            margin-left: 0.2rem;
          }
        }
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
              .progressBarNoText{
                position: absolute;
                display: block;
                font-size: 0.2rem;
                font-weight: 500;
                width: 1.5rem;
                height: 0.26rem;
                line-height: 0.32rem;
                color: #F59000;
                text-align: left;
                margin-left: 0.2rem;
                z-index: 1;
              }
              .progressYes{
                position: relative;
                overflow: hidden;
                height: 0.26rem;
                background: #FF0036;
                z-index: 2;
                .progressBarText{
                  position: absolute;
                  display: block;
                  font-size: 0.2rem;
                  font-weight: 500;
                  width: 1.5rem;
                  height: 0.26rem;
                  line-height: 0.32rem;
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
              .progressBarNoText{
                position: absolute;
                display: block;
                font-size: 0.2rem;
                font-weight: 500;
                width: 1.5rem;
                height: 0.26rem;
                line-height: 0.32rem;
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
                .progressBarText{
                  position: absolute;
                  display: block;
                  font-size: 0.2rem;
                  font-weight: 500;
                  width: 1.5rem;
                  height: 0.26rem;
                  line-height: 0.32rem;
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
