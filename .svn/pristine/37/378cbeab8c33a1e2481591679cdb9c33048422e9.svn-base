<template>
  <div class="newFree">
    <div class="freeContent">
      <img src="../../assets/img/free/newFree.png" alt>
      <div class="cont">
        <div class="orderPath">
          <img src="../../assets/img/free/orderProcess.png" class="title" alt>
          <img src="../../assets/img/free/step.png" alt>
        </div>
        <div class="mustSeize">
          <div class="title">
            <img src="../../assets/img/free/newfight.png" alt>
          </div>
          <div class="mustBox">
            <div class="mustList" v-for="(item,index) in list" :key="index">
              <div class="good">
                <div class="goodPic">
                  <img v-lazy="item.img" alt class="pic">
                </div>
                <div class="goodMsg">
                  <p class="name">{{item.title}}</p>
                  <div class="money">
                    <p>¥<span class="m1">{{item.price}}</span></p>
                    <p>补贴 ¥ {{item.free_money}}</p>
                  </div>
                  <div class="progress">
                    <x-progress :percent="item.mark" :show-cancel="false"></x-progress>
                  </div>
                  <div class="num">
                    剩余<span>{{item.number}}</span>单
                  </div>
                </div>
              </div>
              <div class="power">
                <div class="powerMsg">{{item.rec}}{{item.allow}}可领取</div>
                <div class="payMoney" @click="handDetail(item.active_id)">
                  <span>{{item.price - item.free_money }}</span>元立即抢
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rule">
          <div class="title">
            <img src="../../assets/img/free/freeRule.png" alt>
          </div>
          <div class="ruleBox" v-html="rule"></div>
        </div>
      </div>
    </div>
    <div class="invite">
      <div class="inviteBtn" @click="share">分享免单商品给好友</div>
    </div>
    <div class="v-transfer-dom">
      <x-dialog v-model="showPoster" class="poster">

        <img src="../../assets/img/free/close.png" class="closePoster" alt @click="close">
        <img :src="imgs" alt class="pic">
        <div class="posterFooter">
          <div class="share" @click="showShare">
            <img src alt>分享海报
          </div>
          <div class="downImg" @click="keepImgs">
            <img src alt>保存图片
          </div>
        </div>
      </x-dialog>
    </div>
    <div class="share_to" v-transfer-dom>
      <div class="weui-mask" @click="showToast = false" v-if="showToast"></div>
      <div class="classBox" v-if="showToast">
        <div>
          <img src="../../assets/img/home/goods/wechat.png" alt @click="shareFri(1)">
          <p>微信好友</p>
        </div>
        <div>
          <img src="../../assets/img/home/goods/friend_circle.png" alt @click="shareFri(2)">
          <p>朋友圈</p>
        </div>
        <div>
          <img src="../../assets/img/home/goods/qq.png" alt @click="shareQq()">
          <p>QQ</p>
        </div>
        <!--<div><img src="../../assets/img/auth/QQk.png" alt="" @click="shareQq()"><p>QQ空间</p></div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { XProgress,TransferDom,XDialog } from 'vux'
export default {
  components: {
    XProgress,
    XDialog 
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      showPoster: false,
      list: [],
      imgs: '',
      showToast: false,
      info: this.$store.state.user.userInfo,
      rule: ''
    }
  },
  methods: {
    freeGood (){
      this.$http.post('/amoy/home/freeorder', {}, true, true).then(res => {
        if(res.code == 0){
          let arr = res.data.data
          this.rule = res.info.rule
          for(let i = 0; i< arr.length; i++){
            let mark = (Number(arr[i].number) / Number(arr[i].num))*100
            arr[i]['mark'] = mark;
          }
          this.list = res.data.data
        }
      })
    },
    handDetail (id) {
      let that = this;
      this.$http.post('/amoy/home/freeget', {active_id: id}, true, true).then(res => {
         if(res.code == 0){
           let goodUrl = res.data.url
           if(res.data.type == 1){
              let aliBC = api.require('aliBC')
              aliBC.asyncInit({
              }, function (ret, err) {
                if (ret.status) {
                  aliBC.showLogin(function (ret, err) {
                    if (ret.status) {
                        aliBC.showPageByUrl({
                          url: goodUrl,
                          openType: 'native'
                        })
                    } else {
                      that.$vux.toast.text(err.message)
                    }
                  })
                }
              })
           }else if(res.data.type == 2){
              if (api.systemType === 'ios') {
                api.appInstalled({
                  appBundle: 'openApp.jdMobile://'
                }, function (ret, err) {
                  browser.open({
                    url: goodUrl,
                    titleBar: {
                      textColor: '#333',
                      bg: '#fff'
                    }
                  })
                  window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + goodUrl + '"}')
                })
              }else{
                let browser = api.require('webBrowser')
                  browser.open({
                    url: goodUrl,
                    titleBar: {
                      textColor: '#333',
                      bg: '#fff'
                    }
                  })
                  window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + goodUrl + '"}')
              }
           }else{
              let browser = api.require('webBrowser')
              browser.open({
                url: goodUrl,
                titleBar: {
                  textColor: '#333',
                  bg: '#fff'
                }
              })
           }
         }else{
           that.$vux.toast.text(res.msg)
         }
       })
      // this.$router.push({
      //   name: 'freeGood',
      //   query: {
      //     id: id
      //   }
      // })
    },
    bill(){
      this.$http.post('/amoy/user/invite', {}, true, true).then(res => {
        let item = res.data.img[0]
        this.imgs = this.link + '/amoy/user/invite?tpl=' + item + '&uid=' + this.info.uid + '&invite_code=' + this.info.invite_code
      })
    },
    close () {
      this.showPoster = false
    },
    shareFri (type) {
      let that = this
      this.showToast = false
      let way = type === 1 ? 'session' : 'timeline'
        that.$vux.loading.show({
          text: '加载中'
        })
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          that.$vux.loading.hide()
          let wx = api.require('wx')
          wx.shareImage({
            scene: way,
            contentUrl: 'fs://' + format
          }, function (ret, err) {
            that.$http.post('/amoy/task/collection', {}, false, true).then()
          })
        })
    },
    shareQq () {
      let that = this
      this.showToast = false
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs,
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
    },
    share (){
      this.showPoster = true
      console.log(this.$isCouponPass)
    },
    showShare (type) {
      this.showToast = true
    },
    keepImgs () {
      const that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      that.$vux.loading.show({
        text: '保存中...'
      })
      api.download({
        url: that.imgs,
        savePath: 'fs://' + format,
        report: true,
        cache: true,
        allowResume: true
      }, function (ret, err) {
        if (ret.state === 1) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function (ret, err) {
            if (ret && ret.status) {
              that.$vux.loading.hide()
              console.log('相册成功：' + JSON.stringify(ret))
              that.$vux.toast.text('保存成功')
            } else {
              console.log('相册失败：' + JSON.stringify(err))
            }
          })
          console.log('成功：' + JSON.stringify(ret))
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    },
  },
  mounted () {
    this.freeGood();
    this.bill()
  }
}
</script>

<style lang="less"  scoped>
.newFree {
  height: 100%;
  position: relative;
  .freeContent {
    height: calc(100% - 1.1rem);
    overflow: auto;
    display: flex;
    flex-direction: column;
    .cont {
      background: #db1316;
      .orderPath {
        text-align: center;
        .title {
          width: 5.8rem;
        }
      }
      .mustSeize {
        margin: 0.2rem 0.1rem;
        .title {
          text-align: center;
          img {
            width: 5.8rem;
          }
        }
        .mustList {
          margin: 0.2rem 0;
          height: 3.3rem;
          background: #fff;
          border-radius: 0.2rem;
          .good {
            padding: 0.25rem;
            box-sizing: border-box;
            overflow: hidden;
            .goodPic {
              width: 1.82rem;
              height: 1.82rem;
              border-radius: 0.1rem;
              float: left;
              margin-right: 0.2rem;
              .pic {
                width: 1.82rem;
                height: 1.82rem;
                border-radius: 5px;
              }
            }
            .goodMsg {
              float: left;
              height: 1.82rem;
              width: 4.3rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .name {
                font-size: 0.26rem;
                line-height: 0.33rem;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              .money {
                display: flex;
                justify-content: space-between;
                font-size: 0.28rem;
                color: #fe2514;
                p {
                  font-size: 0.26rem;
                  line-height: 0.4rem;
                  span {
                    font-size: 0.34rem;
                    line-height: 0.4rem;
                  }
                }
              }
              .num {
                font-size: 0.28rem;
                color: #747474;
                span {
                  color: #fe2514;
                }
              }
            }
          }
          .power {
            border-top: 1px solid #f4f4f4;
            height: 1rem;
            padding: 0 0.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.28rem;
            color: #747474;
            .powerMsg{
              width: 65%;
              line-height: 0.3rem;
            }
            .payMoney {
              height: 0.57rem;
              padding: 0 0.2rem;
              font-size: 0.26rem;
              background: linear-gradient(to right, #ff1919, #ff7500);
              border-radius: 0.28rem;
              line-height: 0.57rem;
              text-align: center;
              color: #fff;
            }
          }
        }
      }
      .rule {
        margin-top: 0.2rem;
        .title {
          text-align: center;
          img {
            width: 5.8rem;
          }
        }
        .ruleBox {
          margin: 0.2rem;
          padding: 0.2rem;
          border: 1px dashed #fff;
          border-radius: 0.2rem;
          font-size: 0.28rem;
          line-height: 0.45rem;
          color: #fff;
        }
      }
    }
  }
  .invite {
    height: 1.1rem;
    width: 100%;
    padding: 0.125rem 0.5rem;
    box-sizing: border-box;
    background: #f22b40;
    .inviteBtn {
      height: 0.85rem;
      background: #fff584;
      color: #d00015;
      font-weight: bold;
      font-size: 0.32rem;
      line-height: 0.85rem;
      border-radius: 0.425rem;
      text-align: center;
    }
  }
}

</style>
<style lang ='less'>
.progress .weui-progress__inner-bar {
  background-color: #fe2514;
}
.poster {
  .weui-dialog {
    background: none;
  }
  .closePoster {
    width: 0.55rem;
    position: absolute;
    right: 0;
    top: 0;
  }
  .pic {
    margin-top: 0.5rem;
    width: 220px;
  }
  .posterFooter {
    margin-top: 1.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .share {
      width: 2.82rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background: #fedf2d;
      color: #9a0c0b;
      font-size: 0.3rem;
      line-height: 0.8rem;
      text-align: center;
    }
    .downImg {
      width: 142px;
      height: 40px;
      border-radius: 20px;
      background: #fedf2d;
      color: #9a0c0b;
      font-size: 0.3rem;
      line-height: 40px;
      text-align: center;
    }
  }
}
.share_to {
  background: #fff;
  position: relative;
  width: 100%;
  .classBox {
    border-top: 1px solid #f9f6f6;
    z-index: 100000;
    position: fixed;
    bottom: 0;
    height: 2rem;
    width: 7.5rem;
    display: flex;
    background: #fff;
    border-radius: 0;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.9rem;
        height: 0.9rem;
      }
      p {
        margin-top: 0.2rem;
        color: #666;
        font-size: 0.26rem;
      }
    }
  }
}
</style>


