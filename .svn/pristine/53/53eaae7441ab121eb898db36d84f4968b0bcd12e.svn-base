<template>
  <div class="withdraw">
    <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"   class="backBox">
      <i class="iconfont icon-back"></i></a>
      我的公益金
      <span class="save" slot="right" ></span>
    </x-header>
    <div class="box" >
      <div class="head">
        <p>公益金</p>
        <p class="money">{{hceo.user.charge2==null?0.00:hceo.user.charge2}}</p>
      </div>
      <div class="high"></div>
    </div>
    <div style="height:15px;"></div>
    <div >
     <div class="log-list" v-for="(item,index) in prolist" style="margin-bottom:15px;" :key="index">
        <div>
          <div>{{item.orderId}}</div><div>{{formatDate(item.created_at)}}</div>
        </div>
        <div>
          <div style="color:red">{{item.charge2}}</div><div>{{item.remark}}</div>
        </div>
     </div>
    </div>
    <infinite-loading @infinite="onInfinite" ref="infiniteLoading" spinner="bubbles">
          <span slot="no-more">已加载全部</span>
          <span slot="no-results">已加载全部</span>
         </infinite-loading>
   </div>
</template>

<script>
import {Group, XInput, XHeader, Actionsheet} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'withdraw',
  components: {
    Group, XInput, XHeader, Actionsheet,InfiniteLoading
  },
  data () {
    return {
      show: false,
      type: 1,
      page:1,
      menus: {},
      money: '',
      frozen: '',
      yueList:[],
      data: '',
      // info: this.$store.state.user.userInfo,
      way: 'alipay',
      isShow: false,
      user: {},
      hceo:'',
      signInfo: utils.storage.get('signInfo'),
      listload: false,
      prolist:[]
    }
  },
  methods: {
    getInfo () {
      this.$http.post('/mall/ceo/ceo-price', {}, false, true).then((res) => {
        if (res.code === 0) {
          this.hceo = res.data
         }
      })
    },
    onInfinite ($state) {
          var that = this;
          let page = this.page
          let date = this.date
          if (this.listload === false) {
            this.listload = true
            this.$http.post('/mall/ceo/ceo-charge', {type:this.type,page:this.page}, false, true).then(res => {
              this.listload = false
              if (res.code === 0) {
                
                if (res.data.list.length == 0) {
                  $state.complete();
                  this.page--;
                  if(this.page<1){
                    this.page = 1
                  }
                } else {
                  this.prolist = this.prolist.concat(res.data.list)
                  this.page++
                  $state.loaded()
                }
              } else {
                $state.complete()
              }
            })
          }
        },
  },
  mounted () {
    // 删除
    this.getInfo()
    //this.onInfinite()
  }
}
</script>
<style scoped>
.box{
  padding-top:45px;
  height:60px;
  color:white;
  text-align: center;
  padding-bottom:20px;
}
.box .head{
  padding-top:15px;
  background: url("../../assets/img/my/withdraw.png") no-repeat;
  height:60px;
  
}
.money{
  font-size:5vw;
}
.log-list{
  display:flex;
  justify-content: space-around;
  align-items: center;
  border-bottom:1px solid rgb(235,235,235);
}
</style>

