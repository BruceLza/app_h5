<template>
  <div class="search">
    <div class="header">
      <!--<i class="iconfont icon-back" @click="goBack()"></i>-->
      <div class="searchBox">
        <i class="iconfont icon-search"></i>
        <input placeholder="输入您当前要搜索的商品" v-model="keyword" type="search" @keyup.enter="search" v-focus/>
      </div>
      <!--<span @click="search" :style="{color: $store.state.global.theme.mainColor}" >搜索</span>-->
      <span @click="goBack()" v-if="keyword === ''">取消</span>
      <span @click="search" v-else>搜索</span>
    </div>
    <div id="shopName">
      <ul>
        <li :class="active1? 'active' : '' " @click="showActive(1)">淘宝</li>
        <li :class="active2? 'active' : '' " @click="showActive(2)">京东</li>
        <li :class="active3? 'active' : '' " @click="showActive(3)">拼多多</li>
      </ul>
    </div>
    <div class="history">
      <div class="t">
        <span> <img src="../../assets/img/resou.png" alt="">热门搜索</span>
        <!--<i class="iconfont icon-delete" @click="del"></i>-->
      </div>
      <div class="listBox">
        <!--<span v-for="(item,index) in keywords" v-bind:key="index" @click="history(item)">{{item}}</span>-->
        <span v-for="(item, index) of list" :key="index" @click="history(item.keyword)">{{item.keyword}}</span>
      </div>
    </div>
    <div class="history">
      <div class="t">
        <span> <img src="../../assets/img/historySS.png" alt="">历史搜索</span>
        <i class="iconfont icon-delete" @click="del"></i>
      </div>
      <div class="listBox">
        <span v-for="(item,index) in keywords" v-bind:key="index" @click="history(item)">{{item}}</span>
      </div>
    </div>
    <!--<div class="history">-->
    <!--<div class="t">-->
    <!--<span>大家都在搜</span>-->
    <!--</div>-->
    <!--<div class="listBox">-->
    <!--<span v-for="(item, index) of list" :key="index" @click="history(item.keyword)">{{item.keyword}}</span>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'search',
  components: {
  },
  data () {
    return {
      active1: true,
      active2: false,
      active3: false,
      keyword: this.$route.query.key ? this.$route.query.key : '',
      keywords: utils.storage.get('keyword') || [],
      type: Number(this.$route.query.type) === 1 || Number(this.$route.query.type) === 2 ? this.$route.query.type : 0,
      list: []
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  methods: {
    searchlike (item) {
      this.$router.push('/results?search=' + encodeURIComponent(item) + '&type=0&index=0')
    },
    history (item) {
      this.keyword = item
      this.search()
    },
    del () {
      utils.storage.set('keyword', [])
      this.keywords = []
    },
    search () {
      let keyCode = this.keyword
      if (keyCode === '') {
        this.$vux.toast.text('请输入关键词')
        return
      }
      let key = utils.storage.get('keyword')
      if (key) {
        const index = key.indexOf(keyCode)
        if (index !== -1) {
          key.splice(index, 1)
        }
        key.unshift(keyCode)
      } else {
        key = []
        key.unshift(keyCode)
      }
      key = key.slice(0, 10)
      utils.storage.set('keyword', key)
      // this.$router.replace({path: '/search', query: {key: keyCode}})
      this.$router.replace('/results?search=' + encodeURIComponent(keyCode) + '&type=' + this.type + '&index=0')
    },
    getLike () {
      this.$http.post('/amoy/home/search-hot', {}, false, true).then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
      })
    },
    showActive (num) {
      this.type = Number(num - 1)
      if (num === 1) {
        this.active1 = true
        this.active2 = false
        this.active3 = false
      } else if (num === 2) {
        this.active1 = false
        this.active2 = true
        this.active3 = false
      } else {
        this.active1 = false
        this.active2 = false
        this.active3 = true
      }
    }
  },
  mounted () {
    // 删除
    this.getLike()
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
  .search{
    background: #fff;
    height: 100%;
    .header{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 999;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: .88rem;
      background: #fff;
      .icon-back{
        font-size: .4rem;
        color: #000;
        margin-top: .02rem;
      }
      .searchBox{
        width: 6.1rem;
        height: .6rem;
        border-radius: .3rem;
        background: #efefef;
        display: flex;
        align-items: center;
        padding-left: .3rem;
        .icon-search{
          font-size: .27rem;
          color: #999;
        }
        input{
          background: #efefef;
          margin-left: .2rem;
          width: 4.8rem;
          font-size: .26rem;
          color: #999;
          outline: none;
          border: none;
        }
      }
      span{
        font-size: .28rem;
        /*margin-right: .2rem;*/
        color: #333;
      }
    }
    #shopName {
      height: .95rem;
      line-height: .95rem;
      background-color:#F2F2F2 ;
      ul {
        display: flex;
        justify-content: space-around;
        li {
          height: .72rem;
          font-size: .32rem;
          color: #333;
          &.active {
            color: #fc3357;
            border-bottom: 2px solid #fc3357;
          }
        }
      }
    }
    .high{
      background: @h-col;
      height: .1rem;
      width: 100%;
    }
    .history{
      padding: .47rem .29rem .24rem .29rem;
      .t{
        display: flex;
        line-height: .28rem;
        justify-content: space-between;
        span{
          font-size: .3rem;
          color: #666;
          img {
            display: inline-block;
            width: .28rem;
            vertical-align: middle;
            margin-right: .05rem;
          }
        }
        i{
          font-size: .3rem;
          color: #666;
        }
      }
    }
    .listBox{
      overflow: hidden;
      font-size: .26rem;
      padding: .2rem 0;
      span{
        display: inline-block;
        padding: 0 .2rem;
        font-size: 12px;
        /*height: .46rem;*/
        line-height: 24px;
        background-color: #F8F8F8;
        border-radius: 12px;
        color: #666666;
        margin-top: .2rem;
        margin-left: .2rem;
      }
    }
  }
</style>
