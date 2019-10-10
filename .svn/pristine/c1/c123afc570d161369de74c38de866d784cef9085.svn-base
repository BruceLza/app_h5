<template>
  <div id="my" class="tbkMy">
    <div class="moneysBox">
      <div class="box">
        <input type="text" v-model="search" placeholder="请输入或粘贴淘宝订单编号">
        <img src="../../assets/img/super/1.png" alt="">
        <span @click="toSearch">搜索</span>
      </div>
      <div class="headBox">
        <p class="headTitle">如何获取订单编号？</p>
        <div class="flowBox">
          <img class="pic" :src="imgUrl" alt="">
        </div>
        <div class="queryRule">
          <p class="title"><i class="listStyle"></i>查询规则</p>
          <p class="itemList" v-html="content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'orderQuery',
  components: {
    MescrollVue,
  },
  data () {
    return {
      settingH: '',
      search: '',
      imgUrl: '',
      content:'1.购买人没同步的订单可通过订单查询找回；<br>2.当查找人查找到订单，并且该订单在订单库确实找不到归属时，该订单归属到查找人；<br>3.当有多个用户输入同一订单号，以第一个输入人为准；<br>4.已归属的订单不支持继续查询；<br>5.建议购买人自查，运营商帮助超级会员查询时，不要点击确认找回，可让购买人自查并找回；<br>6.收益将按查找人的当前的用户关系进行归属。'
    }
  },
  methods: {
    showLogin () {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
    },
    toSearch () {
      if (this.search === '') {
        this.$vux.toast.show({
          type: 'text',
          text: '请输入订单号',
          time: 500,
          position: 'middle'
        })
        return
      }
      this.$router.push('/orderQueryList?search=' + encodeURIComponent(this.search))
    },
    gitInfo () {
      this.$http.get('amoy/user/see-order').then((res) => {
        if (res.code === 0) {
          this.content = res.data.article ? res.data.article.content : this.content
          this.imgUrl = res.data.img
          console.log(this.imgUrl)
        }
      })
      return
    }
  },
  mounted () {
    this.gitInfo()
    let size = (document.documentElement.clientWidth / 7.5)
    this.settingH = (api.safeArea.top / size)
  }
}
</script>
<style lang="less">
  .tbkMy{
    .mescroll{
      bottom: 0 !important;
    }
  }
  #my{
    /*._v-content{*/
      /*padding-bottom: 30px;*/
    /*}*/
    /*.EditNav{*/
      /*.allBox{*/
        /*border-radius: 10px;*/
        /*.allList{*/
          /*padding: 0.2rem 0;*/
          /*img{*/
            /*width: .36rem;*/
            /*height: .36rem;*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
    .vux-cell-primary{
      line-height: .4rem;
      margin-left: .2rem;
      .vux-label{
        font-size: .28rem;
      }
    }
    .weui-cells{
      margin-top: 0;
      .weui-cell:before{
        right: 15px;
      }
    }
    .weui-cells:after,.weui-cells:before{
      display: none;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.tops{
  padding-top: 2px;
}
#my{
  position: relative;
  height: 100%;
  background: #f7f7f7;
  .moneysBox{
    background: url("../../assets/img/my/orderQuery.png") no-repeat;
    background-size: 100% auto;
    font-size: 0.3rem;
    position: relative;
    padding: .2rem;
    z-index: 99;
    /*background-color: #fff;*/
    .box{
      position: relative;
      margin: auto;
      margin-top: 0.5rem;
      width: 6.40rem;
      height: .8rem;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 26px 0px rgba(173,173,173,0.34);
      border-radius: .4rem;
      input{
        position: absolute;
        left: 0;
        top: 0;
        outline: none;
        border: none;
        height: .8rem;
        width: 5.04rem;
        border-bottom-left-radius: .4rem;
        border-top-left-radius: .4rem;
        color: #666666;
        padding-left: .72rem;
        box-sizing: border-box;
        font-size: .28rem;
      }
      img{
        position: absolute;
        top: .25rem;
        left:.3rem;
        width: .27rem;
        height: .29rem;
      }
      span{
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        width: 1.36rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .3rem;
        /*font-size: 18px;*/
        background: linear-gradient(270deg,rgba(236,100,81,1),rgba(240,150,126,1));
        color: #fff;
        border-bottom-right-radius: .4rem;
        border-top-right-radius: .4rem;
      }
    }
    .setting{
      position: absolute;
      right: .3rem;
      width: .4rem;
      top: .3rem;
    }
    .headBox{
      overflow: hidden;
      margin-top: 0.7rem;
      width: 100%;
      background: #FFF;
      border-radius: .2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 0.15rem;
      .headTitle{
        text-align: center;
        height: 0.32rem;
        line-height: 0.32rem;
        margin-top: 0.35rem;
        margin-bottom: 0.3rem;
        color: #333;
        font-size: 0.32rem;
      }
      .flowBox{
        overflow: hidden;
        width: 6.4rem;
        padding-top: 0.5rem;
        padding-bottom: 0.4rem;
        border-top: 1px solid #EEE;
        border-bottom: 1px solid #EEE;
        .prc{
          width: 100%;
          max-width: 100%;
        }
      }
      .queryRule{
        overflow: hidden;
        margin-top: 0.3rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
          display: flex;
          width: 6.4rem;
          align-items: center;
          justify-content: flex-start;
          font-size: 0.28rem;
          line-height: 0.28rem;
          height: 0.28rem;
          color: #333;
          .listStyle{
            display: block;
            width: 0.08rem;
            height: 0.08rem;
            border-radius: 50%;
            margin-right: 11px;
            background: #F6846D;
          }
        }
        .itemList{
          width: 6.4rem;
          box-sizing: border-box;
          padding-left: 0.22rem;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
          text-align: left;
          font-size: 0.24rem;
          line-height: 0.42rem;
          color: #999999;
        }
      }
    }
    .profitBox{
       overflow: hidden;
       padding: 0.4rem 0;
       height: 1rem;
       width: 100%;
       .profit{
         width: 33.33%;
         float: left;
         justify-content: center;
         text-align: center;
         flex-direction: column;
         position: relative;
         p:first-of-type{
           font-size: .32rem;
           color: #fc3357;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           text-align: center;
           margin-bottom: 0.1rem;
         }
         p:last-of-type{
           text-align: center;
           font-size: .24rem;
           color: #666;
         }
       }
       .profit:after{
         content: '';
         height: 80%;
         position: absolute;
         top: 10%;
         right: 0;
         border-right: 1px solid #dadada;
         transform-origin: 0 0;
         transform: scaleX(.5);
       }
       .profit:last-of-type:after{
         display: none;
       }
     }
    .option{
      width: 100%;
      padding: 0.26rem 0 0;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      >div{
        margin-bottom: .4rem;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        div:nth-child(1){
          width: 0.36rem;
          height: 0.36rem;
          margin: 0 auto;
          margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .orderBox{
      background: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      padding-bottom: .26rem;
      div{
        margin-bottom: 0;
      }
    }
    .imgsBox{
      margin-top: 0.2rem;
      width: 100%;
      /*height: 1.15rem;*/
      img{
        width: 100%;
        height: 100%;
      }
    }
    .upgrade{
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      div{
        float: left;
      }
      div:nth-child(1){
        width: 1.2rem;
        height: 1.2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2){
        margin-left: 0.3rem;
        font-size: 0.28rem;
        padding-top: 0.1rem;
        color: black;
        p:nth-child(2){
          font-size: 0.24rem;
          color: #999999;
          margin-top: 0.14rem;
        }
      }
      div:nth-child(3){
        float: right;
        height: 100%;
        line-height: 1.2rem;
      }
    }
    .grow{
      height: 3.6rem;
      width: 100%;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 10px;
      .title{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        line-height: 1rem;
        div:nth-child(1){
          float: left;
          font-size: 0.3rem;
        }
        div:nth-child(2){
          float: right;
          color: #999;
          font-size: 0.24rem;
          span:nth-child(1){
            margin-right: 0.1rem;
          }
        }
      }
      .imgsbox{
        width: 100%;
        height: 2.6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
