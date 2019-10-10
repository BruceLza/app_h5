<template>
  <div id="select">
    <!--    <script src="./qrcode.min.js"></script>-->
    <!--弹出层-->
    <div v-if="isShow" @click.stop="popBox" id="pop-box">
      <div class="pop-item">
        <img id="qr-img" :src="data.pic" alt="我的二维码">


      </div>
    </div>


    <!--banner-->
    <img class="banner" src="../../assets/img/choniceness/bj.png" alt="">
    <!--收益-->
    <div class="earnings">
      <p><span>预估拉新收益(元): <span>{{data.prospect || 0.00}}</span></span></p>
      <p><span>可提现拉新收益(元): <span>{{data.laxin_balance || 0.00}}</span></span>
        <button
          @click="jumpTo('/withdraw?WithdrawalType=PullTheNew&prospect='+data.prospect+'&laxin='+data.laxin_balance)">提现
        </button>
      </p>
    </div>
    <!--分享-->
    <div class="share">
      <p class="share-tit"><span class="share-sp"></span>赚钱攻略：分享好礼给亲友</p>
      <div class="share-list">
        <div class="item" @click="sharePnQ('qq')">
          <div class="imgs">
            <img src="../../assets/img/choniceness/qq.png" alt="qq">
          </div>
          <p>分享QQ好友</p>
        </div>
        <div class="item" @click="sharePnM('1')">
          <div class="imgs">
            <img src="../../assets/img/choniceness/weixin.png" alt="weixin">
          </div>
          <p>分享微信好友</p>
        </div>
        <div class="item" @click="sharePnM('2')">
          <div class="imgs">
            <img src="../../assets/img/choniceness/pengyouquan.png" alt="pengyouquan">
          </div>
          <p>分享朋友圈</p>
        </div>
        <div class="item" @click="shareMicro('分享微博')">
          <div class="imgs">
            <img src="../../assets/img/choniceness/weibo.png" alt="weibo">
          </div>
          <p>分享微博</p>
        </div>
        <div class="item" @click="shareCopylink">
          <div class="imgs">
            <img src="../../assets/img/choniceness/lianjie.png" alt="链接">
          </div>
          <p>复制链接</p>
        </div>
        <div class="item" @click="shareScanning('面对面扫码')">
          <div class="imgs">
            <img src="../../assets/img/choniceness/QR.png" alt="saoma">
          </div>
          <p>面对面扫码</p>
        </div>
      </div>
    </div>

    <!---->
    <p class="award">
      您本月成功邀请{{data.laxin_sum || 0}}人，获得{{data.award || 0}}元奖励
    </p>
    <div class="btn-tow">
      <button @click="jumpTo('/informationDetailed')">邀请明细</button>
      <button @click="jumpTo('/myteam')">我的团队</button>
    </div>

    <!--活动规则-->

    <div class="rule">
      <p class="rule-tit"><span></span>活动要求</p>
      <ul class="rule-ul" style="padding-bottom:0.05rem;margin-bottom:0.2rem;">
        <li v-if="isRuleMsg" v-html="ruleMsg"></li>
        <li v-else="isRuleMsg"> 暂无活动！</li>
      </ul>
    </div>


  </div>
</template>

<script>
  import {Toast, Loading} from 'vux';

  export default {
    name: 'selects',
    components: {
      Toast,
      Loading
    },
    data() {
      return {
        isShare: false,
        isShow: false,//弹出弹窗
        data: {},
        shareLink: '',
        ruleMsg: '',
        isRuleMsg: true,
        QrImg: '',
        tit: '本得精选',
        miaoshu: '本得精选',
        picture: ''
      }
    },
    mounted() {
      let _this = this;
      this.$http.post('/amoy/user/user-new', {}, true, true).then(res => {
        if (res.code === 0) {
          console.log("******************************************");
          console.log(res);
          _this.data = res.data;
          _this.ruleMsg = res.data.remark;
          _this.QrImg = res.data.pic;
          _this.shareLink = res.data.url;
          _this.picture = res.data.logo;
          _this.miaoshu = res.data.describe;
          _this.tit = res.data.title;
          _this.ruleMsg == null ? _this.isRuleMsg = false : _this.isRuleMsg = true;
        }
      });
    },
    methods: {

      /*QQ*/
      sharePnQ(type) {
        var _this = this;
        this.$vux.loading.show({text: 'Loading'});
        var qq = api.require('QQPlus');
        qq.installed(function (ret, err) {
          _this.$vux.loading.hide();
          if (ret.status) {
            qq.shareMood({
              summary: _this.miaoshu+' '+_this.shareLink,
              imgUrls: _this.picture,
            },function(ret,err){
              if (ret.status){
                _this.$vux.toast.text('分享成功！');
              } else {
                _this.$vux.toast.text(JSON.stringify(err));
              }
            });
          } else {
            _this.$vux.toast.text('请安装QQ客户端之后再试！');
          }
        });
      },

      /*微信*/
      sharePnM(type) {
        this.$vux.loading.show({text: 'Loading'});
        var _this = this;
        /*好友分享*/
        if (type == '1') {
          _this.sharing('session', _this.tit, _this.miaoshu, _this.picture)
        }
        /*朋友圈*/
        if (type == '2') {
          _this.sharing('timeline', _this.tit, _this.miaoshu, _this.picture)
        }

      },

      /*微信分享函数*/
      sharing(type, tit, miaoshu, picture) {
        this.$vux.loading.hide()
        // alert(type);
        var _this = this;
        var wx = api.require('wx');
        wx.isInstalled(function (ret, err) {
          if (ret.installed) {
            wx.shareWebpage({
              scene: type,
              title: tit,
              description: miaoshu,
              thumb: picture,//widget://a.jpg
              contentUrl: _this.shareLink
            }, function (ret, err) {
              if (ret.status) {
                // _this.$vux.toast.text('分享成功！');//微信bug取消分享返回的也是true
              } else {
                switch (err.code) {
                  case -1:
                    _this.$vux.toast.text('未知错误！');
                    break;
                  case 1:
                    _this.$vux.toast.text('apiKey非法！');
                    break;
                  case 2:
                    _this.$vux.toast.text('用户取消分享！');
                    break;
                  case 3 || 7:
                    _this.$vux.toast.text('分享失败！');
                    break;
                  case 4:
                    _this.$vux.toast.text('授权拒绝！');
                    break;
                  case 5:
                    _this.$vux.toast.text('微信服务器返回的不支持错误！');
                    break;
                }
              }
            });
          } else {
            _this.$vux.toast.text('当前设备未安装微信客户端！');
          }
        });

      },

      /*微博*/
      shareMicro(type) {
        let _this = this;
        _this.$vux.toast.text('审核中，敬请期待！');
        return;
        this.$vux.loading.show({text: 'Loading'});
        var weiboPlus = api.require('weiboPlus');
        weiboPlus.isInstalled(
          function(ret) {
            if (ret.status) {
              weiboPlus.shareWebPage({
                title: _this.tit,//'这里是微博分享测试的内容',
                description: _this.miaoshu,
                thumb: _this.picture,
                contentUrl: _this.shareLink,
              }, function (ret, err) {
                _this.$vux.loading.hide();
                if (ret.status) {
                  _this.$vux.toast.text('分享成功！');
                } else {
                  _this.$vux.toast.text('分享失败~');
                }
              });
            } else {
              _this.$vux.loading.hide();
              _this.$vux.toast.text('未安装新浪微博客户端');
            }
          }
        );
      },

      /*复制链接*/
      shareCopylink() {
        var _this = this;
        var clipBoard = api.require('clipBoard');
        clipBoard.set({
          value: this.shareLink
        }, function (ret, err) {
          if (ret) {
            _this.$vux.toast.text('复制成功！');
          } else {
            _this.$vux.toast.text('复制失败！');
          }
        });
      },

      /*二维码弹出*/
      shareScanning() {
        let _this = this;
        _this.isShow = true;
      },
      /*二维码消失*/
      popBox() {
        this.isShow = false;
      },
    }
  }

</script>

<style scoped lang="less">
  /*#select {*/

  /*}*/

  /*弹出二维码*/


  #pop-box {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .pop-item {
      z-index: 9999;
      width: 3rem;
      height: 3rem;
      padding: 10px;
      background-color: white;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        display: block;
        width: 100%;
        height: 100%;
        /*border: 1px solid red;*/
      }


    }

  }

  .banner {
    display: block;
    width: 100%;
    height: 4.24rem;
  }

  .earnings {
    width: 6.9rem;
    height: 2.16rem;
    background-color: white;
    margin: 0 auto 0;
    transform: translateY(-0.3rem);
    box-shadow: 0px 3px 10px 1px rgba(218, 218, 218, 0.2);
    border-radius: 5px;
    z-index: 999;

    p:nth-child(1) {
      border-bottom: 1px solid rgba(238, 238, 238, 1);
    }

    p {
      box-sizing: border-box;
      padding: 0 0.3rem;
      font-weight: 400;
      color: #333333;
      height: 50%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;

      span {
        width: 100%;
        font-size: 0.28rem;
        font-family: PingFang-SC-Regular;

        span {
          font-size: 0.4rem;
          color: #FF6700;
        }
      }

      button {
        width: 1.28rem;
        height: 0.48rem;
        line-height: 0.48rem;
        background: linear-gradient(60deg, rgba(255, 112, 0, 1), rgba(255, 171, 0, 1));
        box-shadow: 0px 0px 3px 0px rgba(202, 202, 202, 1);
        border-radius: 12px;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }


    }
  }

  .share {
    width: 6.9rem;
    background: rgba(255, 255, 255, 1);
    margin: 0 auto;
    /*padding: 0 0.24rem;*/

    .share-tit {
      height: 0.68rem;
      line-height: 0.68rem;
      font-size: 0.28rem;
      padding-left: 0.3rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      .share-sp {
        display: inline-block;
        width: 0.06rem;
        height: 0.32rem;
        background: linear-gradient(90deg, rgba(255, 97, 0, 1), rgba(255, 187, 0, 1));
        margin-right: 0.22rem;
        vertical-align: sub;
      }
    }

    .share-list {
      /*display: grid;*/
      /*grid-template-columns: 33.3% 33.3% 33.3%;*/
      /*grid-template-rows: 2.1rem 2.1rem;*/
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      padding:0 1.5%;
      box-sizing: border-box;

      .item {
        width: 1.6rem;
        height: 2.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border:none !important;

        .imgs {

          width: 1.06rem;
          height: 1.06rem;
          overflow: hidden;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;

          img {
            display: block;
            width: 24px;
            margin: 0 auto;
          }
        }


        p {
          text-align: center;
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }

      }
    }
  }

  .award {
    margin: 0.26rem auto 0;
    width: 100%;
    height: 0.28rem;
    text-align: center;
    font-size: 0.28rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .btn-tow {
    width: 100%;
    height: 1.74rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;

    button {
      width: 2.6rem;
      height: 0.72rem;
      line-height: 0.72rem;
      background: rgba(245, 198, 21, 1);
      box-shadow: 0px 2px 3px 0px rgba(202, 202, 202, 1);
      border-radius: 17px;
      font-size: 0.32rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }

  .rule {
    width: 6.9rem;
    /*height:2.34rem;*/
    margin: 0 auto;
    background-color: white;

    .rule-tit {
      padding: 0 0.3rem;
      height: 0.68rem;
      line-height: 0.68rem;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      span {
        margin-right: 0.3rem;
        display: inline-block;
        width: 3px;
        height: 0.28rem;
        line-height: 0.28rem;
        vertical-align: sub;
        background: linear-gradient(90deg, rgba(255, 97, 0, 1), rgba(255, 187, 0, 1));
      }
    }

    .rule-ul {
      padding: 0 0.3rem;

      li {
        margin: 0.2rem 0.5rem 0.2rem 0.5rem;
        /*list-style-type: square;*/
        list-style-type: none;
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }


</style>
