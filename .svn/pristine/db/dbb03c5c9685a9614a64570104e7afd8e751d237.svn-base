<template>
  <div class="ticket-conver">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      {{isout==2?'可用积分转换':'积分转换'}}
     <a v-if="false" @click="openLog()" slot="right" >记录</a>
    </x-header>
    <div class="t-exch">
      <div class="row_1">
          可转换积分数量: <span class="s-1">{{ticketInfo.credit2}}</span>
      </div>
      <div class="t-desc"> {{isout==2?'将可用积分转换为钱包积分':'将可用积分转换为消费积分'}}</div>
      <div class="row_2" v-if="isout==2"> 转 换 数 量: <input type="text" v-model="count"></div>
      <div class="row_2" v-else> 兑 换 数 量: <input type="text" v-model="count"></div>
      <div class="row_3" v-if="isout==2" @click="integralTransform()">转换</div>
      <div class="row_3" v-else @click="ticketExch()">兑换</div>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import * as apiHttp from '../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'ticketExchange',
  components: {
    XHeader,
    MescrollVue
  },
  data () {
    return {
      ticketInfo: '',
      count: '',
      isout: this.$route.query.isout,
    }
  },
  mounted () {
      this.getTicket()
  },
  methods: {
    ticketExch(){
      if(parseFloat(this.count)<0||this.count==""){
        this.$vux.toast.text("兑换积分必须大于0");
        return;
      }
      this.$http.post('/mall/credit/credit-change', {credittype:'credit2',price:this.count,type:'save'}, false, true).then((res) => {
        if (res.code === 0) {
          this.$router.push({
            path:'/my'
          })
        }else{
          this.$vux.toast.text(res.msg)
        }
      })
    },
    integralTransform(){
      if(parseFloat(this.count)<0||this.count==""){
        this.$vux.toast.text("转换积分必须大于0");
        return;
      }
      this.$http.post('/mall/users/user-credit-exchange', {credittype:'credit2',credit:this.count,type:'save'}, false, true).then((res) => {
        if (res.code === 0) {
          this.$router.push({
            path:'/my'
          })
        }else{
          this.$vux.toast.text('兑换失败!')
        }
      })
    },
    getTicket(){
      this.$http.post('/amoy/user/user-credits', {}, false, true).then((res) => {
        if (res.code === 0) {
          this.ticketInfo = res.data
        }
      })
    }
  }
}
</script>

<style  scoped>
    .t-exch{
        width:94vw;
        height:55vw;
        border-radius:25px;
        margin:5vw auto;
        background:white;
        font-size:4vw;
    }
    .t-exch input{
        outline:none;
        width: 65vw;
        height: 35px;
        border: 1px solid #333333;
        border-radius: 10px;
    }
    .t-exch .row_1{
        text-align: center;
        padding:5vw;
    }
    .t-exch .row_1>.s-1{
        color: #FF5847;
        font-weight: bold;
    }
    .t-exch .row_2{
        padding:3vw
    }
    .t-desc{
      width:94vw;
      text-align: center;
      color:gray;
      font-size:3vw;
    }
    .t-exch .row_3{
      width:40vw;
      height:35px;
      line-height: 35px;
      text-align: center;
      margin:5vw auto;
      border-radius:25px;
      color:white;
      background:linear-gradient(to right, #f87a63, #f63e36) !important;
    }
</style>
