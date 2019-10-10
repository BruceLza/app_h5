<template>
  <div id="regulation" class="regulation" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">规则说明</p>
      </div>
    </div>
    <div class="titleBox">
      <img src="../../assets/img/clockIn/gzeishuom.png" alt="">
      <p class="title">早起打卡规则说明</p>
      <p class="time">早上{{startTime}}~{{endTime}}</p>
    </div>
    <p class="descTitle">挑战规则</p>
    <div class="desc" v-html="content">
    </div>
  </div>
</template>

<script>
export default {
  name:'Regulation',
  data () {
    return {
      startTime: '',
      endTime: '',
      content:''
    }
  },
  mounted () {
    this.getInfo()
    this.startTime = this.$route.query.startTime
    this.endTime = this.$route.query.endTime
  },
  methods: {
    getInfo () {
      this.$http.post('amoy/home/dk-rule', {}, true).then(res => {
        if (res.code === 0) {
          this.content = res.data
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  .regulation{
    font-family:PingFang-SC-Regular;
    // position: relative;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .headerConBox{
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-top: 0.35rem;
      box-sizing: border-box;
      .header{
        width: 100%;
        height: 0.4rem;
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        .icon-back{
          width: 0.2rem;
          font-size: 0.36rem;
          font-weight: bold;
          margin-left: 0.2rem;
        }
        .title{
          width: 6.9rem;
          margin-right: 0.4rem;
          font-family:PingFang-SC-Regular;
          font-size: 0.34rem;
          font-weight:500;
          line-height: 0.4rem;
          text-align: center;
        }
      }
    }
    .titleBox{
      position: relative;
      overflow: hidden;
      width: 100%;
      margin-top: 0.28rem;
      height: 2.5rem;
      color: #fff;
      text-align: center;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
      }
      .title{
        position: relative;
        width: 100%;
        font-family:PingFang-SC-Bold;
        font-size: 0.56rem;
        font-weight: bold;
        letter-spacing: 0.1rem;
        line-height: 0.56rem;
        margin-top: 0.85rem;
        margin-bottom: 0.25rem;
        z-index: 2;
      }
      .time{
        position: relative;
        width: 100%;
        font-family:PingFang-SC-Medium;
        font-size: 0.3rem;
        font-weight: bold;
        line-height: 0.3rem;
        z-index: 2;
      }
    }
    .descTitle{
      width: 100%;
      font-family:PingFang-SC-Medium;
      font-size: 0.32rem;
      font-weight: 500;
      line-height: 0.36rem;
      text-align: center;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
      color: #333;
    }
    .desc{
      width: 7rem;
      margin: auto;
      font-family:PingFang-SC-Medium;
      font-size: 0.26rem;
      font-weight: 500;
      line-height: 0.36rem;
      color: #666666;
      text-align: left;
    }
  }
</style>
