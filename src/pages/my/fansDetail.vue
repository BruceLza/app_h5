<template>
  <div class="fansDetail">
    <div class="top" v-if="data.info">
      <div class="head">
        <i class="iconfont icon-back" @click="$router.go(-1)"></i>
        <div>粉丝</div>
      </div>
      <div class="info">
        <div class="avater" :style="{backgroundImage: 'url(' + data.info.avatar + ')'}" v-if="data.info && data.info.avatar"></div>
        <div class="avater" :style="{backgroundImage: 'url(' + $logo + ')'}" v-else-if="$logo"></div>
        <div class="nickname">
          <p class="name"><span>{{data.info && data.info.nickname}}</span><span>{{data.info && data.info.lv}}</span></p>
          <p>{{data.info.created_at}}</p>
        </div>
      </div>
      <div class="data-line flex">
        <div class="data-item right-border">
          <p>{{data.fans}}</p>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <p>{{data.order}}</p>
          <span>订单</span>
        </div>
      </div>
    </div>
    <div class="detail" v-if="data.info">
      <div class="number-line flex">
        <div @click="copyText(data.info.mobile, '手机号')">
          <div><img src="../../assets/img/my/mobile.png">手机号</div>
          <p>{{data.info.mobile}} <img src="../../assets/img/my/fuzhi.png"></p>
        </div>
        <div @click="copyText(data.info.wx, '微信号')">
          <div><img src="../../assets/img/balance/weixin.png">微信号</div>
          <p>{{data.info.wx || '无'}} <img src="../../assets/img/my/fuzhi.png"></p>
        </div>
      </div>
      <div class="detail-line flex">
        <div class="right-border">
          <p><span>{{data.money1}}</span></p>
          <p>本月预估</p>
        </div>
        <div class="right-border">
          <p><span>{{data.money2}}</span></p>
          <p>今日收益</p>
        </div>
        <div class="right-border">
          <p><span>{{data.money3}}</span></p>
          <p>上月结算</p>
        </div>
        <div>
          <p><span>{{data.money4}}</span></p>
          <p>上月预估</p>
        </div>
      </div>
    </div>
    <div class="tips" v-if="data.operator>0">提示：用户已跟随用户{{data.operator}}裂变，不再属于您的直属代理下级</div>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'fansDetail',
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.getDetail(this.$route.query.uid)
  },
  methods: {
    copyText (text, tips) {
      if (!text) {
        this.$vux.toast.text(`${tips}不存在`)
        return
      }
      utils.copyText(text).then(res => {
        this.$vux.toast.text(`已复制${tips}`)
      })
    },
    getDetail (uid) {
      this.$http.post('/amoy/user/fans-detail', {fansId: uid}, true).then((res) => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .fansDetail{
    text-align: center;
  }
  .head{
    position: absolute;
    width: 100%;
    top: .5rem;
    color: white;
    font-size: .4rem;
    line-height: 1.1rem;
    z-index: 1;
    i{
      position: absolute;
      left: .3rem;
    }
    div{
      text-align: center;
    }
  }
  .info{
    text-align: center;
    position: relative;
    background: url("../../assets/img/my/fansBg.png") no-repeat center;
    background-size: cover;
    color: white;
    padding-top: 1.8rem;
    .avater{
      width: 1.38rem;
      height: 1.38rem;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0rem auto;
    }
    .nickname{
      padding: 0.1rem 0;
      border-bottom: 1px solid #f7f7f7;
      .name{
        font-size: .3rem;
        span:nth-of-type(2){
          height: .4rem;
          line-height: .4rem;
          padding: 0 .2rem;
          border-radius: .2rem;
          display: inline-block;
          background: linear-gradient(94deg,rgba(254,222,153,1),rgba(255,88,71,1),rgba(255,145,120,1));
          color: #fff;
          font-size: .24rem;
        }
      }
      .account{
        font-size: .24rem;
        color: #666;
      }
    }
  }
  .data-line{
    background: white;
  }
  .detail{
    margin-top: .4rem;
    background: white;
    padding: 0.3rem;
    .number-line{
      display: flex;
      border-bottom: 1px solid #f7f7f7;
      padding-bottom: 0.3rem;
      >div{
        width: 50%;
        box-sizing: border-box;
        font-size: 0.3rem;
        div{
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 0.4rem;
            margin-right: 0.2rem;
          }
        }
        p{
          color: #999;
          img{
            height: .3rem;
          }
        }
      }
    }
    .detail-line{
      padding-top: 0.3rem;
      >div{
        width: 25%;
        p{
          span{
            font-size: .4rem;
          }
        }
      }
    }
  }
  .right-border {
    box-sizing: border-box;
    border-right: 1px solid #eee;
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .data-line{
    display: flex;
    padding: 0.3rem;
    >div{
      width: 50%;
      box-sizing: border-box;
      font-size: 0.3rem;
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 0.4rem;
          margin-right: 0.2rem;
        }
      }
      p{
        color: #FF5847;
        font-size: .3rem;
      }
    }
  }
  .tips{
    margin-top: 2rem;
    color: #999999;
  }
</style>
