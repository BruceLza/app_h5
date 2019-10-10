<template>
    <div class="setting">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        <span style="color:black">免费领取面膜</span>
      </x-header>
       <div class="list">
          <div v-if="details.thumbs.length>0">
              <swiper  ref="smallImages" >
                <swiper-slide class="goods_swiper" v-for="(item, index) in details.thumbs" :key="index">
                    <img :src="item" :key="item">
                </swiper-slide>
             </swiper>
          </div>
          <div class="banner" v-else>
              <img :src="details.thumb"  alt="">
          </div>
          <div class="mall-saoma"  @click="handleQrcode()">
              <i class="iconfont icon-qrcode"></i>
          </div>
          <div class="mask-facial" v-if="mask" >
              <img :src="qrcode" class="img_1" alt="">
              <img class="img_2"  src="../../../assets/img/sign/close.png" alt="" @click="mask=false">
          </div>
          <div class="share_to" v-if="showToast">
            <div class="weui-mask" @click="showToast = false"></div>
            <div class="classBox">
                <div><img src="../../../assets/img/home/goods/wechat.png" alt="" @click="shareFri(1)"><p>微信好友</p></div>
                <div><img src="../../../assets/img/home/goods/friend_circle.png" alt="" @click="shareFri(2)"><p>朋友圈</p></div>
            </div>
          </div>
          <div class="p-detail">
            <div class="item-box" >
                <div class="row_1" >{{details.goodsName}}</div>
                <div class="row_2">
                  <div>  <s>￥{{details.marketprice}}</s> </div>
                  <div> 可领取:{{details.allNum}}盒 </div>
                </div>
                <div>运费：{{details.sendPrice}}元/盒</div>
                <div class="row_3">
                    <div>领取数量</div>
                    <div> <img align="absmiddle" @click="reduce()" src="../../../assets/mall/img/facial/reduce.png" alt=""> <input type="text" v-model="count"> <img align="absmiddle" @click="add()" src="../../../assets/mall/img/facial/add.png" alt=""></div>
                </div>
            </div>
            <div class="bg_gray"></div>
            <div class="facial-img">
                <img :src="details.shareImg" @click="showToast=true" alt="">
            </div>
            <div class="bg_gray"></div>
            <div class="facil-rule">
                <div class="row_1">
                    <div class="tit-bold"> <span class="pink-wid"></span> 领取规则</div>
                    <div @click="openMore()">查看更多 <img src="../../../assets/mall/img/facial/more.png" align="top" alt=""></div>
                </div>
                <div v-html="details.sendRules" ></div>
            </div>
            <div class="bg_gray"></div>
            <!--富文本商品详情-->
            <div class="p-msg tit-bold" > <span class="pink-wid"></span> 商品详情</div>
            <div class="rich-text" id="facial" v-html="details.info">

            </div>
            <div class="now-bagin">
                <div class="get-now-m" @click="nowGet()">立即领取</div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { XHeader} from 'vux'
import * as utils from '../../../utils'
import * as apiHttp from '../../../api/index'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'index',
    components:{
      XHeader,
      swiper, 
      swiperSlide
    },
    data () {
      return{
          id:3146,
          details:'',
          count:1,
          isShowQrcode:false,
          qrcodeInfo:'',
          showToast:false,
          mask:false,
          qrcode:'',
          info: this.$store.state.user.userInfo,
       }
    },
    mounted(){
        this.facialDetail()
    },
    methods:{
       nowGet(){
         apiHttp.facialInterim(this.id, this.count, this.details.pid).then(response => {
          if (response.code === 0) {
            this.$router.push({
              name: 'mallFacialOrder',
              query: {
                data: response.data,
                isFacial:true
              }
            })
          }
        })
       },
       reduce(){
           if(this.count>1){
                this.count--
           }
       },
       add(){
           this.count++
       },
       openMore(){
         this.$router.push({
            name: 'mallFacialRule',
            query: {
              id: this.details.id
            }
        })
       },
       handleQrcode () {
           this.mask = true
           this.qrcode = this.link + '/mall/qrcode/mgoods?goodsId=' + this.id + '&uid=' + this.info.uid
        /*apiHttp.underGoodsmQrcodeCon(this.id).then(res => {
            if (res.code === 0) {
            this.isShowQrcode = true
            this.qrcodeInfo = res.data;
            
            
            }
        })*/
       },
       shareFri (type) {
            this.showToast = false
            let way = type === 1 ? 'session' : 'timeline'
            let format = 'share' + new Date().getTime() + '.jpg'
            api.download({
                url: this.link + '/mall/qrcode/mgoods?goodsId=' + this.id + '&uid=' + this.info.uid,
                savePath: 'fs://' + format,
                encode: false,
                report: false,
                cache: false,
                allowResume: true
            }, function (ret, err) {
                
                let wx = api.require('wx')
                wx.shareImage({
                    scene: way,
                    contentUrl: 'fs://' + format
                }, function (ret, err) {
                   // that.$http.post('/amoy/task/collection', {}, false, true).then()
                })
          })
        },
       facialDetail(){
         apiHttp.goodsDetail(this.id).then(res => {
           this.details = res.data.detail;
         })
       }
     }
  }
</script>
<style scoped>
    .p-detail{
        width:93vw;
        padding:3vw;
    }
    .setting{
        font-size:4vw;
    }
    .setting .save{
        color:rgb(101,101,101)
    }
    .setting .list{
        margin-top:46px;
    }
    .item-box>div{
        margin-bottom:10px;
    }
    .item-box>.title{
        font-size:4vw;
        font-weight:bold;
        margin-top:-10px;
        color:rgb(51,51,51)
    }
    .item-box>.title>img{
        width:18px;
        height:18px;
        border-radius:3px;
    }
    .item-box>.row_1{
        font-size:4vw;
        font-weight:bold;
        color:rgb(11,21,41);
    }
    .item-box>.row_2{
       display:flex;
       justify-content: space-between;
       align-items: center;
    }
    .item-box>.row_2>div:first-child{
        font-size:5vw;
        color:rgb(254,88,71)
    }
    .item-box>.row_3{
        display:flex;
        justify-content: space-between;
        align-items: center
    }
    .item-box>.row_3 img{
        width:22px;
        height:22px;
    }
    .item-box>.row_3 input{
        width:12vw;
        height:7vw;
        text-align: center;
        border:0;
        outline:none;
        background:rgb(225,225,225);
        border-radius:15px;
    }
    .row-flex{
        width:94vw;
        display:flex;
        justify-content: space-between;
        align-items: center
    }
    .bg_gray{
        width:100vw;
        height:10px;
        background:rgb(240,240,240);
        margin-left:-3vw;
        margin-bottom:15px;
    }
    .rich-text{
        width:96vw;
        margin:0 auto;
        text-align: center;
        margin-bottom:50px;
    }
    .now-bagin{
        width:100vw;
        height:50px;
        position:absolute;
        bottom:0;
        left:0;
        background:white;
        box-shadow: 1px 1px 1px 1px rgb(235,235,235)
    }
    .get-now-m{
        border:0px;
        width:65vw ;
        margin:0 auto;
        height:40px;
        border-radius:25px;
        text-align: center;
        margin-top:5px;
        line-height: 40px;
        color:white;
        background:linear-gradient(to right,rgb(248,122,110),rgb(246,62,54)) !important;
    }
    .facial-img>img{
        width:100vw;
        height:auto;
    }
    .facil-rule>.row_1{
        display:flex;
        justify-content: space-between;
        align-items: center
    }
    .facil-rule>div:last-child{
        color:rgb(11,21,41);
        margin-top:15px;
        margin-bottom:15px;
    }
    .facil-rule>.row_1 img{ 
        width:22px;
        height:22px;
    }
    .setting .pink-wid{
        display:inline-block;
        width:5px;
        height:18px;
        background:rgb(203,25,112);
        border-radius:5px;
    }
    .setting .tit-bold{
        font-weight:bold
    }
    .rich-text img{
        margin-top:-5px !important;
    }
    .mask-facial{
        position: fixed;
        width:100vw;
        height:100vh;
        background:rgb(0,0,0,0.7);
        top:0;
        left:0;
        z-index:1000
    }
    .mask-facial>.img_1{
        border:3px solid white;
        width:90vw;
        height:auto;
        margin-top:15vw;
        margin-left:5vw;
    }
    .mask-facial>.img_2{
        width:8vw;
        height:8vw;
        margin-left:46vw
    }
    
</style>
<style  lang="less">
    .share_to{
    background: #fff;
    position: relative;
    width: 100%;
    .classBox{
      border-top: 1px solid #f9f6f6;
      z-index: 100000;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
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
  }
</style>


