<template>
    <div class="profit">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        我的收益
        <span class="save" slot="right" style="color:#666;" @click="jumpTo('/profitDetail')">明细</span>
      </x-header>
      <div class="withdraw-box">
        <div class="withdraw-top">
          <div class="withdrawable-money">
            <p >淘客到账积分</p>
            <div style="text-align:center"><img src="../../assets/img/my/jinbi.png"><span class="price-style-1"><span class="price-symbols"></span>{{data.credit3}}</span></div>
          </div>
          <!--<button @click="jumpTo('/withdraw')">去提现 <i class="iconfont icon-right"></i></button>-->
        </div>
        <div class="detail-list shadow flex space-around">
          <div class="right-border">
            <p>累计到账</p>
            <p>{{data.sum_price}}</p>
          </div>
          <!--<div class="right-border">
            <p>已提现</p>
            <p>{{data.withdraw}}</p>
          </div>-->
          
          <div>
            <p>待结算</p>
            <p>{{data.unliquidated}}</p>
          </div>
        </div>
      </div>
      <tab :line-width="2" custom-bar-width=".4rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type">
        <tab-item @on-item-click="reset(0)"><p>淘宝</p><p>({{data.tb_sum_price}})</p></tab-item>
        <tab-item @on-item-click="reset(1)"><p>京东</p><p>({{data.jd_sum_price}})</p></tab-item>
        <tab-item @on-item-click="reset(2)"><p>拼多多</p><p>({{data.pdd_sum_price}})</p></tab-item>
      </tab>
      <div class="balance-info shadow flex space-around list">
        <div class="right-border">
          <p><span>结算收益</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '结算收益', content:data.remind1})"></p>
          <p>{{data.last_month_payment}}</p>
          <p>上月收益</p>
        </div>
        <div class="right-border">
          <p><span>预估收益</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '预估收益', content:data.remind2})"></p>
          <p>{{data.thismonth_Settlement}}</p>
          <p>本月收益</p>
        </div>
        <div>
          <p><span>预估收益</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '预估收益', content:data.remind3})"></p>
          <p>{{data.last_month_Settlement}}</p>
          <p>上月收益</p>
        </div>
      </div>
      <div class="time-info shadow list">
        <div class="today flex space-around bottom-border">
          <div class="right-border">
            <img src="../../assets/img/my/mt1.png">
            <p><span>付款笔数</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '今日付款笔数', content:data.remind4})"></p>
            <p>{{data.today_payment}}</p>
          </div>
          <div>
            <img src="../../assets/img/my/mo1.png">
            <p><span>预估收益</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '今日预估收益', content:data.remind5})"></p>
            <p>{{data.today_payment_share}}</p>
          </div>
        </div>
        <div class="yesterday flex space-around">
          <div class="right-border">
            <img src="../../assets/img/my/mts1.png">
            <p><span>付款笔数</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '昨日付款笔数', content:data.remind6})"></p>
            <p>{{data.yesterday_payment}}</p>
          </div>
          <div>
            <img src="../../assets/img/my/mo2.png">
            <p><span>预估收益</span> <img src="../../assets/img/my/wenti.png" @click="showAlertDiy({title: '昨日预估收益', content:data.remind7})"></p>
            <p>{{data.yesterday_share}}</p>
          </div>
        </div>
      </div>
      <div v-if="data.remind8" v-html="data.remind8" class="desc"></div>
      <div v-transfer-dom>
        <x-dialog v-model="showDialogStyle" mask-transition="vux-fade" :dialog-style="{'max-width': '100%', width: '100%', 'background-color': 'transparent'}">
          <div class="alert-diy">
            <div class="title">{{alertTitle}}</div>
            <div class="content">{{alertContent}}</div>
            <p @click="showDialogStyle=false">知道啦</p>
          </div>
        </x-dialog>
      </div>
    </div>
</template>

<script>
import {Tab, TabItem, XDialog, TransferDom} from 'vux'
export default {
  name: 'profit',
  components: {
    Tab, TabItem, XDialog
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      data: '',
      type: 0,
      showDialogStyle: false,
      alertTitle: '',
      alertContent: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    showAlertDiy (data) {
      this.alertTitle = data.title
      this.alertContent = data.content
      this.showDialogStyle = true
    },
    reset (type) {
      this.type = type
      this.getInfo()
    },
    getInfo () {
      this.$http.post('/amoy/user/total-income', {
        order_type: Number(this.type) + 1
      }, true).then((res) => {
        this.data = res.data
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
<style lang="less">
  .profit{
    .vux-header{
      position: absolute !important;
    }
    .vux-tab-wrap{
      .vux-tab-container{
        height: 1.2rem;
        .vux-tab{
          border-radius: .2rem;
          height: 1.2rem;
          box-shadow: 0px 1px 20px 0px rgba(149,149,149,0.1);
        }
      }
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.price-style-1{
  padding-top: .2rem;
  font-size: .46rem;
  .price-symbols{
    font-size: .5em;
  }
}
.flex{
  display: flex;
}
.space-around{
  justify-content: space-around;
}
.profit{
  padding-top: 0.88rem;
  width: 100%;
  background: #f7f7f7;
  .vux-tab-wrap{
    margin: 0.88rem .2rem 0;
    color: red;
    padding-top: 1.2rem;
    .vux-tab{
      .vux-tab-item{
        display: flex;
        flex-direction: column;
        padding: .2rem;
        justify-content: center;
        background: none;
        p{
          line-height: 1.5em;
        }
        p:first-child{
          font-size: .3rem;
          color: #333;
        }
        p:last-child{
          font-size: .24rem;
          color: #999;
        }
      }
    }
  }
  .withdraw-box{
    background: linear-gradient(237deg,rgba(58,47,44,1),rgba(86,73,61,1));
    color: #DAAE81;
    .withdraw-top{
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-top: .79rem;
      .withdrawable-money{
        p{
          font-size: .28rem;
        }
        img{
          height: .4rem;
        }
        .price-style-1{
          font-size: .46rem;
        }
      }
      button{
        height: .52rem;
        line-height: .52rem;
        display: flex;
        align-items: center;
        font-size: .26rem;
        border:1px solid #DAAE81 ;
        color: inherit;
        background: none;
        border-radius: .52rem;
        width: auto;
        padding:0 .21rem 0;
        .iconfont{
          font-size: .16rem;
        }
      }
    }
    .detail-list{
      background: white;
      border-radius: .2rem;
      font-size: .28rem;
      height: 0.84rem;
      padding: .19rem 0;
      text-align: center;
      margin: 0 .2rem;
      bottom: -.62rem;
      position: relative;
      div{
        flex-grow: 1;
        p{
          line-height: 1.5em;
        }
      }
    }
  }
  .balance-info{
    font-size: .28rem;
    padding: .39rem 0;
    margin: 0 .2rem;
    div{
      flex-grow: 1;
      p{
        img{
          height: .28rem;
          margin-left: .1rem;
        }
      }
      p:first-child{
        font-size: .28rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p:nth-child(2){
        font-size: .32rem;
      }
      p:nth-child(3){
        color: #999;
      }
    }
  }
  .time-info{
    font-size: .28rem;
    margin: 0 .2rem;
    >div{
      position: relative;
      padding: .39rem 0;
      >div{
        font-size: .3rem;
        flex-grow: 1;
        >img{
          height: .8rem;
        }
        p{
          img{
            height: .28rem;
            margin-left: .1rem;
          }
        }
        p:nth-child(2){
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    >div:before{
      position: absolute;
      left: 0;
      top: .21rem;
      font-size: .26rem;
      color: #DAAE81;
      line-height: .46rem;
      border-radius: 0 .46rem .46rem 0;
      box-shadow:0px 2px 10px 0px rgba(163,163,163,0.3);
      width: .9rem;
    }
    .today:before{
      content: '今日';
    }
    .yesterday:before{
      content: '昨日';
    }
  }
  .list{
    background: #fff;
    margin: .26rem .2rem;
    border-radius: .2rem;
    text-align: center;
  }
  .desc{
    margin: 0 .2rem;
  }
}
.shadow {
  box-shadow: 0px 1px 20px 0px rgba(149,149,149,0.1);
}
.right-border {
  box-sizing: border-box;
  border-right: 1px solid #eee;
}
.bottom-border {
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.alert-diy{
  background: white;
  border-radius: .2rem;
  font-size: .3rem;
  width: 5.7rem;
  margin: 0 auto;
  padding: .5rem 0 .38rem;
  text-align: center;
  .title{
    font-size: .34rem;
  }
  .content{
    word-break: break-all;
    padding: 0 .2rem;
  }
  p{
    color: #3B92F5;
  }
}
</style>
