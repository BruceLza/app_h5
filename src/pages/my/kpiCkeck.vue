<template>
  <div class="yueList_box">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      KPI考核
      <a  slot="right" @click="jumpTo('/kpirule')">规则说明</a>
    </x-header>
    <div class="kpi_m" >
        <div class="row_total">
            <div class="row_1">{{kpiInfo.count_percent}}</div>
            <div class="row_2">上周KPI考核</div>
        </div>
        <div class="row_desc">
            <div>
                <div>{{kpiInfo.level_percent}}</div>
                <div>等级得分</div>
            </div>
            <div>
                <div>{{kpiInfo.ach_percent}}</div>
                <div>业绩得分</div>
            </div>
            <div>
                <div>{{kpiInfo.market_percent}}</div>
                <div>市场得分</div>
            </div>
        </div>
    </div>
    <div class="my-mark">
       我的市场 <span class="kpi-for" @click="switchLog()">{{text}} <img class="icon-img" align="absmiddle" src="../../assets/img/sanjiao.png" alt=""> </span>
    </div>
    <div class="mescrollBox kpi-scroll" style="margin-top:60vw;width:94vw;left:3vw;background:white">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="content">
          <div id="d5">
            <div class="list-item-kpi" v-for="(item,i) in yueList" :key="i"  style="height: 1.5rem;">
              <div class="k-left"> <img v-if="item.avatar" :src="item.avatar" alt=""><img v-if="!item.avatar" src="../../assets/logo2.png" alt=""> </div>
              <div class="k-middle">
                  <div> <span class="s-1">{{item.nickname==""?'暂无昵称':item.nickname}}</span> <span v-if="item.mobile" style="font-size:3.5vw;vertical-align:middle;display:inline-block;height:15px;line-height:5px">({{item.mobile}})</span> </div>
                  <div class="row_2">ID: {{item.id}} 粉丝：{{item.child_num}}人</div>
              </div>
              <div class="k-right" style="max-width:15vw">{{item.ach==null?'0.00':item.ach}}</div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import * as apiHttp from '../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  components: {
    XHeader,
    MescrollVue
  },
  data () {
    return {
      finish: false,
      page: 1,
      yueList: [],
      type:2,
      text:'上周业绩',
      isdefault:true,
      kpiInfo:'',
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'd5',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      }
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    switchLog(){
        this.isdefault = !this.isdefault
        if(this.isdefault){
            this.text = '上周业绩'
        }else{
            this.text = '累计业绩'
        }
        this.yueList = []
        this.refresh()
    },
    upCallback (page, mescroll) {
      var isall = this.isdefault? "" : "all"
      this.$http.get('/mall/users/user-kpi',{page:page.num,type:isall}).then(res => {

        if (res.code === 0) {
          this.kpiInfo = res.data;
          let arr = res.data.child === '' ? [] : res.data.child
          if (page.num === 1) this.yueList = []
          this.yueList = this.yueList.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.child.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.finish = false
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  }
}
</script>

<style  scoped>

  .yueList_box .kpi_m{
        width:94vw;
        height:40vw;
        border-radius:10px;
        background:white;
        margin:3vw auto;
        font-size:4vw;
        box-shadow:0 1px 1px 1px rgb(235,235,235)
    }
    .row_desc{
        display:flex;
        justify-content: space-around;
        align-items:center;
        text-align: center;
        font-weight:bold;
    }
    .row_desc>div>:first-child{
        color:rgb(56,56,56);
        font-size:5vw;
    }
    .row_desc>div>:last-child{
        color:rgb(175,175,175);
    }
    .row_total{
        text-align: center;
        padding-top:3vw;
        margin-bottom:5vw;
        font-weight:bold;
    }
    .row_total .row_1{
        color:rgb(255,0,54);
        font-size:6vw;
    }
    .row_total .row_2{
        color:rgb(56,56,56);
    }
    .my-mark{
        width:100vw;
        height:12vw;
        text-align: center;
        line-height: 12vw;
        color:white;
        font-size:4vw;
        background:rgb(255,0,54)
    }
    .kpi-for{
        position:absolute;
        top:58vw;
        right:3vw;
        font-size:3vw;
    }
    .icon-img{
        width:5vw;
        height:5vw;
    }
    .list-item-kpi{
        width:94vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size:3.5vw;
        border-bottom:1px solid rgb(245,245,245)
    }
    .k-middle {
        width:55vw;
    }
    .k-middle .s-1{
        display:inline-block;
        width:20vw;
        height:20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:4vw;
        font-weight:bold;
        color:rgb(69,69,69)
    }
    .k-middle>.row_2{
        color:rgb(153,153,153)
    }
    .k-left img{
        width:1rem;
        height:1rem;
        border-radius:50%
    }
    .k-right{
        border:1px solid rgb(215,215,215);
        color:rgb(255,0,54);
        padding-left:2vw;
        padding-right:2vw;
        border-radius:15px;
    }
</style>
