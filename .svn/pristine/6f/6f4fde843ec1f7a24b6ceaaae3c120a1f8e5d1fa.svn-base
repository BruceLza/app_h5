<template>
  <div id="paySuccess" class="paySuccess" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">支付结果</p>
      </div>
    </div>
    <div class="paySuccessImg">
      <img src="../../assets/img/clockIn/zfucg.png" alt="">
      <p class="successText">支付成功</p>
    </div>
    <div class="yesBut" @click="jumpBack()">确定</div>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    jumpBack(){
      this.$router.replace('/rightsConter')
    }
  }
}
</script>
<style scoped lang="less">
  .paySuccess{
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
      // padding-top: 0.35rem;
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
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.4rem;
          text-align: center;
        }
      }
    }
    .paySuccessImg{
      text-align: center;
      img {
        width: 3.74rem;
        margin-top: 1.52rem;
      }
      .successText{
        width: 100%;
        font-family:PingFang-SC-Medium;
        font-size: 0.36rem;
        line-height: 0.36rem;
        color: #333;
        font-weight: 500;
      }
      .descText{
        font-size: 0.28rem;
        font-weight: 500;
        line-height: 0.28rem;
        margin-top: 0.24rem;
        span {
          color: #FF5847;
        }
      }
    }
    .yesBut{
      width: 5.2rem;
      height: 0.88rem;
      margin: auto;
      margin-top: 1.34rem;
      border-radius: 0.44rem;
      font-size: 0.36rem;
      font-weight: 500;
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      background: linear-gradient(270deg,rgba(255,88,71,1),rgba(255,145,120,1));
    }
  }
</style>
