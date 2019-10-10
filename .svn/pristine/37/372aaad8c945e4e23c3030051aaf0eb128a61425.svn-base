<template>
  <div class="ticket-conver">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      积分兑换
     <!-- <a @click="jumpTo({name:'mallMyPointsList'})" slot="right"><i class="iconfont icon-iconfont02"></i></a>-->
    </x-header>
    <!--区块币走势-->
    <!--<div class="curr-trand">

    </div>
    <div class="trand">币价走势图</div>-->
    <!--兑换-->
    <div v-if="isout" class="cover-msg">
        <div class="row_2">
          <div>转出数量 &nbsp;&nbsp; <input type="text" v-model="outcount"> &nbsp;&nbsp; 积分</div>
          <div v-if="addre">钱包地址 &nbsp;&nbsp; <input type="text" v-model="addre" readonly> &nbsp;&nbsp; 个</div>
          <div v-else>钱包地址 &nbsp;&nbsp; <input type="text" v-model="addre"> &nbsp;&nbsp; 个</div>
        </div>
    </div>
    <div v-else class="cover-msg">
        <div class="row_1">可兑换积分数量: <span class="s-1">{{userTicket.user.credit2}}</span>  </div>
        <div class="row_2">
          <div>需要积分 &nbsp;&nbsp; <input type="text" v-model="ticket"> &nbsp;&nbsp; 积分</div>
          <div>兑换数量 &nbsp;&nbsp; <input type="text" v-model="count"> &nbsp;&nbsp; 个</div>
        </div>
        <div @click="coverTicket()" class="confirm-cover">确认兑换</div>
    </div>
    <div class="cover-rule" v-html="userTicket.rules">

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
     echart:[],
     count:'',
     ticket:'',
     userTicket:'',
     price:'',
     isout:this.$route.query.id,
     outcount:'',
     addre:''
    }
  },
  mounted () {
    this.getTicket()
  },
  watch:{
      ticket(){
        this.count = parseFloat(this.ticket)*parseFloat(this.price)
        this.count = this.count.toFixed(8)
      }
  },
  methods: {
    coverTicket(){
      this.$vux.toast.text('该功能暂未开放')
      /*apiHttp.coverCeoTicket(this.ticket).then(res => {
          if (res.code === 0) {
              this.$router.push({
                path:'/my'
              })
          }else{
            this.$vux.toast.text(res.msg)
          }
      })*/
    },
    getTicket(){
      apiHttp.coverCeo().then(res => {
          if (res.code === 0) {
              this.userTicket = res.data;
              this.price  = res.data.price
          }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .ticket-conver>.curr-trand{
        width:100vw;
        height:80vw;
        background:white;
    }
    .ticket-conver>.trand{
        position:absolute;
        left:0;
        top:15vw;
        width:30vw;
        height:10vw;
        text-align: center;
        line-height: 10vw;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        color:white;
        font-size:4vw;
        background:linear-gradient(to right,#F63D36,#F87B64);
    }
    .ticket-conver>.cover-msg{
        width:94vw;
        height:60vw;
        border-radius:20px;
        background:white;
        margin:15px auto;
        margin-top:65px;
    }
    .cover-msg{
      font-size:4vw;
    }
    .cover-msg input{
      border:0;
      outline:none;
      width:45vw;
      height:35px;
      border:1px solid #333333;
      border-radius:10px;
    }
    .cover-msg>.row_1{
      text-align:center;
      padding-top:10px;
    }
    .cover-msg>.row_2{
      padding:6vw;
    }
    .cover-msg>.row_2>div{
      margin-bottom:15px;
    }
    .cover-msg>div>.s-1{
      color:#FF5847;
      font-weight:bold;
    }
    .confirm-cover{
      width:40vw;
      height:35px;
      line-height: 35px;
      text-align: center;
      margin:0 auto;
      border-radius:25px;
      color:white;
      background:linear-gradient(to right, #f87a63, #f63e36) !important;
    }
    .cover-rule{
      width:100vw;
      text-align: center;
      margin-top:30px;
      font-size:4vw;
      color:rgb(155,155,155)
    }
</style>
