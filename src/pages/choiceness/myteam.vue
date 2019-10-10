<template>
  <div id="myteam">
    <!--上部分-->
    <div class="top">

      <div class="top-picture" >
        <img :src="avatar" alt="头像">
      </div>

      <p class="top-phone" v-text="moblie"></p>

      <div id="qr">
        <img :src="scanImg" alt="qr">
      </div>
      <p class="qr-tit">扫码进团队</p>
    </div>

    <!--下部分-->
    <div class="bottom">
      <div class="item">
        <p>个人拉新总数</p>
        <p>{{dataList.num1 || 0}}</p>
      </div>
      <div class="item border-z">
        <p>团队拉新总数</p>
        <p>{{dataList.num3 || 0}}</p>
      </div>
      <div class="item">
        <p>团队总人数</p>
        <p>{{dataList.numAll || 0}}</p>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'myteam',
    comments:{},
    data(){
      return{
        dataList:{},
        scanImg:'',
        moblie:'',
        avatar:'',
        moren:'../../assets/img/choniceness/rem-1.png'
      }
    },
    mounted() {
      let _this = this;
      _this.moblie = _this.$store.state.user.userInfo.mobile;
      if(_this.$store.state.user.userInfo.avatar != '' || _this.$store.state.user.userInfo.avatar != null){
        _this.avatar = _this.$store.state.user.userInfo.avatar;
      }else{
        _this.avatar = _this.moren;
      }
      this.$http.post('/amoy/user/laxin-sum').then(res => {
        if (res.code === 0) {
          console.log("*************我的团队**********");
          console.log(res.data);
          _this.dataList = res.data;
        }else{
          _this.$vux.toast.text('加载失败！');
        }
      });
      this.$http.post('/amoy/user/user-new', {}, true, true).then(res => {
        if (res.code === 0) {
          _this.scanImg = res.data.pic;
        }
      });
    },
    methods:{

    }

  }
</script>

<style scoped lang="less">
  #myteam {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../../assets/img/choniceness/Bg.png") no-repeat;
    background-size: 100% 100%;
    /*padding-top:1.28rem;*/
    .top {
      position:relative;
      &:before,
      &:after{
        content: '';
        width:0.82rem;
        height:0.82rem;
        position:absolute;
        bottom:-0.41rem;
        border-radius:50%;
        background-color:#fc8614;
      }
      &:before{
        left:-0.41rem;
      }
      &:after{
        right:-0.41rem;
      }
      margin:1.28rem auto 0;
      width: 6.7rem;
      /*height: 5.44rem;*/
      height: 6rem;
      background-color: white;
      /*margin: 0 auto;*/
      position: relative;

      .top-picture{
        position:absolute;
        left:50%;
        transform: translate(-50%,-50%);
        width:1.4rem;
        height:1.4rem;
        background:rgba(255,217,174,1);
        border-radius:50%;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        img{
         display: block;
        }
      }

      .top-phone{
        padding-top:1.1rem;
        font-size:0.3rem;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
      }

      #qr{
        margin:0.64rem auto 0;
        width:2.8rem;
        height:2.8rem;
        border:1px solid pink;
        padding:10px;
        box-sizing: border-box;
        img{
          display: block;
          width:100%;
          height:100%;
        }
      }
      .qr-tit{
        margin-top:0.14rem;
        text-align: center;
        font-size:0.28rem;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:28px;
      }
    }
    .bottom{
      width: 6.7rem;
      height:2rem;
      margin: 0.03rem auto 0;
      padding-top: 0.3rem;
      box-sizing: border-box;
      /*display: grid;*/
      /*grid-template-columns: 1fr 1fr 1fr;*/
      /*grid-template-rows: 2.28rem;*/
      /*grid-gap: 1px;*/
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      background-color: white;
      .item{
        width:33.33%;
        box-sizing: border-box;
        height:1rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-content: space-around;
        border-bottom:none;

        p{
          text-align: center;
          white-space:nowrap;
          overflow: hidden;
          font-family:'PingFang-SC-Regular';
          font-weight:400;
        }
        p:first-child{
          font-size:0.28rem;
          color:rgba(51,51,51,1);
        }
        p:last-child{
          margin-top:0.2rem;
          font-size:0.3rem;
          color:rgba(247,107,4,1);
        }
      }
      /*.item:nth-child(1):before,*/
      /*.item:nth-child(2):before{*/
      /*  content: '';*/
      /*  width:0.02rem;*/
      /*  height:0.92rem;*/
      /*  background-color:red;*/
      /*  right:0px;*/
      /*}*/

    }

  }


</style>
