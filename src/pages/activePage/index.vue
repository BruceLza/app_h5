<template>
  <div id="forget">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
      <a @click="openTicketDetail()" slot="right">记录</a>
    </x-header>
    <div class="ser_home">
      <ul class="red_packet" id="red_packet">
         <li  @click="onClickIcon($event)" v-for="(item, index) in liParams" :style="{ left: item.left, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}" :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
           <i :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
         </li>
       </ul>
      <!-- 活动时间 -->
      <div class="active-time">{{activeTime}} </div>
      <!-- 抢红包成功 -->
      <div class="active-success" v-if="activeSuccessStatus">
        <div class="active-success-box">
          <div class="active-box-cont">{{credit2}}积分</div>
          <div class="active-box-close" @click="activeSuccessStatus = !activeSuccessStatus"></div>
          <div class="active-box-mask"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      liParams: [],
      timer: '',
      duration: 1000*60*10, // 定义时间
      activeTime: '活动未开始',
      activeInfo: {
        day: '0',
        hour: '0',
        minute: '0',
        second: '0',
        over_time: '2019-10-01 20:10:00',
        processing: false,
        start_time: '2019-10-01 20:00:00'
      },
      timeInter: '',
      title: '距离活动开始',
      credit2: 0,
      activeSuccessStatus: false
    }
  },
  mounted () {
    this.initActive()
  },
  methods: {
    // 积分明细 /mall/ticketDetail
    openTicketDetail() {
      this.$router.push({
        path: '/mall/ticketDetail?credittype=credit2'
      })
    },
    // 开启动画
    startRedPacket() {
      let win = document.documentElement.clientWidth || document.body.clientWidth
      let left = parseInt(Math.random() * (win - 50) + 0)
      let rotate = (parseInt(Math.random() * (45 - (-45)) - 45)) + 'deg'
      let scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1 // 图片尺寸
      let durTime = (Math.random() * (4.5 - 1.8 + 0.8) + 1.2) + 's'
      this.liParams.push({left: left + 'px', cls: 'move_1', transforms: 'rotate(' + rotate + ') scale(' +  scales + ')', durTime: durTime})
      setTimeout(() => {
        clearTimeout(this.timer)
        return
      }, this.duration)
      this.timer = setTimeout( () => {
        this.startRedPacket()
      }, 200)
    },

    // 回收dom节点
    removeDom (e) {
      let target = e.currentTarget
      document.querySelector('#red_packet').removeChild(target)
    },
    // 点击事件
    onClickIcon() {
      this.onDrawn()
    },
    // 开始活动
    onStartActive() {
      this.title = '距离活动结束'
      this.countTime(this.activeInfo.over_time)
      setTimeout(() => {
        this.startRedPacket()
      }, 500)
    },
    // 查询活动是否开启
    async initActive () {
      this.$http.post('/mall/shops/red-packet-plan', true).then(res => {
        if (res.code === 0) {
          this.activeInfo = JSON.parse(JSON.stringify(res.data))
          if (res.data.processing) {
            this.onStartActive()
          } else {
            this.countTime(this.activeInfo.start_time)
          }
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    // 倒计时
    countTime(dates) {
      this.timeInter = setInterval(() => {
        let time = (dates * 1) - new Date().getTime()
        this.activeInfo.day = parseInt(time / (1000 * 60 * 60 * 24))
        this.activeInfo.hour = parseInt(time / (1000 * 60 * 60) % 24)
        this.activeInfo.minute = parseInt(time / (1000 * 60) % 24)
        this.activeInfo.second = parseInt(time / 1000 % 24)
        this.activeTitle()
        if (this.activeInfo.second === 0 && this.activeInfo.minute === 0 && this.activeInfo.hour === 0 && this.activeInfo.day === 0) {
          clearInterval(this.timeInter)
          this.initActive()
        }
      }, 1000)
    },
    // 活动表头
    activeTitle() {
      this.activeTime = `${this.title}:${this.activeInfo.day}天${this.activeInfo.hour}时${this.activeInfo.minute}分${this.activeInfo.second}秒`
    },
    // 中奖请求
    onDrawn() {
      this.$http.post('/mall/shops/get-red-packet', true).then(res => {
        if (res.code === 0) {
          if (res.data.status === 1) {
            this.activeSuccessStatus = true
            this.credit2 = res.data.credit2
          } else {
            this.$vux.toast.text(res.msg)
          }
          clearTimeout(this.timer)
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    }
  },
  destroyed() {
    clearInterval(this.timeInter)
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .vux-header{
    position: relative !important;
  }
  .ser_home {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 30px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .red_packet {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: url('../../assets/icon-3.png') no-repeat;
    background-size: 100% 100%;
  }
  .red_packet i {
    width: 40px;
    height: 56px;
    display: block;
    background: url('../../assets/icon-4.png') no-repeat;
    background-size: 100% 100%;
  }
  .red_packet li {
    width: 40px;
    height: 56px;
    display: block;
    position: absolute;
    animation: all 3s linear;
    top:-100px;
    z-index: 101;
  }
  .red_packet li.move_1 {
    -webkit-animation: aim_move 5s linear 1 forwards;
    animation: aim_move 5s linear 1 forwards;
  }
  .red_packet a {
    display: block;
  }
  @keyframes aim_move {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(120vh);
      transform: translateY(120vh);
    }
  }
  .active-time{
    position: absolute;
    top: 10vh;
    left: 0%;
    width: 100%;
    text-align: center;
    z-index: 11;
    font-size: 18px;
    color: #fff;
  }
  .active-success{
    position: absolute;
    top: 20vh;
    left: 0;
    width: 60%;
    height: 300px;
    margin-left: 20%;
    z-index: 11;
    background: url('../../assets/icon-1.png') no-repeat;
    background-size: 100% 100%;
    .active-box-cont{
      text-align: center;
      color: #fff;
      font-size: 16px;
      margin-top: 30vh;
    }
    .active-box-close{
      position: absolute;
      bottom: 5px;
      left: 50%;
      margin-left: -18.5px;
      width: 37px;
      height: 37px;
      z-index: 2020;
      background: url('../../assets/icon-2.png') no-repeat;
      background-size: 100% 100%;
    }
    .active-box-mask{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 30px;
      left: 0;
      z-index: 2019;
      background: transparent;
    }
  }
</style>
