<template>
  <div id="Video" class="videoPlay" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">{{videoTitle}}</p>
        <div class="rightBut" @click="analysisShow()">切换路径</div>
      </div>
    </div>
    <div class="contentBox">
      <div class="videoBox">
        <!--<iframe width="100%" height="100%" border="0" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true" ref="ifram" name="iframe">-->
        <!--</iframe>-->
        <div class="cover" @click="look" v-if="analysisSetUrl"><img src="../../assets/video.png" alt=""></div>
      </div>
      <div class="playTitle">正在播放：{{videoTitle}}</div>
      <div class="setBox" v-show="setList">
        <div class="setItem" :class="{setActive:setItemActive == index}" v-for="(item,index) in setList" :key="'setitem'+index" @click="setItemClick(index)">
          第{{index + 1}}集
        </div>
      </div>
      <div class="descBox" v-html="desc">
      </div>
    </div>
    <div class="analysisBox" v-show="analysisShowHidde">
      <div class="analysisItemBox">
        <div class="analysisItem" :class="{analysisItemBor:analysisUrl.length != index +1,analysisItemActive:analysisUrlIndex == index}" v-for="(item,index) in analysisUrl" :key="'analysisUrl'+index" @click="analysisClick(index)">线路{{index+1}}</div>
      </div>
      <div class="noBut" @click="analysisShow()">取消</div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'videoPlay',
  components: {
    MescrollVue,
  },
  data () {
    return {
      id: '',
      goBackNumber: 0,
      setItemActive: 0,
      analysisShowHidde: false,/* 切换路径弹窗 */
      setList:[],
      analysisUrl: JSON.parse(localStorage.getItem('analysisUrl')),
      desc: '',
      videoTitle: '',
      analysisUrlIndex: 0,
      analysisSetUrl: '',
      episodes:[]
    }
  },
  methods: {
    getInfo() {
      var that = this
      this.$http.get('/amoy/share-video/video-info', {id:this.id}, true).then(res => {
        if(res.code == 0){
          this.videoTitle = res.data.title
          this.desc = res.data.text
          this.analysisSetUrl = res.data.link
          this.episodes = res.data.episodes
          if(res.data.episodes.length >0) {
            this.setList = res.data.episodes
          } else {
            this.setList = null
          }
          that.setItemClick(0)
        }
      })
    },
    setItemClick(value) {
      var that = this
      that.setItemActive = value
      that.isSetList()
    },
    look () {
      let that = this
      if (that.analysisSetUrl === '') {
        that.$vux.toast.text('正在加载视频，请稍后重试！')
        return
      }
      if (that.episodes.length > 0) {
        this.$router.push('/video?url=' + this.analysisUrl[this.analysisUrlIndex] + that.setList[that.setItemActive])
      } else {
        this.$router.push('/video?url=' + this.analysisUrl[this.analysisUrlIndex] + this.analysisSetUrl)
      }
    },
    isSetList() {
      // var that = this
      // if(that.episodes.length > 0) {
      //   that.$refs.ifram.contentWindow.location.replace(that.analysisUrl[that.analysisUrlIndex] + that.setList[that.setItemActive])
      //   // console.log(that.analysisUrl)
      //   // console.log(that.analysisUrl[that.analysisUrlIndex] + that.setList[that.setItemActive],that.setItemActive+1+'集')
      // } else {
      //   that.$refs.ifram.contentWindow.location.replace(that.analysisUrl[that.analysisUrlIndex] + that.analysisSetUrl)
      //   // console.log(that.analysisUrl)
      //   // console.log(that.analysisUrl[that.analysisUrlIndex] + that.analysisSetUrl)
      // }
    },
    // 切换路径弹窗
    analysisShow() {
      this.analysisShowHidde = !this.analysisShowHidde
    },
    analysisClick(index) {
      var that = this
      this.analysisUrlIndex = index
      that.isSetList()
      this.analysisShowHidde = !this.analysisShowHidde
    }
  },
  beforeMount() {
    var that = this
    that.id = that.$route.query.id
  },
  mounted () {
    var that = this
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
  .videoPlay{
    font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: scroll;
    background: #fff;
    .headerConBox{
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 0.83rem;
      .header{
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 0.83rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 3rem;
          height: 0.83rem;
          margin: auto;
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.83rem;
          text-align: center;
        }
        .rightBut{
          position: absolute;
          right: 0.3rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.28rem;
          font-weight: 500;
          line-height: 0.83rem;
          color: #999999;
          i {

          }
        }
      }
    }
    .contentBox{
      position: absolute;
      overflow: auto;
      top: 0.83rem;
      bottom: 0;
      width: 100%;
      .videoBox{
        position: relative;
        width: 100%;
        height: 3.82rem;
        .cover{
          background: rgba(0,0,0,1);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 1rem;
            height: 1rem;
          }
          /*position: absolute;*/
          /*left: 0;*/
          /*right: 0;*/
          /*top: 0;*/
          /*bottom: 0;*/
          /*background: rgba(0,0,0,0);*/
        }
      }
      .playTitle{
        position: relative;
        overflow: hidden;
        width: 6.9rem;
        height: 0.86rem;
        margin: auto;
        margin-top: 0.22rem;
        border-bottom: 0.01rem solid #EEEEEE;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.32rem;
        font-weight: bold;
        line-height: 0.86rem;
        color: #191919;
      }
      .setBox{
        position: relative;
        width: 6.9rem;
        margin: auto;
        padding: 0.21rem 0.025rem;
        display: flex;
        flex-wrap: wrap;
        border-bottom: 0.01rem solid #EEEEEE;
        .setItem{
          width: 1.36rem;
          height: 0.44rem;
          border-radius: 0.1rem;
          margin: 0.14rem 0.175rem;
          background: #F5F5F5;
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.44rem;
          text-align: center;
          color: #555555;
        }
        .setActive{
          color: #FE5169;
        }
      }
      .descBox{
        width: 6.9rem;
        margin: auto;
        margin-top: 0.26rem;
        margin-bottom: 0.88rem;
        font-size: 0.26rem;
        font-weight: 400;
        line-height: 0.48rem;
        color: #555555;
      }
    }
    .analysisBox{
      position: absolute;
      padding: 0.8rem 0 0.5rem 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      background: rgba(0, 0, 0, 0.26);
      .analysisItemBox{
        width:6.7rem;
        margin: auto;
        border-radius: 0.1rem;
        background: #fff;
        .analysisItem{
          height: 0.77rem;
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.77rem;
          text-align: center;
          color: #666;
        }
        .analysisItemBor{
          border-bottom: 0.01rem solid rgba(217, 217, 217, 0.5);
        }
        .analysisItemActive{
          color: #FE7481;
        }
      }
      .noBut{
        width: 6.7rem;
        height: 0.77rem;
        background: #fff;
        border-radius: 0.1rem;
        margin: auto;
        margin-top: 0.3rem;
        font-size: 0.3rem;
        font-weight: 500;
        line-height: 0.77rem;
        text-align: center;
        color: #191919;
      }
    }
  }
</style>
