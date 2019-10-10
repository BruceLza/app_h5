<template>
  <div class="balance_box myPoints">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的{{titleInfo.credit1}}
     <!-- <a @click="jumpTo({name:'mallMyPointsList'})" slot="right"><i class="iconfont icon-iconfont02"></i></a>-->
    </x-header>
    <div class="point-msg">
      <div @click="tiDetail('credit2')">
        <div>{{ticketInfo.credit2}}</div>
        <div class="row_1">可用积分<img src="../../../../assets/img/my/wenhao.png" align="absmiddle" alt=""></div>
      </div>
      <span class="long-red"></span>
      <div @click="tiDetail('credit1')">
        <div>{{ticketInfo.credit1}}</div>
        <div class="row_1">复销积分<img src="../../../../assets/img/my/wenhao.png" align="absmiddle" alt=""></div>
      </div>
      <span class="long-red"></span>
      <div @click="tiDetail('credit4')">
        <div>{{ticketInfo.credit4}}</div>
        <div class="row_1">冻结积分<img src="../../../../assets/img/my/wenhao.png" align="absmiddle" alt=""></div>
      </div>
    </div>
    <div class="conver-sion" @click="openConver()">兑换</div>
    <div class="content" >
      <div class="header">
        <table></table>
        <p>总积分</p>
        <h3 style="font-size:5vw">
          {{ticketInfo.count}}
        </h3>
      </div>
      <div class="ticket-desc">
        <div class="row_1"><span class="long-oran"></span> 积分说明 </div>
        <div class="rich-text" v-html="ticketInfo.credit_description" ></div>
      </div>
      <!--<div class="count">
        <div class="box"  @click="jumpTo({name: 'mallDonation', query: {credittype: 'credit1'}})" v-if="jifen.attorn === 1">
          <div class="div1">
            <img src="../../../../assets/img/balance/tixian.png" alt="">
            <span>转赠</span>
          </div>
          <div class="div2">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
        <div class="box"  @click="jumpTo({name: 'mallPointsYue'})" v-if="jifen.change === 1">
          <div class="div1">
            <img src="../../../../assets/img/balance/tixian.png" alt="">
            <span>{{titleInfo.credit1}}转余额</span>
          </div>
          <div class="div2">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import * as apiHttp from '../../../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../../../utils'
export default {
  name: 'balance',
  components: {
    XHeader,
    MescrollVue
  },
  data () {
    return {
      jifen: {},
      typesInfo: {},
      titleInfo: utils.storage.get('titleInfo'),
      isShow: false,
      ticketInfo:''
    }
  },
  mounted () {
    this.getTicket()
    // 删除
    apiHttp.jifenInfo().then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.jifen = res.data
      }
    })
  },
  methods: {
    tiDetail(type){
      this.$router.push({
          path:'/mall/ticketDetail',
          query:{
            credittype:type
          }
        })
    },
    openConver(){
      this.$vux.toast.text("功能暂未开放");
        /*this.$router.push({
          path:'/mall/ticketCover'
        })*/
    },
    getTicket(){
      apiHttp.newjifenInfo().then(res => {
          if (res.code === 0) {
             this.ticketInfo = res.data
             console.log("credit1",this.ticketInfo);
          }
      })
    }
  }
}
</script>

<style lang="less">
  .point-msg{
    width:93vw;
    height:25vw;
    border-radius:10px;
    box-shadow:0px 1px 1px 1px #FFFAFA;
    position:absolute;
    background:white;
    top:35vw;
    left:3.5vw;
    display:flex;
    justify-content: space-around;
    align-items: center;

  }
  .point-msg>div{
    width:31vw;
    text-align: center;
    font-size:5vw;
    color:rgb(76,76,76);
  }
  .point-msg>div .row_1{
    color:rgb(153,153,153);
    font-size:4vw
  }
  .point-msg>div img{
    width:15px;
    height:15px;
  }
  .ticket-desc{
    width:96vw;
    padding:2vw;
    padding-top:30vw;
  }
  .ticket-desc>.row_1{
    font-size:4.5vw;
  }
  .long-oran{
    display:inline-block;
    width:5px;
    height:15px;
    background:#FF5847;
    border-radius:5px;
  }
  .long-red{
    width:1px;
    height:5vw;
    background:#FF5847;
  }
  .rich-text{
    margin-top:5vw;
    color:rgb(153,153,153);
    font-size:4vw;
  }
  .conver-sion{
    position:absolute;
    top:20vw;
    right:0;
    width:15vw;
    height:8vw;
    line-height: 8vw;
    text-align: center;
    color:#FF5847;
    font-size:4vw;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background:white
  }
</style>
