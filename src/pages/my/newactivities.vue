<template>
  <div class="newactivities">
    <div class="banner">
      <img :src="banners" alt="">
      <div class="times">
        <i class="time">
          <img :src="times" alt="">
        </i>
        <div class="datetime" v-if="infolists">
          活动时间&nbsp; {{createdate | revisedatecreate}} - {{enddate | revisedateend}}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="activityinfo">
        <div class="titlelogo">
          <img :src="infos" alt="">
        </div>
        <div class="activityinfo_child">
          <ul>
            <li v-if="infolists" v-html="infolists.gift_content">
            </li>
            <!-- <li class="infolist">
              <div class="ion"></div>
               <div class="ion_test">
                 规则文字规则文规则文字规则文字规则文字规则文字规则文字规则文字字规则文字规则文字规则文字规则文字
              </div>
            </li>
            <li class="infolist">
              <div class="ion"></div>
               <div class="ion_test">
                 规则文字规则文规则文字规则文字规则文字规则文字规则文字规则文字字规则文字规则文字规则文字规则文字
              </div>
            </li>
            <li class="infolist">
              <div class="ion"></div>
               <div class="ion_test">
                 规则文字规则文规则文字规则文字规则文字规则文字规则文字规则文字字规则文字规则文字规则文字规则文字
              </div>
            </li>
              <li class="infolist">
              <div class="ion"></div>
               <div class="ion_test">
                 规则文字规则文规则文字规则文字规则文字规则文字规则文字规则文字字规则文字规则文字规则文字规则文字
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="laxin">
        <img :src="mynums" alt="">
      </div>
      <!-- 上面的样式   mynum-->
      <div class="laxinnum" v-if="newlist">
        <!-- 头像 -->
        <div class="logobox lt">
          <div v-if="!newlist.avatar" class="log">
              <img :src="holder" alt="">
          </div>
          <div v-if="newlist.avatar" class="log">
              <img :src="newlist.avatar" alt="">
          </div>
          <!-- 名称 -->
          <div class="title_box">
            <!-- 默认昵称 -->
            <div v-if="!newlist.nickname" class="title">用户{{newlist.mobile | reverse}}</div>
            <div v-if="newlist.nickname" class="title">{{newlist.nickname}}</div>
            <div class="tel">{{newlist.mobile}}</div>
         </div>
        </div>
        <div class="nums rt">
          <div class="titles">拉新人数</div>
          <div class="numres">{{newlist.num}}</div>
        </div>
      </div>
      <div class="laxin">
         <img :src="mynews " alt="">
      </div>
      <!-- 下面的样式 -->
      <div class="laxinmun_box">
        <div class="laxinmun_hua">
          <div class="laxinnums" v-for="(item,index) in newvan" :key="index">
            <div class="logobox lt">
              <div class="ranking" v-if="(index+1) == '1'">
                  <img :src="priseone" alt="">
              </div>
                <div class="ranking" v-if="(index+1) == '2'">
                  <img :src="prisetow" alt="">
              </div>
                <div class="ranking" v-if="(index+1) == '3'">
                  <img :src="prisetherr" alt="">
              </div>
                <div class="ranking" v-if="(index+1 ) > '3'">
                  <div class="rankingnum">{{index+1}}</div>
                </div>
              <!-- <div class="log">
                  <img :src="newlist.avatar" alt="">
              </div> -->
              <div v-if="!item.avatar" class="log">
                  <img :src="holder" alt="">
              </div>
              <div v-if="item.avatar" class="log">
                  <img :src="item.avatar" alt="">
              </div>
              <div class="title_box">
                <!-- 默认昵称 -->
              <div v-if="!item.nickname" class="title">用户{{item.mobile | reverse}}</div>
              <div v-if="item.nickname" class="title">{{item.nickname}}</div>
                <div class="tel">{{item.mobile | reverse}}</div>
              </div>
            </div>
            <div class="nums rt">
              <div class="titles">拉新人数</div>
              <div class="numres">{{item.num}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnis" @click="Invitation">
        <img :src="btnis" alt="">
      </div>
    </div>
    <!-- 中奖积分 -->
    <div class="prizealert"  v-show="showalert  === 1"  @click.stop="close()">
      <div class="alert">
        <div class="guang">
         <img :src="guang"   alt="">
        </div>
        <div class="prizetitle">
          <div class="pictxt">
              <div class="he">恭喜你</div>
              <div class="hetit">此次活动获得第一名</div>
          </div>
          <img :src="yeszj" alt="">
        </div>
        <div class="prizecontent">
          <div v-if="prizeinfo.num !== null" class="contents">你邀请了<span class="corred">{{prizeinfo.num}}</span>位好友</div>
          <div v-if="prizeinfo.num === null" class="contents">你邀请了<span class="corred">0</span>位好友</div>
          <div v-if="prizeinfo.num !== null" class="contents"><span class="corred">{{prizeinfo.y_num}}</span>位有效好友</div>
          <div v-if="prizeinfo.num === null" class="contents"><span class="corred">0</span>位有效好友</div>
          <div class="prize" >奖品是：{{prizeinfo.gift}}元现金红包</div>
          <div class="tishi">（3个工作日内直接显示在可提现余额内）</div>
          <div class="lijibtn" @click.stop="close()" >立即领取</div>
          <div  class="clos" @click.stop="close()" >关闭</div>
        </div>
      </div>
    </div>
      <!-- 获奖的  实物-->
    <div class="prizealert"  v-show="showalert  === 2"  @click.stop="close()">
      <div class="alert">
        <div class="guang">
         <img :src="guang"   alt="">
        </div>
        <div class="prizetitle">
          <div class="pictxt">
              <div class="he">恭喜你</div>
              <div class="hetit">此次活动获得第一名</div>
          </div>
          <img :src="yeszj" alt="">
        </div>
        <div class="prizecontent">
          <div class="contents">你邀请了<span class="corred">{{prizeinfo.num}}</span>位好友</div>
          <div class="contents"><span class="corred">{{prizeinfo.y_num}}</span>位有效好友</div>
          <div class="prize" >奖品是：{{prizeinfo.gift}}</div>
          <!-- <div class="tishi">（3个工作日内直接显示在可提现余额内）</div> -->
          <div class="lijibtn" @click="jumpTo('/setuserinfo')">立即领取</div>
          <div  class="clos" @click.stop="close()" >关闭</div>
        </div>
      </div>
    </div>
    <!-- 没获奖 -->
    <div class="prizealert"  v-show="showalert === 3"  @click.stop="close()">
      <div class="alert">
        <div class="prizetitle">
          <div class="pictxts ">
              <div class="he">很遗憾！</div>
              <div class="hetit">此次活动没有中奖</div>
          </div>
          <img :src="nozj" alt="">
        </div>
        <div class="prizecontent">
          <div class="contents">你邀请了<span class="corred">{{prizeinfo.num}}</span>位好友</div>
          <div class="contents"><span class="corred">{{prizeinfo.y_num}}</span>位有效好友</div>
          <div class="prize">下次活动继续努力哦~</div>
          <!-- <div class="tishi">（3个工作日内直接显示在可提现余额内）</div> -->
          <div class="lijibtn" @click.stop="close()">继续努力</div>
          <div class="clos" @click.stop="close()" >关闭</div>
        </div>
      </div>
    </div>
    <!-- 分享 -->
    <div class="share_to" v-transfer-dom>
      <div class="weui-mask" @click="showToast = false" v-if="showToast === true"  ></div>
      <div class="classBox"  v-if="showToast ===true"  >
        <div><img src="../../assets/img/home/goods/wechat.png" alt="" @click="shareFri(1)"><p>微信好友</p></div>
        <div><img src="../../assets/img/home/goods/friend_circle.png" alt="" @click="shareFri(2)"><p>朋友圈</p></div>
        <div><img src="../../assets/img/home/goods/qq.png" alt="" @click="shareQq()"><p>QQ</p></div>
        <div><img src="../../assets/img/home/goods/shares.png" alt="" @click="toContacts()"><p>分享链接</p></div>
      </div>
    </div>
    <!-- @click.stop="closenext()" -->
    <div class="remind" v-show="remind"  >
      <div class="alerts">
        <div class="remindtitle">提醒</div>
        <div class="remindcontent">
          <div class="remindcontents">{{remindcontent}} </div>
           <div class="remindnext" @click.stop="closenext()">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {XDialog, TransferDomDirective as TransferDom} from 'vux'
let imgIndex = 0
export default {
    name:"",
    components:{
    XDialog
    },
    directives: {
    TransferDom
    },
  data(){
    return{
      banners:require("../../assets/img/my/banners.png"),
      infos:require("../../assets/img/my/infos.png"),
      btnis:require("../../assets/img/my/btnis.png"),
      yeszj:require("../../assets/img/my/yeszj.png"),
      guang:require("../../assets/img/my/guang.png"),
      mynews:require("../../assets/img/my/mynews.png"),
      mynums:require("../../assets/img/my/mynums.png"),
      priseone:require("../../assets/img/my/priseone.png"),
      prisetow:require("../../assets/img/my/prisetow.png"),
      prisetherr:require("../../assets/img/my/prisetherr.png"),
      pic:require("../../assets/img/my/shoucang.png"),
      nozj:require("../../assets/img/my/nozj.png"),
      times:require("../../assets/img/my/time.png"),
      holder:require("../../assets/img/my/holder.png"),
      showalert:false,
      // showalertno:false,
      showToast: false,
      info: this.$store.state.user.userInfo,
      data: '',
      type: 1,
      shareurl:"",
      infolists:"",
      prizeinfo:{
        id:"7",
        uid:"1",
        mobile:null,
        num:"20",
        gift:"iPhone X",  //中奖物品
        gift_sku:"实物",
        gift_name:"拉新活动",
        biz_id:"1",
        username: null,
        state:"0",
        y_num:"2",
        state:"1" //1 实物   2积分
        }
      ,
      infolist:[
        {
          avatar:require("../../assets/img/my/shoucang.png"),
          nickname:"小姑凉",
          mobile:"15003873032",
          num:"10"
        },
      ],
      enddate:"",
      createdate:"",
      newlist:"",
      newvan:"",
      remind:false,
      remindcontent:"",
      nums:{
        numid:"0"
      }
    }
  },
  methods:{
    close(){
      this.showalert=false;
    },
    closenext(){
      this.remind=false;
      this.$router.go(-1)
    },
    // 立即邀请
    Invitation(){
       this.showToast=true
    },
    //活动说明  
    getnewlist(){
      this.$http.post('/amoy/home/newlist',{
      },true,true).then(res =>{
        //  2没有活动 1结束 0成功
        if(res.code === 0){
           if(res.data.p_state == '2'){
             console.log("执行了")
            // this.$vux.toast.text(res.msg)
            this.remind = true
            this.remindcontent = '暂无活动'
          }else if(res.data.p_state == '1'){
            // this.$vux.toast.text(res.msg)
            this.remind = true
            this.remindcontent = '活动已结束'
          }
          if(res.data.arr){
            this.infolists = res.data.arr;
            this.createdate = res.data.arr.created_time;
            this.enddate = res.data.arr.stop_time;
          }
          // this.infolists = res.data.arr;
          // this.createdate = res.data.arr.created_time;
          // this.enddate = res.data.arr.stop_time;
          if(res.data.mynum){
            this.newlist = res.data.mynum;
          }
          this.newvan = res.data.van;
          //  this.$vux.toast.text(res.msg)
        }
      })
    },
    //获取中奖信息 amoy/home/show 
    // 2  中奖   3未中奖   0未到开奖
    getprizeinfo(){
      this.$http.post('/amoy/home/show ',{
      },true,true).then(res =>{
        if(res.code === 0){
          this.prizeinfo = res.info
          this.showalert = res.data.state
          // this.showalert = 2
          // console.log( this.prizeinfo,"prizeinfo");
        }
      })
    },
    // 分享
    shareFri (type) {
      // alert("执行了",type)
      console.log(type,"type")
      var that = this
      this.showToast = false
      let way = type === 1 ? 'session' : 'timeline'
      if (that.type === 1) {
        console.log(1)
        let format = 'share' + new Date().getTime() + '.png'
        api.download({
          url: that.data.appDownLogo,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          console.log(12)
          var wx = api.require('wx')
          wx.shareWebpage({
            scene: way,
            title: that.data.appDownTitle,
            description: that.data.appDownDesc,
            thumb: 'fs://' + format,
            contentUrl: that.data.downloadUrl
          }, function (ret, err) {
            that.$http.post('/amoy/task/collection', {}, false, true).then()
            // if (ret.status) {
            //   alert('分享成功')
            // } else {
            //   alert(err.code)
            // }
          })
        })
      } else {
        that.$vux.loading.show({
          text: '加载中'
        })
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs[imgIndex],
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          console.log(22)
          that.$vux.loading.hide()
          let wx = api.require('wx')
          wx.shareImage({
            scene: way,
            contentUrl: 'fs://' + format
          }, function (ret, err) {
            that.$http.post('/amoy/task/collection', {}, false, true).then()
          })
        })
      }
    },
    // 复制粘贴
    toContacts(){
      // if(this.data !=='' ){
      if(this.shareurl !=='' ){
        console.log(this.shareurl,"复制的内容")
        this.$vux.toast.text("已复制到剪贴板")
        let clipBoard = api.require('clipBoard')
        clipBoard.set({
          value: this.shareurl
          // value: this.data.downloadUrl
        }, function (ret, err) {
          if (ret) {
            console.log(ret)
          } else {
            this.$vux.toast.text("复制失败")
          }
        })
      }else{
         this.$vux.toast.text("复制的内容为空")
      }
    },
    shareQq () {
      let that = this
      this.showToast = false
      if (that.type === 1) {
        let sharedModule = api.require('shareAction')
        sharedModule.share({
          text: that.data.downloadUrl,
          type: 'text'
        })
      } else {
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs[imgIndex],
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          that.$vux.loading.hide()
          if (ret.state === 1) {
            let sharedModule = api.require('shareAction')
            sharedModule.share({
              images: ['fs://' + format],
              type: 'image'
            })
          }
        })
      }
    },
      getSwiper (){
        this.$http.post('/amoy/user/invite', {}, true, true).then(res => {
        if (res.code === 0) {
          this.imgs = []
          res.data.img.forEach((item) => {
            console.log(this.link + '/amoy/user/invite?tpl=' + item + '&uid=' + this.info.uid + '&invite_code=' + this.info.invite_code)
            this.imgs.push(this.link + '/amoy/user/invite?tpl=' + item + '&uid=' + this.info.uid + '&invite_code=' + this.info.invite_code)
          })
          this.data = res.data
          // this.shareurl = '知省联盟下载链接:' + res.data.downloadUrl + '\n邀请码:11' 
          this.shareurl = '知省联盟下载链接:' + res.data.downloadUrl + '\n邀请码:' + res.data.invite_code
          console.log("this.data",this.data)
        }
      })
    },
  },
  filters:{
    revisedatecreate:function(val){
        return val.slice(0,(val.indexOf(" ")))
    },
    revisedateend:function(valend){
        return valend.slice(0,(valend.indexOf(" ")))
    },
    reverse:function(moe){
      let moestate = moe.slice(0,3)
      let moeend = moe.slice(7)
      return moestate + '****' + moeend
    }
  },
  mounted(){
    this.getSwiper();
    this.getnewlist();
    this.getprizeinfo();
  }
}
</script>
<style  scoped lang="less">
  .newactivities{
    position: relative;
    background: #ee3636;
    .banner{
      position: relative;
      .times{
        position: absolute;
        width: 100%;
        text-align: center;
        top: .43rem;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .time{
          display: block;
          width: .27rem;
          height: .27rem;
          margin-top: .05rem;
          margin-right: .1rem;
        }
        .datetime{
        }
      }
    }
    .content{
      padding:0 .3rem; 
    }
    .activityinfo{
      width: 100%;
      background: #fff;
      // min-height: 2.5rem;
      border-radius: .15rem;
      padding:.15rem;
      box-sizing: border-box;
      position: relative;
       .titlelogo{
         position: absolute;
         margin-left: -2.1rem;
         top: -0.32rem;
         width: 4.2rem;
         height: 1rem;
         left: 50%;
       }
      .activityinfo_child{
        height: 100%;
        border: 1px solid #ff8d8d;
        padding: .8rem .3rem 0 .3rem;
        box-sizing: border-box;
        overflow: scroll;
        .infolist{
          margin-bottom: .15rem;
          display: flex;
          flex-wrap: wrap;
          .ion{
            display: block;
            width: .15rem;
            height: .15rem;
            border-radius: 50%;
            background: red;
            margin-top: .1rem;
            margin-right: .1rem;
          }
          .ion_test{
            width: 95%;
          }
        }
      }
    }
    .laxin{
      margin-top: .5rem;
      margin-bottom: .3rem;
    }
    .laxinnum{
      min-height: 1.35rem;
      background: #fff;
      border-radius: .15rem;
      // display: flex;
      // flex-wrap: wrap;
      padding: .3rem .2rem;
       box-sizing: border-box;
      .logobox{
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        .log{
          width: .65rem;
          height: .65rem;
          border-radius: 50%;
          background: #fff;
          margin-right: .2rem;
        }
        .title_box{
          .title{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 3rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: .28rem;
            color: #000;
          }
          .tel{
            font-size: .2rem;
            color: #999491;
          }
        }
      }
      .nums{
        text-align: right;
        .titles{
          color: #666666;
        }
        .numres{
          color: #e30a1f;
          font-size: .28rem;
        }
      }
    }
    // 下面的样式
    .laxinmun_box{
      background: #fff;
      border-radius: .15rem;
      overflow: scroll;
      max-height: 5.4rem;
      min-height: 1.35rem;
      .laxinmun_hua{
        // overflow: hidden;
        .laxinnums{
          min-height: 1.35rem;
          background: #fff;
          // display: flex;
          // flex-wrap: wrap;
          padding: .3rem .1rem;
          box-sizing: border-box;
          border-bottom: 1px solid #ffd2b1;
          margin: 0 .2rem;
          .logobox{
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            .ranking{
              width: .4rem;
              height: .4rem;
              margin-top: .15rem;
              margin-right: .15rem;
              font-size: .28rem;
              font-weight: 800;
            .rankingnum{
                  text-align: center;
                }
              }
            .log{
              width: .65rem;
              height: .65rem;
              border-radius: 50%;
              background: #fff;
              margin-right: .2rem;
              text-align: center;
            }
            .title_box{
              .title{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 3rem;
                height: 0.3rem;
                line-height: 0.3rem;
                font-size: .28rem;
                color: #000;
              }
              .tel{
                font-size: .2rem;
                color: #999491;
              }
            }
          }
          .nums{
            text-align: right;
            .titles{
              color: #666666;
            }
            .numres{
              color: #e30a1f;
              font-size: .28rem;
            }
          }
        }
      }
    }
    .btnis{
      margin-top: .6rem;
    }
  .prizealert{
    width: 100%;
    background: rgba(76, 76, 76, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    height: 100%;
  
    .alert{
      width: 4.8rem;
      height: 6rem;
      background: #fff;
      border-radius: .2rem;
      position: absolute;
      top: 60%;
      left: 50%;
      margin-left: -2.4rem;
      margin-top: -4rem;
      box-sizing: border-box;
      .guang{
        position: absolute;
        top: -1.7rem;;
        left:0;
      }
      .prizetitle{
        position: relative;
        .pictxt{
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          width: 100%;
          margin-top: .2rem;
          .he{
            width: 100%;
            font-size: .4rem;
            color: #fff;
            text-align: center;
          }
          .hetit{
            width: 100%;
            font-size: .3rem;
            color: #fff;
            text-align: center;
          }
        }
        .pictxts{
          position: absolute;
          width: 2.4rem;
          top: 0;
          left: 0;
          text-align: center;
          // width: 100%;
          margin-top: .2rem;
          margin-left: .4rem;
          .he{
            width: 100%;
            font-size: .4rem;
            color: #fff;
            text-align: left;
          }
          .hetit{
            width: 100%;
            font-size: .3rem;
            color: #fff;
            text-align: left;
          }
        }
      }
      .prizecontent{
        margin-top: .2rem;
        text-align: center;
        font-size: .4rem;
        color: #000;
        height: 3rem;
        width: 100%;
        .contents{
          width: 100%;
          text-align: center;
          color: #000;
          font-size: .25rem;
          .corred{
            font-size: .3rem;
            color: #ff5846;
          }
        }
        .prize{
          margin-top: .3rem;
          font-size: .3rem;
        }
        .tishi{
          font-size: .25rem;
          color: #999999;
          margin-top: .1rem;
        }
        .lijibtn{
          width: 2.5rem;
          height: .6rem;
          line-height: .6rem;
          color: #fff;
          text-align: center;
          border-radius: .3rem;
          background:  linear-gradient(to right,#fea164, #fe6039);
          margin: .35rem auto 0;
          font-size: .3rem;
        }
        .clos{
          width: 100%;
          height: .3rem;
          line-height: .3rem;
          color: #000;
          margin-top: .35rem;
          font-size: .25rem;
        }
      } 
    }
  }
  .share_to{
    background: red;
    position: relative;
    width: 100%;
  }
  .remind{
    width: 100%;
    height: 100%;
    background: rgba(76, 76, 76, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    .alerts{
      width: 4.8rem;
      height: 3rem;
      background: #fff;
      border-radius: .2rem;
      position: absolute;
      top: 60%;
      left: 50%;
      margin-left: -2.4rem;
      margin-top: -4rem;
      padding: .2rem;
      box-sizing: border-box;
      .remindtitle{
        margin-bottom: .3rem;
        width: 100%;
        text-align: center;
        color: #da2a03;
        font-size: .35rem;
      }
      .remindcontent{
        margin-top: .1rem;
        text-align: center;
        font-size: .4rem;
        color: #da2a03;
        height: 2rem;
        width: 100%;
        .remindcontents{
           height: 1rem;
           width: 100%;
           color: #000
        }
        .remindnext{
          text-align: center;
          color: #000;
          font-size: .25rem;
        }
      } 
    }
}
  
  }
  .lt{
    float: left;
  }
  .rt{
    float: right;
  }
    .classBox{
      border-top: 1px solid #f9f6f6;
      z-index: 100000;
      position: fixed;
      bottom: 0;
      height: 2rem;
      width: 7.5rem;
      display: flex;
      background: #fff;
      border-radius: 0;
      div{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: .9rem;
          height: .9rem;
        }
        p{
          margin-top: .2rem;
          color: #666;
          font-size: .26rem;
        }
      }
    }
</style>


