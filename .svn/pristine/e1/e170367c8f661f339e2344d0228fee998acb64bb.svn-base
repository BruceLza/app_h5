<template>
    <div class="videoList  aa" v-if="data">
      <div class="agency" v-if="agency">
          <div class="mask" v-if="type==1">
             <input type="text" v-model="cardCode" placeholder="请输入卡密">
             <div class="active-t">
                <div @click="closeCard()">取消</div>
                <div @click="onConfirm(cardCode)">激活</div>
             </div>
          </div>
          <div class="mask" v-if="type==2">
              <div class="progrs">
                <div class="progressBox progressBox1">
                  <x-progress style="width:60vw"  :percent="(vipData.invite_count / vipData.need_invite_count) * 100 > 100 ? 100 : (vipData.invite_count / vipData.need_invite_count) * 100" :show-cancel="false"></x-progress>
                  <p style="color:black">{{vipData.need_invite_count}}人</p>
                </div>
                <p class="present">当前有效直属粉丝：{{vipData.invite_count}}人</p>
              </div>
              <div class="task">
                 <div @click="closeTask()">取消</div>
                 <div @click="closeTask()">去完成任务</div>
              </div>
          </div>
      </div>
      <div class="videoBox" >
        <div v-for="(item, index) of videoList" :key="index" @click="watchVideo(item)"><img :src="item.src" alt=""><span>{{item.title}}</span></div>
      </div>
      <div v-if="$bizId === 4" class="flex-btn">
        <div @click="openMask(1)">激活卡密</div>
        <div @click="openMask(2)" v-if="data.result==0">成为代理</div>
        <div @click="jumpTo('videoCard')" v-if="data.result==1">卡密管理</div>
      </div>
      <div class="btn" @click="jumpTo('/videoPay?price=' +  data.price)" v-if="$bizId !== 4&&data.result === 0 && data.price > 0">购买代理</div>
      <div class="btn" @click="jumpTo('videoCard')" v-else-if="data.result !== 0">查看卡密</div>
      <div v-if="data.rule" v-html="data.rule" class="rule"></div>
      <div v-transfer-dom class="videoPower">
        <confirm v-model="show"
                 show-input
                 ref="confirm"
                 title="输入卡密"
                 @on-confirm="onConfirm">
        </confirm>
      </div>
    </div>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom, XProgress } from 'vux'
export default {
  name: 'videoList',
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    XProgress
  },
  data () {
    return {
      videoList: [{src: require('../../assets/img/home/video/tx.png'), title: '腾讯视频', path: 'https://v.qq.com/'},
        {src: require('../../assets/img/home/video/aqy.png'), title: '爱奇艺', path: 'https://www.iqiyi.com/'},
        {src: require('../../assets/img/home/video/mgu.png'), title: '咪咕视频', path: 'http://m.miguvideo.com/'},
        {src: require('../../assets/img/home/video/fx.png'), title: '风行视频', path: 'http://m.fun.tv/'},
        {src: require('../../assets/img/home/video/bf.png'), title: '暴风影音', path: 'http://m.baofeng.com/'},
        {src: require('../../assets/img/home/video/sh.png'), title: '搜狐视频', path: 'https://m.tv.sohu.com/'},
        {src: require('../../assets/img/home/video/mg.png'), title: '芒果TV', path: 'https://m.mgtv.com/'},
        {src: require('../../assets/img/home/video/1905.png'), title: '1905', path: 'http://m.1905.com/'},
        {src: require('../../assets/img/home/video/ls.png'), title: '乐视视频', path: 'http://m.le.com/'},
        {src: require('../../assets/img/home/video/yk.png'), title: '优酷视频', path: 'http://youku.com/'},
        {src: require('../../assets/img/home/video/pptv.png'), title: 'PPTV', path: 'http://m.pptv.com'}],
      power: 0,
      show: false,
      data: '',
      vipData: '',
      isShow: true,
      agency:false,
      type:"",
      cardCode:''
    }
  },
  methods: {
    onConfirm (value) {
      this.$http.post('/amoy/movie/key-check', {
        cdkey: value
      }, true).then(res => {
        if (res.code === 0) {
          this.power = 1
          this.$vux.toast.show({
            type: 'text',
            text: res.msg,
            time: 500,
            position: 'middle'
          })
        }
      })
    },
    openMask (type) {
      this.agency = true
      this.type = type
    },
    watchVideo (item) {
      if (this.power === 1) {
        this.$router.push('/videoDetail?url=' + item.path + '&title=' + item.title)
      } else {
        this.show = true
      }
    },
    closeCard () {
      this.agency = false
    },
    closeTask () {
      this.agency = false
    },
    getInfo () {
      this.$http.post('/amoy/movie/up-conditions', {}, true).then(res => {
        this.vipData = res.data
        this.isShow = this.vipData !== '' && this.vipData.finish == 0
      })
    }
  },
  created () {
    $api.css($api.dom('.weui-dialog__btn_primary'), 'color:' + this.$store.state.global.theme.mainColor)
    this.$http.post('/amoy/movie/power-check', {}, true, true).then(res => {
      this.data = res.data
      if (res.code === 0) {
        this.power = 1
      } else if (res.code === 1) {
        this.power = 0
        this.$vux.toast.show({
          type: 'text',
          text: res.msg,
          time: 500,
          position: 'middle'
        })
      }
    })
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
  @import "../../assets/less/common";
.videoList{
  .ways{
    margin: .5rem 0 0.1rem 0.2rem;
    width: 1.44rem;
    height: 0.46rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /*background: url("../../assets/img/updateBg.png") no-repeat;*/
    /*background-size: 100% 100%;*/
    color: #fff;
    font-size: .26rem;
    background: linear-gradient(to right, @theme-col, @partial-color);
    border-bottom-right-radius: .46rem;
    border-top-left-radius: .46rem;
  }
  .progressBox{
    padding: 0 .2rem;
    display: flex;
    justify-content: space-between;
    .weui-progress{
      width: 6rem;
      /deep/.weui-progress__bar{
        overflow: hidden;
        height: 0.2rem;
        border-radius: 0.1rem;
      }
    }
  }
  .progressBox1{
    .weui-progress__bar{
      .weui-progress__inner-bar{
        background: #a256ff;
      }
    }
  }
  .present{
    color: #999;
    font-size: .24rem;
    padding: .1rem .2rem .2rem;
  }
  .videoBox{
    background: #fff;
    overflow: hidden;
    div{
      float: left;
      box-sizing: border-box;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        width: 1rem;
        height: 1rem;
        margin-bottom: .2rem;
      }
      span{
        font-size: .24rem;
      }
    }
  }
  .btn{
    margin: 1rem 1rem .5rem;
    height: .9rem;
    border-radius: .45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .34rem;
    color: #333;
    background: linear-gradient(to right, #f3d4ac, #f8bf7b);
  }
  .flex-btn{
    width:80vw;

    padding:40px;
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .flex-btn>div{
    width:35vw;
    height:40px;
    line-height:40px;
    color:white;
    text-align:center;
    border-radius:3px;
  }
  .flex-btn>div:first-child{
    background:rgb(255,152,0)
  }
  .flex-btn>div:last-child{
    background:rgb(229,28,35)
  }
  .agency{
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.3)
  }
  .agency .mask{
    width:80vw;
    height:80vw;
    margin-top:40vw;
    background:white;
    margin-left:10vw;
  }
  .agency .mask>.active-t{
    margin-top:30vw;
    width:80vw;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }
  .agency .mask>div>div{
    width:25vw;
    height:30px;
    line-height:30px;
    text-align:center;
    border-radius:3px;
    color:white
  }
  .task{
    margin-top:30vw;
    width:80vw;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }
  .progrs>div{
     padding-top:10vw;
     width:70vw !important;
     background:white !important;
  }
  .agency .mask>div>div:first-child{
    background:rgb(255,152,0)
  }
  .agency .mask>div>div:last-child{
    background:rgb(0,150,136)
  }
  .agency .mask input{
    width:70vw;
    height:35px;
    border:1px solid lightgray;
    margin-top:10vw;
    margin-left:5vw;
  }
  .rule{
    padding: .3rem;
    img{
      max-width: 100%;
    }
  }
}
</style>
