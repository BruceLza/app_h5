<template>
    <div class="team">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="head">
          <i class="iconfont icon-back" @click="$router.go(-1)"></i>
          <div class="searchBox">
            <div class="search">
              <img src="../../assets/img/my/search.png" alt="">
              <input type="search" placeholder="请输入昵称或手机号" @keyup.enter="reset(type)" v-model="keyword">
            </div>
          </div>
          <span class="searchBtn" @click="reset(type)">搜索</span>
        </div>
        <div class="t" v-if="data.referrer">您的推荐人</div>
        <div class="headbox shadow" v-if="data.referrer">
          <div class="info">
            <div class="avater" :style="{backgroundImage: 'url(' + data.referrer.avatar + ')'}" v-if="data.referrer.avatar"></div>
            <div class="avater" :style="{backgroundImage: 'url(' + $logo + ')'}" v-else-if="$logo"></div>
            <div class="nickname">
              <p class="name"><span v-if="data.referrer.nickname">{{data.referrer.nickname}}</span><span v-if="data.referrer.mobile">{{data.referrer.lv}}</span></p>
            </div>
            <div class="copy-area">
              <div class="copy-item" @click="copyText(data.referrer.mobile, '手机号')">
                <div><img src="../../assets/img/my/mobile.png">手机号</div>
                <p>{{data.referrer.mobile}} <img src="../../assets/img/my/fuzhi.png"></p>
              </div>
              <div class="copy-item" @click="copyText(data.referrer.wx_number, '微信号')">
                <div><img src="../../assets/img/balance/weixin.png">微信号</div>
                <p>{{data.referrer.wx_number || '无'}} <img src="../../assets/img/my/fuzhi.png"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="numBox">
          <div class="top">
            <div class="num" :class="{active: type !== 0}" @click="reset(1)">
              <span>总人数</span>
              <p>{{data.numAll}}</p>
            </div>
            <div class="num"  >
              <span>团队总业绩</span>
              <p>{{data.ach}}</p>
            </div>
            <!--<div class="num" :class="{active: type === 6}" @click="reset(6)">
              <span>裂变人数</span>
              <p>{{data.num6}}</p>
            </div>-->
          </div>
          <div class="bot">
            <div class="nums" :class="{active: type === 5}" @click="reset(5)">
              <span>今日</span>
              <p>{{data.numToday}}人</p>
            </div>
            <div class="nums" :class="{active: type === 4}" @click="reset(4)">
              <span>昨日</span>
              <p>{{data.numYesterday}}人</p>
            </div>
            <div class="nums" :class="{active: type === 2}" @click="reset(2)">
              <span>直代</span>
              <p>{{data.down}}人</p>
            </div>
            <div class="nums" :class="{active: type === 3}" @click="reset(3)">
              <span>裂变</span>
              <p>{{data.fission}}人</p>
            </div>
          </div>
        </div>
        <div class="lists">
          <div class="list" v-for="(item, index) of list" :key="index" @click="$router.push({name: 'fansDetail', query: {uid: item.uid}})">
            <div class="slef">
              <div class="avater" :style="{backgroundImage: 'url(' + item.avatar + ')'}" v-if="item.avatar"></div>
              <div class="avater" :style="{backgroundImage: 'url(' + $logo + ')'}" v-else-if="$logo"></div>
              <div class="slefinfo">
                <p class="name">{{item.nickname}}
                  <span v-if="item.lv">{{item.lv}}</span>
                </p>
                <p class="account">{{item.created_at}}</p>
              </div>
              <div class="recommend" v-if="item.num !== '' && item.order !== ''">
                <p v-if="item.num">粉丝：{{item.num}}</p>
                <p v-if="item.order">订单：{{item.order}}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'team',
  components: {
    MescrollVue
  },
  data () {
    return {
      data: '',
      list: [],
      page: 1,
      finish: false,
      keyword: '',
      loading: false,
      type: 1,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.mescroll) {
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
    }
    next()
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
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/user/team-new', {
        type: this.type,
        page: page.num,
        nickname: this.keyword
      }, true, true).then((res) => {
        if (res.code === 0) {
          this.data = res.data
          let arr = res.data.info
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    reset (type) {
      this.mescrollUp.htmlLoading = ''
      this.mescrollUp.page.num = 1
      this.type = type
      this.list = []
      this.finish = false
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  },
  mounted () {
    // 删除
    // this.getTeam()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.team{
  height: 100%;
  background: #f7f7f7;
  .head{
    width: 100%;
    position: relative;
    background: white;
    padding-top: .5rem;
    .icon-back{
      position: absolute;
      left: .3rem;
      font-size: .4rem;
      line-height: 1.1rem;
    }
    .searchBtn{
      position: absolute;
      bottom: 0;
      right: 0.3rem;
      font-size: 0.26rem;
      color: #333;
      line-height: 1.1rem;
    }
  }
  .headbox{
    width: 6.5rem;
    background: #fff;
    margin: 0 auto;
    border-radius: .1rem;
    padding:0 0.2rem;
    box-sizing: border-box;
  }
  .info{
    text-align: center;
    position: relative;
    top: -0.38rem;
    .avater{
      width: 1.38rem;
      height: 1.38rem;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0.2rem auto 0;
    }
    .nickname{
      padding: 0.1rem 0;
      border-bottom: 1px solid #f7f7f7;
      .name{
        font-size: .3rem;
        span:nth-of-type(2){
          font-size: .24rem;
          margin-left: .4rem;
          display: inline-block;
          border: 1px solid #FF5847;
          color: #FF5847;
          border-radius: .3rem;
          padding: 0 .1rem;
        }
      }
      .account{
        font-size: .24rem;
        color: #666;
      }
    }
    .copy-area{
      display: flex;
      padding-top: 0.3rem;
      .copy-item{
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
      .copy-item:first-child{
        border-right: 1px solid #f7f7f7;
      }
    }
  }
  .numBox{
    margin: .2rem auto;
    background: #fff;
    width: 6.9rem;
    border-radius: 0.1rem;
    .top{
      height: 2.56rem;
      align-items: center;
      display: flex;
      justify-content: space-around;
      position: relative;
      .num{
        position: relative;
        width: 1.82rem;
        height: 1.82rem;
        border-radius: 50%;
        background: #f7f7f7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        p{
          color: @theme-col;
          font-size: .36rem;
          position: relative;
        }
        span{
          font-size: .26rem;
          position: relative;
        }
      }
      .num::before{
        position: absolute;
        content: '';
        background: #fff;
        bottom: 2px;
        right: 2px;
        left: 2px;
        top: 2px;
        border-radius: 50%;
      }
      .active{
        background: linear-gradient( #FEDE99, #F6665D, #FFC393);
      }
    }
    .top:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: .2rem;
      right: .2rem;
      border-bottom: 1px solid #f7f7f7;
      transform-origin: 0 0;
      transform: scaleY(.5);
    }
    .bot{
      height: 1.7rem;
      display: flex;
      .nums{
        position: relative;
        flex: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p{
          font-size: .3rem;
          color: #333;
        }
        span{
          font-size: .24rem;
          color: #666;
        }
      }
      .active{
        p{
          color: @theme-col;
        }
        span{
          color: @theme-col;
        }
      }
      .nums:nth-of-type(3){
        flex: 3;
      }
      .nums:nth-of-type(4){
        flex: 4;
      }
      .nums:after{
        content: '';
        height: 50%;
        position: absolute;
        bottom: 25%;
        top: 25%;
        right: 0;
        border-right: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleX(.5);
      }
      .nums:last-of-type:after{
        display: none;
      }
    }
  }
  .searchBox{
    height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .search{
      height: .7rem;
      width: 4.9rem;
      background: #eee;
      display: flex;
      padding: 0 .35rem;
      box-sizing: border-box;
      border-radius: .35rem;
      align-items: center;
      img{
        width: .32rem;
        height: .32rem;
        margin-right: .2rem;
      }
      input{
        flex: 1;
        outline: none;
        border: none;
        background: inherit;
      }
    }
  }
  .lists{
    margin: .2rem auto;
    width: 6.9rem;
    .list{
      margin-bottom: 0.1rem;
      background: #fff;
      border-radius: 0.1rem;
      .slef{
        padding: .3rem;
        position: relative;
        display: flex;
        .avater{
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 1.08rem;
          height: 1.08rem;
          margin-right: .2rem;
          border-radius: 50%;
        }
        .slefinfo{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name{
            font-size: .3rem;
            color: #333;
            span{
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
            color: #999;
            font-size: .24rem;
          }
        }
        .recommend{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: .3rem;
          position: relative;
          p{
            font-size: .24rem;
            color: #666;
          }
        }
        .recommend:before{
          content: '';
          height: 100%;
          position: absolute;
          bottom: 0;
          top: 0;
          left: 0;
          border-left: 1px solid #dadada;
          transform-origin: 0 0;
          transform: scaleX(.5);
        }
      }
      .profit{
        padding: .3rem;
        display: flex;
        div{
          flex: 1;
          p:first-of-type{
            font-size: .24rem;
            margin-bottom: .2rem;
          }
          p:last-of-type{
            font-size: .3rem;
            color: @theme-col;
          }
        }
        div:nth-of-type(2){
          text-align: center;
        }
        div:nth-of-type(3){
          text-align: right;
        }
      }
    }
  }
}
.t{
  width: 6.5rem;
  font-size: .3rem;
  margin: .2rem auto .15rem;
}
.shadow {
  box-shadow: 0 2px 5px 2px rgba(0,0,0,0.05);
}
</style>
