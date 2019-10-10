<template>
  <div id="detail" class="detail" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">挑战明细</p>
      </div>
      <div class="statisticsBox">
        <div class="statisticsItem">
          <p class="number">{{spend}}</p>
          <p class="text">投入(元)</p>
        </div>
        <div class="statisticsItem">
          <p class="number">{{profit}}</p>
          <p class="text">收入(元)</p>
        </div>
        <div class="statisticsItem">
          <p class="number">{{count}}</p>
          <p class="text">参与(天)</p>
        </div>
        <div class="statisticsItem">
          <p class="number">{{success}}</p>
          <p class="text">成功(天)</p>
        </div>
      </div>
    </div>
    <div class="statisticsList">
      <p class="title"><i class="titleIcon"></i>每日明细</p>
      <div class="listBox">
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="listItem" v-for="(item,index) in dataList" :key="'detail'+index">
            <div class="itemTime">{{item.created_at}}期</div>
            <div class="itemPric">投入{{item.money}}</div>
            <div class="itemState" v-if="item.status == '0'">等待打卡</div>
            <div class="itemState" v-if="item.status == '1'">打卡成功</div>
            <div class="itemState" v-if="item.status == '2'">打卡失败</div>
          </div>
          <div id="empty"></div>
        </mescroll-vue>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name:'Detail',
  components: {
    MescrollVue // 注册mescroll组件
  },
  data () {
    return {
      count: '',
      profit: '',
      spend: '',
      success: '',
      mescroll: null, // mescroll实例对象
      mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
              //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0
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
      dataList: [] // 列表数据
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
      // 联网请求
      this.$http.post('/amoy/home/dk-detail', {page:page.num}, true).then((response) => {
        // 请求的列表数据
        if (response.code === 0) {
          var data = response.data
          this.count = data.count
          this.profit = data.profit
          this.spend = data.spend
          this.success = data.success
        }
        let arr = response.data.data
        // 如果是第一页需手动制空列表
        if (page.num === 1) this.dataList = []
        // 把请求到的数据添加到列表
        this.dataList = this.dataList.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="less">
  .detail{
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
      height: 3.2rem;
      padding-top: 0.35rem;
      box-sizing: border-box;
      background:linear-gradient(0deg,rgba(199,216,230,1),rgba(34,100,153,1));
      .header{
        width: 100%;
        height: 0.4rem;
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
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
      .statisticsBox{
        width: 100%;
        height: 1.86rem;
        padding-top: 0.33rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        text-align: center;
        .statisticsItem{
          flex: 1;
          .number{
            font-family:PingFang-SC-Bold;
            font-size: 0.36rem;
            font-weight: bold;
            line-height: 0.36rem;
            margin-bottom: 0.4rem;
          }
          .text{
            font-family:PingFang-SC-Medium;
            font-size: 0.3rem;
            font-weight: 500;
            line-height: 0.3rem;
          }
        }
      }
    }
    .statisticsList{
      position: absolute;
      top: 3.2rem;
      left: 0;
      right: 0;
      bottom: 0;
      color: #333;
      .title{
        width: 100%;
        margin-top: 0.38rem;
        margin-bottom: 0.23rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family:PingFang-SC-Regular;
        font-size: 0.26rem;
        font-weight: bold;
        line-height: 0.26rem;
        text-align: left;
        .titleIcon{
          display: block;
          width: 0.04rem;
          height: 0.24rem;
          margin-right: 0.1rem;
          margin-left: 0.2rem;
          background: #FF5847;
        }
      }
      .listBox{
        position: absolute;
        top: 0.87rem;
        left: 0;
        right: 0;
        bottom: 0;
        .listItem{
          font-family:PingFang-SC-Regular;
          width: 6.9rem;
          height: 0.88rem;
          margin: auto;
          font-size: 0.24rem;
          font-weight: bold;
          line-height: 0.88rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 0.01rem solid #EEEEEE;
          .itemTime{
            width: 3.6rem;
            text-align: left;
          }
          .itemPric{
            width: 2.09rem;
          }
          .itemState{
            width: 1.2rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
