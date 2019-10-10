<template>
  <div id="Video" class="videoIndex" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">{{headerTitle}}</p>
      </div>
    </div>
    <div class="videoContent">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="searchBox">
          <div class="box">
            <div class="inputBox">
              <input type="text" v-model="search" placeholder="请输入关键词">
              <img src="../../assets/img/video/sousuo.png" alt="">
            </div>
            <span @click="searchList">搜索</span>
          </div>
        </div>
        <div class="videoTabBox">
          <tab custom-bar-width="1.33rem" default-color="#999999" v-model="type" class="resultTab" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
            <tab-item @on-item-click="resetTab">电影</tab-item>
            <tab-item @on-item-click="resetTab">电视</tab-item>
            <tab-item @on-item-click="resetTab">综艺</tab-item>
            <tab-item @on-item-click="resetTab">动漫</tab-item>
          </tab>
        </div>
        <div class="videoBox">
          <div class="twoItemBox">
            <div class="twoitem" :class="{itemActive:index === twoItemNum,itemNone:index == 2 && type == 2}" v-for="(item, index) in list" :key="'twoItem'+index" @click="twoTabClick(index)">{{item}}</div>
          </div>
          <div class="videoItemBox">
            <!-- <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"> -->
              <div class="videoItem" v-for="(item,index) in dataList" :key="'videoItem'+index" @click="jumpTo('/videoPlay?id='+item.id)">
                <div class="videoImgBox">
                  <div class="videoImg" :style="{backgroundImage: 'url(' + item.image + ')'}"></div>
                </div>
                <p class="videoName">{{item.title}}</p>
              </div>
            <!-- </mescroll-vue> -->
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'videoSearch',
  components: {
    Tab,
    TabItem,
    MescrollVue,
  },
  data () {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
              //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0,
          size: 9
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
      dataList: [], // 列表数据
      list: ['热门', '最新', '评分'],
      search: '',
      type: 0,
      headerTitle: '',
      twoItemNum: 0,
      gradeShow: true
    }
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
       // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
     // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods: {
     // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      var that = this
      // 联网请求
      this.$http.get('/amoy/share-video/video-search', {keyword:that.search,type:that.type+1,page:page.num - 1, sort: that.twoItemNum + 1}, true).then((res) => {
        // 请求的列表数据
        if (res.code === 0) {
          if(!res.data.list.length&&page.num == 1){
            that.$vux.toast.text('暂无数据')
          }
          let arr = res.data.list
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = []
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        }
        
      }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    },
    resetTab() {
      this.search = ''
      this.dataList = []
      this.mescrollUp.htmlLoading = ''
      this.mescrollUp.page.num = 0
      this.mescroll.resetUpScroll()
    },
    twoTabClick(index) {
      this.twoItemNum = index
      this.search = ''
      this.dataList = []
      this.mescrollUp.htmlLoading = ''
      this.mescrollUp.page.num = 0
      this.mescroll.resetUpScroll()
    },
    searchList() {
      this.dataList = []
      this.mescrollUp.htmlLoading = ''
      this.mescrollUp.page.num = 0
      this.mescroll.resetUpScroll()
    }
  },
  beforeMount () {
    this.type = this.$route.query.type
  },
  mounted () {
    this.headerTitle = this.$route.query.title
  }
}
</script>
<style scoped lang="less">
  /deep/.vux-tab{
    background: rgba(245, 245, 245, 0.4);
  }
  /deep/.vux-tab .vux-tab-item.vux-tab-selected{
    font-size: 0.32rem;
    font-weight: 500;
    background: none;
    color: #191919;
  }
  /deep/.vux-tab .vux-tab-item{
    font-size:0.32rem;
    font-weight:500;
    background: none;
  }
  /deep/.vux-tab-bar-inner{
    background: linear-gradient(-87deg,rgba(250,152,144,1),rgba(254,116,129,1),rgba(254,81,105,1));
    box-shadow:0px 0.02rem 0.04rem 0px rgba(254,121,132,0.5);
  }
  /* /deep/.mescroll-downwarp{
    padding-top: 0 !important;
    display: block !important;
  }
  /deep/.mescroll > div{
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.4rem;
  } */
  .videoIndex{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif;
    // position: relative;
    overflow: hidden;
    background: #fff;
    .headerConBox{
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 0.83rem;
      .header{
        position: absolute;
        width: 100%;
        height: 0.83rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // border-bottom: 0.01rem solid #E7E7E7;
        color: #191919;
        .icon-back{
          position: absolute;
          font-size: 0.4rem;
          font-weight: 500;
          left: 0.31rem;
          z-index: 3;
        }
        .title{
          position: relative;
          width: 100%;
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.83rem;
          text-align: center;
        }
      }
    }
    .videoContent{
      position: absolute;
      top: 0.83rem;
      bottom: 0;
      width: 100%;
      .searchBox{
        .box{
          position: relative;
          margin: auto;
          margin-top: 0.05rem;
          width: 6.9rem;
          height: 0.62rem;
          box-shadow:0px 0.02rem 0.02rem 0px rgba(247,247,247,1);
          background:rgba(255,255,255,1);
          border-radius: .1rem;
          .inputBox{
            position: absolute;
            overflow: hidden;
            width: 5.73rem;
            height: 0.62rem;
            border-top: 0.01rem solid rgba(238,238,238,1);
            border-left: 0.01rem solid rgba(238,238,238,1);
            border-bottom: 0.01rem solid rgba(238,238,238,1);
            border-top-left-radius: .1rem;
            border-bottom-left-radius: 0.1rem;
            input{
              position: absolute;
              left: 0;
              top: 0;
              outline: none;
              border: none;
              height: 0.62rem;
              width: 5.73rem;
              box-sizing: border-box;
              border-bottom-left-radius: .1rem;
              border-top-left-radius: .1rem;
              color: #999999;
              padding-left: .63rem;
              box-sizing: border-box;
              font-size: .26rem;
            }
            img{
              position: absolute;
              top: .17rem;
              left:.16rem;
              width: .29rem;
              height: .29rem;
            }
          }
          span{
            display: inline-block;
            position: absolute;
            right: 0;
            width: 1.17rem;
            height: 0.66rem;
            line-height: 0.64rem;
            text-align: center;
            font-size: .32rem;
            background: linear-gradient(-9deg,rgba(250,152,144,1),rgba(254,116,129,1),rgba(254,81,105,1));
            color: #fff;
            border-bottom-right-radius: .1rem;
            border-top-right-radius: .1rem;
          }
        }
      }
      .videoTabBox {
        margin-top: 0.35rem;
        .resultTab{
          
        }
      }
      .videoBox{
        /* position: absolute;
        top: 3.04rem;
        bottom: 0;
        left: 0;
        right: 0; */
        // width: 6.9rem;
        margin: auto;
        // margin-top: 0.14rem;
        // padding-bottom: 0.65rem;
        background: #fff;
        .twoItemBox{
          padding-top: 0.4rem;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
          display: flex;
          flex-wrap: wrap;
          .twoitem{
            margin-left: 0.1rem;
            margin-right: 0.1rem;
            padding: 0.07rem 0.25rem 0.07rem 0.25rem;
            // border: 1px solid #999999;
            border-radius: 0.2rem;
            font-size: 0.24rem;
            font-weight: 500;
            line-height: 0.26rem;
            color: #999999;
          }
          .itemActive{
            // border-color: #FE546B;
            color: #fff;
            background: #FE546B;
          }
          .itemNone{
            display: none;
          }
        }
        .videoItemBox{
          /* position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0; */
          padding-top: 0.4rem;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          .videoItem{
            position: relative;
            overflow: hidden;
            width: 2.2rem;
            margin-bottom: 0.2rem;
            margin-left: 0.08rem;
            margin-right: 0.08rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .videoImgBox{
              position: relative;
              overflow: hidden;
              float: left;
              width: 2.2rem;
              height: 3.4rem;
              border-radius: 0.05rem;
              .videoImg{
                width:0;
                height:100%;
                padding-left: 100%;
                overflow:hidden;
                background-position: center center;
                background-repeat: no-repeat;
                -webkit-background-size:cover;
                -moz-background-size:cover;
                background-size:cover;
              }
            }
            .videoName{
              width: 80%;
              height: 0.3rem;
              margin-top: 0.15rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.23rem;
              font-weight: 400;
              color: #191919;
              line-height: 0.3rem;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
