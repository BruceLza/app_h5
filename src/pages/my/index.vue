<template>
  <div id="my" class="tbkMy">
    <mescroll-vue ref="mescroll"  :down="mescrollDown"  @init="mescrollInit">
    <div v-if="moneyBoxBj" class="moneyBoxBj" :style="{background: moneyBoxBj,height:settingH + 4.3+'rem'}"></div>
    <div v-else class="moneyBoxBj" :style="{background: '#FF4466',height:settingH + 4.3+'rem'}"></div>
    <div class="moneysBox">
      <img src="../../assets/img/my/setting.png" :style="{top: settingH + 0.15 + 'rem'}" alt="" class="setting" @click="jumpTo('/info')">
      <div class="headBox" :style="{marginTop: settingH + 0.6 + 'rem'}">
        <img v-if="headBoxBjImg" class="headBoxBjImg" :src="headBoxBjImg" alt="">
        <img v-else class="headBoxBjImg" src="../../assets/img/my/usernamebj.png" alt="">
        <div class="top">
          <div class="avater"  :style="{backgroundImage: 'url(' + data.avatar + ')'}" v-if="data && data.avatar" @click="jumpTo('/info')">
          </div>
          <div class="avater" v-else @click="jumpTo('/info')">
          </div>
          <div class="isLogoBox">
            <div class="logoTitleBox">
              <p class="name" v-if="data">{{data.nickname}}</p>
              <div class="lv" v-if="data"><img src="../../assets/img/my/newLv.png" alt=""><span>{{data.lv}}</span></div>
              <p class="name" v-else @click="jumpTo('wechatLogin')">
                <span v-if="moneyBoxBj" :style="{color: moneyBoxBj}">登录/注册</span>
                <span v-else style="color: #FF4466">登录/注册</span>
              </p>
            </div>
            <p class="invite"   v-if="data && data.invite_code"><span>邀请码：</span><span>{{data.invite_code}}</span><span class="copyObj" @click="onCopy(data.invite_code)">复制</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p-walfare" @click="jumpTo('/pwelfare')">我的公益金</span></p>
          </div>
        </div>
        <div class="balanceOuterBox">
          <div v-if="moneyBoxBj" class="balanceOuterBoxBj" :style="{boxShadow: 0 +'px ' + 3 + 'px '+49+'px ' + 2 + 'px ' + moneyBoxBj}"></div>
          <div v-else class="balanceOuterBoxBj" :style="{boxShadow: 0 +'px ' + 3 + 'px '+49+'px ' + 2 + 'px ' + '#FF4466'}"></div>
          <!-- <img class="balanceOuterBoxBj" src="../../assets/img/my/usermoneybj.png" alt=""> -->
          <div class="balanceInsideBox" style="background: #333333;">
            <!--<div class="balanceTextBox">
              <p class="balanceTitleNum" style="color: #FFC962;">余额: ￥<span v-if="data && data.credit3">{{data.credit3}}</span><span v-else>0.00</span></p>
              <div class="balanceDesc" style="color: #D9CBB0;" v-if="data && data.withdraw_mode"><span>每月{{data.withdraw_mode}}号可提现上月结算收益</span><img class="balanceDescIcon" src="../../assets/img/my/jinr.png" alt=""></div>
            </div>
            <div class="outMoneyBtn" style="background: linear-gradient(-90deg,rgba(255,201,98,1),rgba(255,217,145,1));color: #333333;" @click="jumpTo('/withdraw')">立即提现</div>-->
            <div class="flex-balance">
              <div>CEO:{{hceo.user.ceo_num}}</div>
              <div class="do-ticket">
                <span @click="openConver()">兑换</span>
                <span @click="openConver(1)">转出</span>
                <span @click="openConver(2)">转换</span>
              </div>
            </div>
         </div>
        </div>
      </div>
        <div class="header">
          <div class="row_1"></div>
          <p>总积分</p>
          <div style="font-size:5vw">
            {{ticketInfo.count}}
          </div>
          <div class="point-msg-t">
            <div @click="tiDetail('credit2')">
              <div class="p-num">{{ticketInfo.credit2}}</div>
              <div class="row_1">可用积分<img src="../../assets/img/my/wenhao.png" align="absmiddle" alt=""></div>
            </div>
            <span class="long-red"></span>
            <div @click="tiDetail('credit1')">
              <div class="p-num">{{ticketInfo.credit1}}</div>
              <div class="row_1">消费积分<img src="../../assets/img/my/wenhao.png" align="absmiddle" alt=""></div>
            </div>
            <span class="long-red"></span>
            <div @click="tiDetail('credit4')">
              <div class="p-num">{{ticketInfo.credit4}}</div>
              <div class="row_1">冻结积分<img src="../../assets/img/my/wenhao.png" align="absmiddle" alt=""></div>
            </div>
        </div>
        </div>
        <!--<div  style="text-align:center"> <span @click="jumpTo('/stockEarn')">股东收益</span> <span @click="jumpTo('/ticketExchange')">积分兑换</span></div>-->

      <template v-for="item of myContent">
        <edit-slide v-if="item.name === 'edit-slide' && slide"  :data="item.params" ref="editSlide" :key="item.id" ></edit-slide>
        <component v-if="item.name !== 'edit-slide' && item.name !== 'edit-my-header'" v-bind:is="item.name" :money="data" :data="item.params" :key="item.id"></component>
      </template>

    </div>
    </mescroll-vue>
  </div>
</template>

<script>
import {Group, Cell} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import EditSlide from '../../components/EditSlide'
import EditNav from '../../components/EditNav'
import EditBlank from '../../components/EditBlank'
import EditRichText from '../../components/EditRichText'
import EditText from '../../components/EditText'
import EditImg from '../../components/EditImg'
import EditCube from '../../components/EditCube'
import EditNavGroup from '../../components/EditNavGroup'
import EditNavGroup2 from '../../components/EditNavLine'
import EditMyEarnings from '../../components/EditNavMoney'
export default {
  name: 'my',
  components: {
    Group,
    Cell,
    MescrollVue,
    EditSlide,
    EditNav,
    EditBlank,
    EditRichText,
    EditImg,
    EditCube,
    EditText,
    EditNavGroup,
    EditNavGroup2,
    EditMyEarnings
  },
  data () {
    return {
      headBoxBjImg: '',/* 个人信息卡的背景图 */
      balanceOuterBoxBj: '',/* 余额框的背景图 */
      moneyBoxBj: '',/* 背景色 */
      slide: true,
      settingH: '',
      data: '',
      profit: '',
      list: '',
      show: '',
      cate: '',
      hceo:'',
      ticketInfo:'',
      mescroll: null,
      mescrollDown: {
        use: !!this.$store.state.user.token,
        auto: false,
        callback: this.getInfo,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹,
      model: null,
      signInfo: ''
    }
  },

  computed: {
    myContent () {
      var that = this
      var infoList = that.$store.state.global.myContent
      console.log(that.$store.state.global.myContent)
      if(infoList){
        for (let i = 0; i < infoList.length; i++) {
          if(infoList[i].name == 'edit-my-header') {
            that.headBoxBjImg = infoList[i].params.bg
            that.moneyBoxBj = infoList[i].params.bgColor
          }
        }
      }
      return this.$store.state.global.myContent
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.slide = false
      vm.$nextTick(() => {
        vm.slide = true
      })
    })
  },
  methods: {
    showLogin () {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      let that = this
      let aliBC = api.require('aliBC')
      aliBC.asyncInit({
      }, function (ret, err) {
        if (ret.status) {
          let aliBC = api.require('aliBC')
          aliBC.showLogin(function (ret, err) {
            if (ret.status) {
              that.$vux.toast.text('授权成功')
            } else {
              that.$vux.toast.text(err.message)
            }
          })
        }
      })
    },
    getTicket(){
      this.$http.post('/amoy/user/user-credits', {}, false, true).then((res) => {
          if (res.code === 0) {
             this.ticketInfo = res.data
          }
      })
    },
     tiDetail(type){
      this.$router.push({
          path:'/mall/ticketDetail',
          query:{
            credittype:type
          }
        })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    other (item) {
      this.$router.push('/help?title=' + item.title + '&type=' + item.id)
    },
    carryCash () {
      this.$router.push('/withdraw')
    },
    onCopy (code) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: code
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', code)
          that.$vux.toast.text('复制成功')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    openConver(isout){
      if(isout==2){
        this.$router.push({
          path:'/ticketExchange',
          query:{
            isout : isout
          }
        })
      }else {
        this.$router.push({
          path:'/outTicketCover',
          query:{
            isout : isout
          }
        })
      }
    },
    getInfo () {
      if (this.$store.state.user.token) {
        this.$http.post('/amoy/user/user-info', {}).then(res => {
          if (res.code === 0) {
            this.data = res.data
            utils.storage.set('signInfo', res.data.creditTitleInfo)
            this.$store.commit('setUserInfo', res.data)
            this.$store.commit('setCouponpassMoney', res.data.couponpass_money)
            this.mescroll.endSuccess(res.data.length)
          }
        }).catch((e) => {
          this.mescroll.endErr()
        })
      }
      this.$http.post('/mall/ceo/ceo-price', {}, false, true).then((res) => {
        if (res.code === 0) {
          this.hceo = res.data

        }
      })
      this.$http.post('/amoy/user/user-credits', {}, false, true).then((res) => {
          if (res.code === 0) {
             this.ticketInfo = res.data
          }
      })
      this.$http.post('/amoy/user/get-cate', {}, false, true).then((res) => {
        if (res.code === 0) {

          this.cate = res.data
        }
      })
      this.$http.post('/amoy/app/design', {
        type: 2,
        version: api.appVersion,
        device: (api.systemType === 'android') ? 1 : 2
      }, true, true).then(res => {
        if (res.code === 0 && res.data.content) {
          this.$store.commit('setMyContent', JSON.parse(res.data.content))
        }
      })
    }
  },
  activated () {
    this.data = this.$store.state.user.userInfo
    this.getInfo()
    //this.getTicket()
  },
  mounted () {
    this.getTicket()
    let size = (document.documentElement.clientWidth / 7.5)
    this.settingH = (api.safeArea.top / size)
  }
}
</script>
<style scoped>
  /* #my{
    .moneysBox{
      .EditNav{
        .allBox{
          border-radius: 10px;
          .allList{
            padding: 0.3rem 0;
            img{
              // width: .6rem;
              // height: .6rem;
              border-radius: 0;
              margin-bottom: 0.2rem;
            }
          }
        }
      }
    }
  } */
  .new-ticket{
    width:95vw;
    height:30vw;
    border-radius:10px;
    box-shadow:0px 1px 1px 1px #FFFAFA;
    background:white;
    font-size:4vw;
    z-index:1000
  }
  .total-t{
    padding-top:2vw;
    text-align: center;

  }
  .point-msg-t{
    width:90vw;
    display:flex;
    height:20vw;
    border-radius:15px;
    justify-content: space-around;
    align-items: center;
    background:white;
   /* position:absolute;
    top:80vw;*/
    margin-bottom:5vw;
    margin-top:0px;
    margin-left:5vw;
  }
  .point-msg-t>div{
    width:31vw;
    text-align: center;
    color:#333
  }
  .point-msg-t>div .row_1{
    color:#333;
    font-size:3vw
  }
  .point-msg-t>div img{
    width:15px;
    height:15px;
  }
  .long-red{
    width:1px;
    height:5vw;
    background:#FF5847;
  }
  .flex-balance{
    color:rgb(241,191,93);
    font-size:3.5vw;
    display:flex;
    width:90vw;
    justify-content: space-around;
    align-items: center;
    margin:0 auto
  }
  .flex-balance .do-ticket span{
    border:1px solid rgb(241,191,93);
    padding:1px;
    padding-left:2vw;
    padding-right:2vw;
    border-radius:5px;
  }

  .header{
      height:2.2rem;
      width:100vw;
      margin-left:-3vw;
      background:url("../../assets/img/balance/bg1.png");
      background-size:cover;
      color:#fff;
      text-align: center;
      margin-top:5vw;
      margin-bottom:10vw;
  }
  .header .p-num{
    color:rgb(255, 68, 102)
  }
 .header>.row_1{
   height:3vw;
 }
</style>
<style lang="less">
  .tbkMy{
    position: relative;
    overflow: hidden;
    .mescroll{
      position: relative;
      bottom: 0 !important;
    }
  }

  #my{
    /*._v-content{*/
      /*padding-bottom: 30px;*/
    /*}*/

    .vux-cell-primary{
      line-height: .4rem;
      margin-left: .2rem;
      .vux-label{
        font-size: .28rem;
      }
    }
    .weui-cells{
      margin-top: 0;
      .weui-cell:before{
        right: 15px;
      }
    }
    .weui-cells:after,.weui-cells:before{
      display: none;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.tops{
  padding-top: 2px;
}
#my{
  position: relative;
  height: 100%;
  background: #f7f7f7;
  .moneyBoxBj{
    position: absolute;
    width: 100%;
  }
  .moneysBox{
    // background: url("../../assets/img/my/mybg.png") no-repeat;
    background-size: contain;
    font-size: 0.3rem;
    position: relative;
    padding: .2rem;
    z-index: 100;
    /*background-color: #fff;*/
    .setting{
      position: absolute;
      right: .3rem;
      width: .4rem;
      top: .3rem;
    }
    .headBox{
      position: relative;
      margin-top: 1rem;
      width: 100%;
      height: 3.5rem;
      margin-bottom: 0rem;
      background: linear-gradient(to right, #fcb798, #fc9298);
      border-radius: .2rem;
      text-align: center;
      .headBoxBjImg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3.5rem;
      }
      .top{
        border-radius: .2rem;
        // background: #fff;
        height: 2.2rem;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .avater{
          width: 1rem;
          height: 1rem;
          margin-left: 0.38rem;
          border-radius: 50%;
          border: .08rem solid #fff;
          background-size: cover;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('../../assets/img/my/avater.png');
          position: relative;
          /* position: absolute;
          top: -0.5rem;
          left: 50%;
          transform: translate(-50%, 0); */
        }
        .isLogoBox{
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .logoTitleBox{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .name{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 188px;
              height: 0.6rem;
              box-sizing: border-box;
              font-size: .32rem;
              color: #333;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding: 0.04rem 0.2rem 0.04rem;
            }
            .lv{
              padding: 0 .1rem;
              // position: absolute;
              // left: 0.9rem;
              // bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: .2rem;
              height: .34rem;
              border: 1px solid #FF4466;
              background: #fff;
              border-top-left-radius: 0.2rem;
              border-bottom-right-radius: 0.2rem;
              span{
                font-size: .2rem;
                word-break: keep-all;
                white-space: nowrap;
                color: #FF4466;
              }
              img{
                width: .25rem;
                height: .25rem;
                margin-right: 0.05rem;
              }
            }
          }
          .invite{
            width: 100%;
            margin-top: 0.15rem;
            box-sizing: border-box;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            display: flex;
            justify-content: flex-start;
            font-size: .26rem;
            .p-walfare{
              background:rgb(242,58,62);
              color:white;
              padding-left:1vw;
              padding-right:1vw;
              border-radius:5px;
            }
            .copyObj{
              display: flex;
              align-items: center;
              background: #FFB0BE;
              color: #FF4061;
              height: .4rem;
              box-sizing: border-box;
              font-size: .22rem;
              line-height: 0.22rem;
              border-radius: .2rem;
              padding: 0.09rem 0.2rem 0.09rem 0.2rem;
              margin-left: .2rem;
            }
          }
        }
        .profitBox{
          overflow: hidden;
          position: absolute;
          left: 0;
          bottom: 0;
          border-top: 1px solid #EEEEEE;
          padding: 0.1rem 0;
          height: 1rem;
          width: 100%;
          display: flex;
          .profit{
            flex: 1;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            position: relative;
            p:first-of-type{
              font-size: .32rem;
              color: #FF5847;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: center;
              margin-bottom: 0.1rem;
            }
            p:last-of-type{
              text-align: center;
              font-size: .24rem;
              color: #666;
            }
          }
          .profit:after{
            content: '';
            height: 80%;
            position: absolute;
            top: 10%;
            right: 0;
            border-right: 1px solid #dadada;
            transform-origin: 0 0;
            transform: scaleX(.5);
          }
          .profit:last-of-type:after{
            display: none;
          }
        }
      }
      .bot{
        height: .8rem;
        padding: 0 0.5rem 0 0.2rem;
        width: 100%;
        line-height: 1rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        position: relative;
        color: #fff;
        div:nth-child(1){
          height: .8rem;
          display: flex;
          align-items: center;
          float: left;
          span:nth-child(2){
            color: #FF5847;
            margin-left: 0.2rem;
          }
        }
        div:nth-child(2){
          height: .8rem;
          float: right;
          font-size: 0.24rem;
          display: flex;
          align-items: center;
        }
        .look{
          display: inline-block;
          margin-right: 0.1rem;
        }
      }
      .bot:after{
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #fff;
        border-style: solid;
        -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
        transform: matrix(.71,.71,-.71,.71,0,0);
        position: absolute;
        top: 50%;
        margin-top: -5px;
        right: .2rem;
      }
      .balanceOuterBox{
        position: absolute;
        overflow: hidden;
        width: 7.5rem;
        height: 0.96rem;
        left: calc(50% - 3.75rem);
        bottom: -2px;
        z-index: 1000;
        .balanceOuterBoxBj{
          position: absolute;
          width: 8rem;
          height: 1.28rem;
          left: calc( 50% - 4rem );
          top: 0.4rem;
          background: #f7f7f7;
          border-top-right-radius: 100%;
          border-top-left-radius: 100%;
        }
        .balanceInsideBox{
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 6.52rem;
          height: 0.96rem;
          margin: auto;
          border-radius: 0.48rem;
          .balanceTextBox{
            margin-left: 0.38rem;
            .balanceTitleNum{
              text-align: left;
              font-size: 0.3rem;
              font-weight: 500;
              line-height: 0.5rem;
            }
            .balanceDesc{
              display: flex;
              height: 0.24rem;
              justify-content: flex-start;
              align-items: center;
              font-size: 0;
              span{
                display: block;
                height: 0.24rem;
                font-size: 0.18rem;
                font-weight: 400;
              }
              .balanceDescIcon{
                width: 0.08rem;
                height: 0.11rem;
                margin-left: 0.1rem;
              }
            }
          }
          .outMoneyBtn{
            margin-right: 0.3rem;
            width: 1.29rem;
            height: 0.4rem;
            box-sizing: border-box;
            padding-top: 0.09rem;
            padding-bottom: 0.08rem;
            border-radius: 0.2rem;
            font-size: 0.23rem;
            font-weight: 400;
            line-height: 0.23rem;
            text-align: center;
          }
        }
      }
    }
    .profitBox{
       overflow: hidden;
       padding: 0.4rem 0;
       height: 1rem;
       width: 100%;
       .profit{
         width: 33.33%;
         float: left;
         justify-content: center;
         text-align: center;
         flex-direction: column;
         position: relative;
         p:first-of-type{
           font-size: .32rem;
           color: #fc3357;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           text-align: center;
           margin-bottom: 0.1rem;
         }
         p:last-of-type{
           text-align: center;
           font-size: .24rem;
           color: #666;
         }
       }
       .profit:after{
         content: '';
         height: 80%;
         position: absolute;
         top: 10%;
         right: 0;
         border-right: 1px solid #dadada;
         transform-origin: 0 0;
         transform: scaleX(.5);
       }
       .profit:last-of-type:after{
         display: none;
       }
     }
    .option{
      width: 100%;
      padding: 0.26rem 0 0;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      >div{
        margin-bottom: .4rem;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        div:nth-child(1){
          width: 0.36rem;
          height: 0.36rem;
          margin: 0 auto;
          margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .orderBox{
      background: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      padding-bottom: .26rem;
      div{
        margin-bottom: 0;
      }
    }
    .imgsBox{
      margin-top: 0.2rem;
      width: 100%;
      /*height: 1.15rem;*/
      img{
        width: 100%;
        height: 100%;
      }
    }
    .upgrade{
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      div{
        float: left;
      }
      div:nth-child(1){
        width: 1.2rem;
        height: 1.2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2){
        margin-left: 0.3rem;
        font-size: 0.28rem;
        padding-top: 0.1rem;
        color: black;
        p:nth-child(2){
          font-size: 0.24rem;
          color: #999999;
          margin-top: 0.14rem;
        }
      }
      div:nth-child(3){
        float: right;
        height: 100%;
        line-height: 1.2rem;
      }
    }
    .grow{
      height: 3.6rem;
      width: 100%;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 10px;
      .title{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        line-height: 1rem;
        div:nth-child(1){
          float: left;
          font-size: 0.3rem;
        }
        div:nth-child(2){
          float: right;
          color: #999;
          font-size: 0.24rem;
          span:nth-child(1){
            margin-right: 0.1rem;
          }
        }
      }
      .imgsbox{
        width: 100%;
        height: 2.6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
#my{
    .moneysBox{
      /deep/.EditNav{
        /deep/.allBox{
          border-radius: 10px;
          /deep/.allList{
            padding: 0.3rem 0;
            img{
              width: .85rem !important;
              height: .85rem !important;
              border-radius: 0;
              margin-bottom: 0.2rem;
            }
          }
        }
      }
    }
  }
</style>
