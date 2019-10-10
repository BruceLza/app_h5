<template>
  <div id="clockIn" class="clockIn" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="jumpTo('/home')"></i>
        <p class="title">早起打卡</p>
        <a class="detailBut" @click="jumpTo('/clockInDetail')">挑战明细</a>
      </div>
      <div class="contentBox">
        <p class="conTitle">早上准时打卡可瓜分金额(元)</p>
        <p class="conNumber">{{sum}}</p>
        <div class="personsBox">
          <div class="photonBox" v-if="avatar.length > 0">
            <div class="phoImg" v-for="(item,index) in avatar" :key="'phoImg'+index">
              <img :src="item" alt="">
            </div>
          </div>
          <div class="photoText">
            <i class="dot"></i>
            <i class="dot"></i>
            <i class="dot"></i>
            <span class="personsNumber">{{members}}</span>
            <p>人参与</p>
          </div>
        </div>
        <p class="regulation" @click="jumpTo('/regulation?startTime=' + startTime+'&endTime='+ endTime)">挑战规则 ></p>
        <div class="challenge" v-show="challengeShow" @click="isPayBox()">
          <p>我要挑战</p>
        </div>
        <div class="challenge" v-show="stateEndShow">
          <p class="countDown" v-show="staetEndTime">打卡倒计时 {{staetEndTime}}</p>
          <div class="pricImg" v-show="staetEndTime">
            <img src="../../assets/img/clockIn/jinbi.png" alt="">
            <div class="numberBox">
              <span class="number">{{manyNumber}}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="invitationBox">
          <div class="invitation" @click="isInvitation">
            <img class="mePhoto" src="../../assets/img/clockIn/txiang.png" alt="">
            <p class="invitationText">邀请<br>好友</p>
          </div>
        </div>
      </div>
    </div>
    <div class="succeedFailure">
      <div class="succeedBox">
        <img class="succeedImg" src="../../assets/img/clockIn/cgdren.png" alt="">
        <i class="threeIcon"></i>
        <div class="succeedText">
          <span class="succeed">成功</span>
          <span class="succeedNumber">{{success}}</span>
        </div>
      </div>
      <div class="failureBox">
        <img class="failureImg" src="../../assets/img/clockIn/sbdremn.png" alt="">
        <i class="threeIcon"></i>
        <div class="failureText">
          <span class="failure">失败</span>
          <span class="failureNumber">{{failed}}</span>
        </div>
      </div>
    </div>
    <div class="logbuchBox" v-if="last">
      <div class="logbucTitleBox">
        <span class="title">今日<br>战况</span>
      </div>
      <div class="despiteBox" v-show="true">
        <div class="despite despiteLeft" v-if="last.early.para">
          <div class="photoBox">
            <img class="icon" src="../../assets/img/clockIn/despite.png" alt="" v-show="false">
            <img class="photoImg" :src="last.early.avatar" alt="">
          </div>
          <div class="textBox textBoxLeft">早起之星</div>
          <p class="userText">{{last.early.nickname}}</p>
          <p class="desc">{{last.early.para}}打卡</p>
        </div>
        <div class="despite despiteLeft" v-else>
          <div class="photoBox">
            <img class="icon" src="../../assets/img/clockIn/despite.png" alt="" v-show="false">
            <img class="photoImg" src="../../../static/libs/img/touxiang.png" alt="">
          </div>
          <div class="textBox textBoxLeft">早起之星</div>
          <p class="userText">认真的雪</p>
          <p class="desc">{{startTime}}打卡</p>
        </div>
        <div class="despite" v-if="last.luck.para">
          <div class="photoBox">
            <img class="icon" src="../../assets/img/clockIn/despite.png" alt="" v-show="true">
            <img class="photoImg photoBoxOne" :src="last.luck.avatar" alt="">
          </div>
          <div class="textBox">幸运之星</div>
          <p class="userText">{{last.luck.nickname}}</p>
          <p class="desc descAction">{{last.luck.para}}元</p>
        </div>
        <div class="despite" v-else>
          <div class="photoBox">
            <img class="icon" src="../../assets/img/clockIn/despite.png" alt="" v-show="true">
            <img class="photoImg photoBoxOne" src="../../../static/libs/img/count_img.png" alt="">
          </div>
          <div class="textBox">幸运之星</div>
          <p class="userText">时-￥</p>
          <p class="desc descAction">201元</p>
        </div>
        <div class="despite despiteRight" v-if="last.series.para">
          <div class="photoBox">
            <img class="icon" src="../../assets/img/clockIn/despite.png" alt="" v-show="false">
            <img class="photoImg" :src="last.series.avatar" alt="">
          </div>
          <div class="textBox textBoxRight">毅力之星</div>
          <p class="userText">{{last.series.nickname}}</p>
          <p class="desc">{{last.series.para}}天</p>
        </div>
        <div class="despite despiteRight" v-else>
          <div class="photoBox">
            <img class="icon" src="../../assets/img/clockIn/despite.png" alt="" v-show="false">
            <img class="photoImg" src="../../assets/img/auth/logos.png" alt="">
          </div>
          <div class="textBox textBoxRight">毅力之星</div>
          <p class="userText">一起玩</p>
          <p class="desc">1天</p>
        </div>
      </div>
      <div class="bottomBox"></div>
    </div>
    <!-- 支付弹窗-->
    <div class="payPage" v-show="payBoxBollean">
      <div class="payNoBox" @click="isPayBox()"></div>
      <div class="payBox">
        <p class="title">
          参与早上{{startTime}}~{{endTime}}<br>
          早起分钱挑战
        </p>
        <div class="partBox">
          <div v-for="(item, index) of numbers" class="partItem" :class="{partItemActive:iscur == index}" @click="hanldeAlert(index,item[0])" :key="'part'+index">
            <p class="numberBox">
              <span class="number">{{item[0]}}</span>
              份
            </p>
            <p class="desc">{{item[1]}}</p>
          </div>
        </div>
        <p class="hint">提示：1份等于{{price}}元，购买分数越多，打卡成功后赚的越多</p>
        <div class="payTab">
          <p class="payTabTitle"><img src="../../assets/img/clockIn/zfu.png" alt="" class="payTitleIcon">支付方式</p>
          <div class="payTabItem" :class="{payTabItemNo:(index == 'credit' && !isHaveCredit) || (index == 'integral' && !isHaveIntegral),payTabItemCilck:isPay == index}" v-for="(item,index) of payList" @click="isPayTabItem(index)" :key="index">
            <img v-if="index == 'wxpay'" src="../../assets/img/clockIn/wx.png" alt="" class="payIcon">
            <img v-if="index == 'alipay'" src="../../assets/img/clockIn/zfubao.png" alt="" class="payIcon">
            <img v-if="index == 'credit'" src="../../assets/img/clockIn/yue.png" alt="" class="payIcon">
            <img v-if="index == 'integral'" src="../../assets/img/clockIn/jifbao.png" alt="" class="payIcon">
            <p class="payItemText">{{item.name}}<span v-if="index == 'credit'">({{credit}}元)</span><span v-if="index == 'integral'">({{integral}}元)</span></p>
            <i class="paySelectBut">
            </i>
          </div>
        </div>
        <div class="payButBox">
          <div class="noBut" @click="isPayBox()">取消</div>
          <div class="yesBut" @click="handBuy()">确定</div>
        </div>
      </div>
    </div>
    <!-- 打卡成功弹窗-->
    <div class="dapPage" v-show="earlyBollean">
      <div class="earlyYes">
        <img class="earlyImg" src="../../assets/img/clockIn/zaoqicg.png" alt="">
        <i class="hiddenBut" @click="hiddenEarly()"></i>
        <p class="time">每天早上{{startTime}}~{{endTime}}打卡</p>
        <p class="desc">
           恭喜您打卡成功啦~<br>
      瓜分金额可以在挑战明细里查看哦！<br>
          {{parseInt(endTime.split(":")[0]) + 2}}点前将发放早起奖金
        </p>
        <div class="shareBut" @click="shareGrade()">我要分享战绩</div>
      </div>
    </div>
    <!-- 打卡失败弹窗-->
    <div class="lateBox" v-show="false">
      <div class="late">

      </div>
    </div>
    <!-- 提醒弹窗-->
    <div class="remindBox" v-show="remindBollean">
      <div class="remind">
        <div class="remindText">
          <p class="title">提醒</p>
          <p class="content">确认要消费26个集分宝参与挑战？</p>
        </div>
        <div class="butBox">
          <div class="cancelBut">取消</div>
          <div class="confirmBut">确定</div>
        </div>
      </div>
    </div>
    <!-- 提示弹窗-->
    <div class="hintBox" v-show="hintBollean">
      <div class="hint">
        <p class="hintDesc">
          您的集分宝余额不足<br>
          请前往任务中心领取更多奖励
        </p>
        <div class="hintBton">任务中心>></div>
      </div>
    </div>
    <!-- 邀请好友-->
    <div class="inviteFriend" v-show="invitationBollean">
      <div class="inviteImgBox">
        <i class="shutImg" @click="isInvitation"></i>
        <!-- <img :src="imgUrlBase64" alt=""> -->
        <div class="inviteImgCode" ref="inviteImg" id="inviteImg">
          <img class="inviteImg" src="../../assets/img/clockIn/fxiangbjtu.png" alt="">
          <p class="conTitle">早上准时打卡可瓜分金额(元)</p>
          <p class="conNumber">{{sum}}</p>
          <div class="personsBox">
            <div class="photonBox" v-if="avatar">
              <div class="phoImg" v-for="(item,index) in avatar" :key="'phoImg'+index">
                <img :src="item" alt="">
              </div>
            </div>
            <div class="photoText">
              <i class="dot"></i>
              <i class="dot"></i>
              <i class="dot"></i>
              <span class="personsNumber">{{members}}</span>
              <p>人参与</p>
            </div>
          </div>
          <div class="meDetail">我已挑战{{count}}天，收入{{profit}}元</div>
          <div class="twoCode" id="twoCodeqrcode" v-html="codeHtml" ref="twoCodeqrcode"></div>
          <!-- <img class="twoCode" :src="codeImgUrl" alt=""> -->
        </div>
      </div>
      <div class="inviteTitle">
        <span></span>
        分享方式
        <span></span>
      </div>
      <div class="inviteButBox">
        <div class="item" @click="httpImg(1)">
          <img src="../../assets/img/clockIn/baoc.png" alt="">
          <p>保存图片</p>
        </div>
        <div class="item" @click="httpImg(2)">
          <img src="../../assets/img/clockIn/wxfx.png" alt="">
          <p>微信</p>
        </div>
        <div class="item" @click="httpImg(3)">
          <img src="../../assets/img/clockIn/pyqung.png" alt="">
          <p>朋友圈</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { qrcanvas } from 'qrcanvas'
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      sum: 0,
      numbers: '',
      members: 0,
      success: 0,
      failed: 0,
      last: '',
      invitationBollean: false,/* 邀请好友 */
      hintBollean: false,/* 余额不足 */
      remindBollean: false,/* 提醒 */
      earlyBollean: false,/* 打卡成功 */
      payBoxBollean: false,/* 支付弹窗 */
      challengeShow: false,/* 挑战按钮默认隐藏 */
      stateEndShow: false,/* 倒计时按钮默认隐藏 */
      iscur: 0,
      isPay: 'wxpay',/* 支付单选 */
      // partList: [{number: 1,desc:'小试牛刀'},{number: 2,desc:'出手不凡'},{number: 5,desc:'心狠手辣'},{number: 10,desc:'小试牛刀'}],
      partList: '',
      // payList: {wechat:{name:'微信支付'},alipay:{name:'支付宝支付'},credit:{name:'余额'}},
      payList: '',
      integral: 0.00,
      credit: 0.00,
      partNumber: '',/* 挑战的份数 */
      isHaveIntegral: false,/* 积分不够 */
      isHaveCredit: true,/* 余额不够 */
      payIsState: '',
      staetEndTime:'',
      startTime: '',
      endTime: '',
      avatar: [],
      imgUrl: '',/* 合成的邀请图 */
      imgUrlBase64: '',
      codeImgUrl: '',
      codeHtml: '',
      count: '',
      profit: '',
      canvas1: null,
      manyNumber: '',
      price: '', /* 每份的单价 */
      setIntervalObj: null
      // qrcodeUrl: '',
    }
  },
  mounted () {
    this.codeImgUrl = this.link + '/amoy/user/qrcode'
    this.getInfo()
  },
  methods: {
    // 获取数据
    getInfo () {
      var That = this
      if (this.setIntervalObj) {
        clearTimeout(That.setIntervalObj)
      }
      this.$http.post('/amoy/home/da-ka', {}, true).then(res => {
        if (res.code === 0) {
          That.$nextTick(function () {
            // 生成二维码
            That.canvas1 = qrcanvas({
              data: decodeURIComponent(data.qrcodeUrl),
              size: 50
            })
          })
          var data = res.data
          if (!data.sum) {
            this.sum = 0
          } else {
            this.sum = data.sum
          }
          console.log('/amoy/home/da-ka>res' + JSON.stringify(res))
          this.numbers = data.numbers
          this.partNumber = data.numbers[0][0]
          this.members = data.members
          this.manyNumber = data.money * data.price
          this.price = data.price
          if (!data.last.success) {
            this.success = 0
          } else {
            this.success = data.last.success
          }
          if (!data.last.failed) {
            this.failed = 0
          } else {
            this.failed = data.last.failed
          }
          // this.integral = data.credit1
          this.credit = data.credit
          if (data.credit == 0) {
            this.isHaveCredit = false
          }
          this.last = data.last
          if (this.last.early.para) {
            this.last.early.para = data.last.early.para.split(" ")[1]
          } else {
            this.last.early.para = data.last.early.para
          }
          this.payList = data.pay_type
          this.startTime = data.start_time
          this.endTime = data.end_time
          this.avatar = data.avatar
          // if (That.newDataYMS(data.start_time, data.end_time)) {
          if (That.checkNowBetweenTimeQuantum(data.startTime, data.endTime)) {
            // 打卡时间
            if (data.info) {
              // 已报名
              // 进行打卡
              if (data.info.status == 0) {
                this.$http.post('/amoy/home/dk-do', {id: data.info.id}, true).then(resdaka => {
                  if (resdaka.code === 0) {
                    That.earlyBollean = true
                    That.challengeShow = true
                    That.stateEndShow = false
                    return
                  }
                })
              } else {
                if (data.is_sign == 1) {
                  // 已报名
                  That.challengeShow = false
                  That.stateEndShow = true
                  That.endTimeNumber(data.startTime)
                } else if (data.is_sign == 0) {
                  // 未报名
                  That.challengeShow = true
                  That.stateEndShow = false
                }
              }
            } else {
              // 未报名
              if (data.is_sign == 1) {
                // 已报名
                That.challengeShow = false
                That.stateEndShow = true
                That.endTimeNumber(data.startTime)
              } else if (data.is_sign == 0) {
                // 未报名
                That.challengeShow = true
                That.stateEndShow = false
              }
            }
          } else {
            // 非打卡时间
            // 判断是否报名
            if (data.is_sign == 1) {
              // 已报名
              That.challengeShow = false
              That.stateEndShow = true
              That.endTimeNumber(data.startTime)
            } else if (data.is_sign == 0) {
              // 未报名
              That.challengeShow = true
              That.stateEndShow = false
            }
          }
          console.log(data.is_sign, 'data.is_sign')
        }
      })
      this.$http.post('/amoy/home/dk-detail', {page: 1}, true).then(resPage => {
        if(resPage.code == 0){
          this.count = resPage.data.count
          this.profit = resPage.data.profit
        }
      })
    },
    // 倒计时
    endTimeNumber (value) {
      var that = this
      that.setIntervalObj = setInterval(() => {
        that.TimeDown(value)
      }, 1000)
    },
    // 下载图片
    downImg () {
      const that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgUrl,
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
              console.log('相册成功：' + JSON.stringify(ret))
              that.$vux.toast.text('保存成功')
            } else {
              console.log('相册失败：' + JSON.stringify(err))
            }
          })
          console.log('成功：' + JSON.stringify(ret))
        } else {
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    },
    // 合成图片
    // created () {
    //     // let that = this;
    //     let canvas = this.$refs.inviteImg
    //     let that = this
    //     html2canvas(canvas, {scale: 2, logging: false, useCORS: true}).then(function (canvas) {
    //       let type = 'png'
    //       let imgData = canvas.toDataURL(type)
    //       // console.log(imgData)
    //       // 照片格式处理
    //       let _fixType = function (type) {
    //         type = type.toLowerCase().replace(/jpg/i, 'jpeg')
    //         let r = type.match(/png|jpeg|bmp|gif/)[0]
    //         return 'image/' + r
    //       }
    //       imgData = imgData.replace(_fixType(type), 'image/octet-stream')
    //       // console.log(imgData)
    //       that.imgUrlBase64 = imgData
    //       // that.saveFile(imgData, filename)
    //       // that.httpImg(imgData)
    //     })

    //     /* that.$nextTick(function () {
    //         html2canvas(that.$refs.inviteImg,{onrendered:function(canvas){},useCORS:true}).then(function(canvas) {
    //           that.imgUrl = canvas.toDataURL()
    //             // that.imgUrl =  URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
    //             // that.imgUrl =  URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
    //             that.$http.post('/amoy/home/dk-share', {
    //               img: that.imgUrl,
    //             }, true).then(resimgUrl => {
    //               if (resimgUrl.code === 0) {
    //                 that.imgUrl = resimgUrl.data
    //               }
    //             })
    //         });
    //    }) */
    // },
    saveFile (data, filename) {
      let bitmap = new plus.nativeObj.Bitmap()
      let _this = this
      bitmap.loadBase64Data(data, (success) => {
        bitmap.save('_doc/' + filename, {overwrite: true}, function () {
          // 保存到相册
          plus.gallery.save('_doc/' + filename, function () {
            _this.$vux.toast.show({type: 'success', text: '图片保存成功'})
          }, function () {
            _this.$vux.toast.show({type: 'cancel', text: '图片保存失败'})
          })
        }, function () {
          _this.$vux.toast.show({type: 'cancel', text: '图片保存失败'})
        })
      }, (e) => {
        _this.$vux.toast.show({type: 'cancel', text: '图片保存失败'})
      })
    },
    httpImg(types) {
      let canvas = this.$refs.inviteImg
      let that = this
      //合成图片
      html2canvas(canvas, {scale: 2, logging: false, useCORS: true}).then(function (canvas) {
        let type = 'png'
        let imgData = canvas.toDataURL(type)
        // console.log(imgData)
        // 照片格式处理
        let _fixType = function (type) {
          type = type.toLowerCase().replace(/jpg/i, 'jpeg')
          let r = type.match(/png|jpeg|bmp|gif/)[0]
          return 'image/' + r
        }
        imgData = imgData.replace(_fixType(type), 'image/octet-stream')
        // console.log(imgData)
        that.imgUrlBase64 = imgData
        that.$http.post('/amoy/home/dk-share', {
          img: that.imgUrlBase64,
        }, true).then(resimgUrl => {
          if (resimgUrl.code === 0) {
            that.imgUrl = resimgUrl.data
            if(types == 1) {
              that.downImg()
            } else if(types == 2){
              that.shareFri(1)
            } else if( types == 3) {
              that.shareFri(2)
            }
          }
        })
      })
    },
    // base64转blob
    base64ToBlob (code) {
      let parts = code.split(';base64,')
      let contentType = parts[0].split(':')[1]
      let raw = window.atob(parts[1])
      let rawLength = raw.length

      let uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], {type: contentType})
    },
    // 确定支付
    handBuy () {
      this.$http.post('/amoy/home/daka-pay', {
        number: this.partNumber,
        type: this.isPay
      }, true).then(res => {
        if (res.code === 0) {
          if (this.isPay === 'alipay') {
            this.plusReady(1, res.data.payOrder)
          } else if (this.isPay === 'wxpay') {
            this.plusReady(0, res.data.payOrder)
          } else if (this.isPay === 'credit') {
            // this.plusReady(2, res.data.payOrder)
            this.$router.push('/paySuccess?startTime=' + this.startTime+'&endTime='+ this.endTime)
          }
        }
      })
    },
    // 获取支付通道
    plusReady (index, data) {
      let that = this
      if (index === 1) {
        let aliPayPlus
        if (this.$aliPay === 1) {
          aliPayPlus = api.require('aliPayTradePlus')
        } else {
          aliPayPlus = api.require('aliPayPlus')
        }
        aliPayPlus.payOrder({
          orderInfo: data
        }, function (ret, err) {
          switch (ret.code) {
            case '9000':
              // that.$vux.toast.text('支付成功')
              that.$router.push('/paySuccess?startTime=' + that.startTime+'&endTime='+ that.endTime)
              break
            case '6001':
              that.$vux.toast.text('取消支付')
              break
            case '8000':
              that.$vux.toast.text('正在处理中')
              break
            default:
              that.$vux.toast.text('支付失败')
          }
        })
      } else if (index === 0) {
        let wxPay = api.require('wxPay')
        let info = {
          apiKey: data.appid,
          orderId: data.prepayid,
          mchId: data.partnerid,
          nonceStr: data.noncestr,
          timeStamp: data.timestamp,
          sign: data.sign
        }
        wxPay.payOrder(info, function (ret, err) {
          if (ret.status) {
            that.$router.push('/paySuccess?startTime=' + that.startTime+'&endTime='+ that.endTime)
          } else {
            console.log(JSON.stringify(err))
            if (err.code === -2) {
              that.$vux.toast.text('取消支付')
            } else {
              that.$vux.toast.text('支付失败')
            }
          }
        })
      } else if (index === 2) {
        alert('余额支付')
      }
    },
    // 分享到微信1 分享微信朋友圈2
    shareFri (type) {
      let that = this
      let way = type === 1 ? 'session' : 'timeline'
      that.$vux.loading.show({
        text: '加载中'
      })
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgUrl,
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
    // 检查当前时间是否在一个时间段中
    checkNowBetweenTimeQuantum (startTime, endTime) {
      startTime = startTime % 86400
      endTime = endTime % 86400
      var now = new Date().getTime() / 1000
      now = now % 86400
      console.log('startTime: ' + startTime)
      console.log('endTime: ' + endTime)
      console.log('now: ' + now)
      return now > startTime && now < endTime
    },
    // 根据今天的年月日获取到打卡时间点  需要输入打卡的时间8:00
    newDataYMS (time1, time2) {
      var date = new Date()
      var dateTime = date.getTime() /* 当前时间时间戳 */
      var seperator1 = "-"
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = "0" + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
      }
      var startDate = year + seperator1 + month + seperator1 + strDate +' '+ time1
      var startTime = new Date(startDate)
      startDate = startTime.getTime()
      var endDate = year + seperator1 + month + seperator1 + strDate +' '+ time2
      var endTime = new Date(endDate)
      endDate = endTime.getTime()
      if (dateTime > startDate && dateTime < endTime) {
        return true
      }
      return false
    },
    // 倒计时
    TimeDown (endDateStr) {
      var That = this
      // 结束时间
      var endDate = new Date(endDateStr * 1000)
      // 当前时间
      var nowDate = new Date()
      // 相差的总秒数
      var totalSeconds = parseInt((endDate - nowDate) / 1000)
      // 天数
      var days = Math.floor(totalSeconds / (60 * 60 * 24))
      // 取模（余数）
      var modulo = totalSeconds % (60 * 60 * 24)
      // 小时数
      var hours = Math.floor(modulo / (60 * 60))
      modulo = modulo % (60 * 60)
      // 分钟
      var minutes = Math.floor(modulo / 60)
      // 秒
      var seconds = modulo % 60
//         if(hours == 0 && minutes == 0 && seconds == 0) {
//           That.stateEndShow = false
//           clearTimeout(That.setIntervalObj)
//           setTimeout(() =>{
//             That.challengeShow = true
//             That.getInfo()
//           },1000)
//           return
//         }
      if (seconds < 0) {
        That.stateEndShow = false
        clearTimeout(That.setIntervalObj)
        setTimeout(() => {
          That.challengeShow = true
          That.getInfo()
        }, 1000)
        return
      }
      // 输出到页面
      this.staetEndTime = hours + "时" + minutes + "分" + seconds + "秒";
      console.log('读秒：' + this.staetEndTime)
    },
    // 邀请好友弹窗
    isInvitation () {
      this.invitationBollean = !this.invitationBollean
      document.getElementById('twoCodeqrcode').appendChild(this.canvas1);
      // if (this.invitationBollean) {
      //   this.created()
      // }
    },
    // 我要分享战绩
    shareGrade () {
      this.earlyBollean = false
      this.isInvitation()
    },
    // 单选份数
    hanldeAlert (res, number) {
      this.iscur = res
      this.partNumber = number
    },
    // 选择支付方式
    isPayTabItem (res) {
      if (res == 'wxpay') {
        this.isPay = res
      } if (res == 'alipay') {
        this.isPay = res
      } if (res == 'credit') {
        if (!this.isHaveCredit) {
          this.$vux.toast.text('余额不足')
          return
        }
        this.isPay = res
      } if (res == 'integral') {
        if (!this.isHaveIntegral) {
          this.$vux.toast.text('积分不足')
          return
        }
        this.isPay = res
      }
    },
    // 关闭打开支付弹窗
    isPayBox () {
      this.payBoxBollean = !this.payBoxBollean
    },
    // 关闭打卡成功界面
    hiddenEarly () {
      this.earlyBollean = false
    }
  },
  beforeDestroy () {
    var That = this
    if (this.setIntervalObj) {
      clearTimeout(That.setIntervalObj)
    }
  }
}
</script>
<style scoped lang="less">
  .clockIn{
    font-family:PingFang-SC-Regular;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    .headerConBox{
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 8.5rem;
      padding-top: 0.35rem;
      box-sizing: border-box;
      background: url(../../assets/img/clockIn/clockInbj.png) center center no-repeat;
      background-size: 7.5rem 8.5rem;
      .header{
        width: 100%;
        height: 0.4rem;
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        .icon-back{
          font-size: 0.36rem;
          font-weight: bold;
          margin-right: 2.63rem;
        }
        .title{
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.4rem;
        }
        .detailBut{
          font-size: 0.28rem;
          font-weight: 500;
          line-height: 0.4rem;
          margin-left: 1.6rem;
        }
      }
      .contentBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .conTitle{
          width:100%;
          height: 0.3rem;
          margin-top: 0.65rem;
          font-size: 0.28rem;
          font-weight: 500;
          text-align: center;
          line-height: 0.3rem;
        }
        .conNumber{
          width: 100%;
          font-size: 0.7rem;
          font-weight: bold;
          height: 0.7rem;
          line-height: 0.7rem;
          text-align: center;
          margin-top: 0.20rem;
          margin-bottom: 0.25rem;
        }
        .personsBox{
          position: relative;
          overflow: hidden;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .photonBox{
            display: flex;
            margin-right: 0.38rem;
            justify-content: center;
            align-items: center;
            .phoImg{
              overflow: hidden;
              width: 0.54rem;
              height: 0.54rem;
              margin-left: -0.1rem;
              box-sizing: border-box;
              border: 2px solid #fff;
              border-radius: 50%;
              font-size: 0;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .photoText{
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.26rem;
            font-weight: 500;
            line-height: 0.3rem;
            height: 0.3rem;
            .dot{
              width: 0.08rem;
              height: 0.08rem;
              background: #fff;
              margin-right: 0.08rem;
              border-radius: 50%;
            }
            .personsNumber{
              color: #FFD647;
            }
          }
        }
        .regulation{
          width: 100%;
          height: 0.3rem;
          margin-top: 0.23rem;
          margin-bottom: 0.52rem;
          font-size: 0.24rem;
          font-weight: 500;
          line-height: 0.3rem;
          text-align: center;
        }
        .challenge{
          position: relative;
          height: 0.8rem;
          border-radius: 0.40rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(270deg,rgba(255,88,71,1),rgba(255,145,120,1));
          box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.2);
          p {
            margin-left: 1.26rem;
            margin-right: 1.26rem;
            font-size: 0.28rem;
            line-height: 0.3rem;
            height: 0.3rem;
          }
          .countDown{
            margin-left: 0.55rem;
            margin-right: 1.15rem;
          }
          .pricImg{
            position: absolute;
            width: 1rem;
            height: 1rem;
            top: -0.1rem;
            right: -0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              position: absolute;
              width: 100%;
            }
            .numberBox {
              position: absolute;
              width: 100%;
              height: 100%;
              margin-left: 0.05rem;
              font-family: PingFang-SC-Bold;
              color: #FF8511;
              display: flex;
              justify-content: center;
              align-items: center;
              span {
                height: 0.54rem;
                font-size: 0.16rem;
                line-height: 0.74rem;
              }
              .number{
                font-size: 0.54rem;
                line-height: 0.54rem;
                font-weight: bold;
              }
            }
          }
        }
        .invitationBox{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 0.58rem;
          .invitation{
            position: relative;
            width: 1.35rem;
            height: 0.52rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-top-left-radius: 0.26rem;
            border-bottom-left-radius: 0.26rem;
            background: linear-gradient(90deg,rgba(255,230,137,1),rgba(255,90,73,1));
            .mePhoto{
              width: 0.46rem;
              height: 0.46rem;
              margin-left: 0.04rem;
              margin-right: 0.08rem;
            }
            .invitationText{
              font-size: 0.2rem;
              font-weight: 500;
              line-height: 0.22rem;
            }
          }
        }
      }
    }
    .succeedFailure{
      position: relative;
      margin-top: -0.5rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      .succeedBox{
        position: relative;
        width: 1.5rem;
        margin-right: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .succeedImg{
          width: 0.83rem;
        }
        .threeIcon{
          width: 0;
          height: 0;
          margin-top: 0.14rem;
          margin-bottom: 0.14rem;
          border-left: 0.08rem solid rgba(0, 0, 0, 0);
          border-right: 0.08rem solid rgba(0, 0, 0, 0);
          border-bottom: 0.12rem solid #CF2661;
        }
        .succeedText{
          font-size: 0.24rem;
          height: 0.24rem;
          line-height: 0.24rem;
          color: #333;
          .succeed{
            margin-right: 0.15rem;
            font-weight: bold;
          }
          .succeedNumber{
            color: #FF5847;
            font-weight: 500;
          }
        }
      }
      .failureBox{
        position: relative;
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .failureImg{
          width: 0.83rem;
        }
        .threeIcon{
          width: 0;
          height: 0;
          margin-top: 0.14rem;
          margin-bottom: 0.14rem;
          border-left: 0.08rem solid rgba(0, 0, 0, 0);
          border-right: 0.08rem solid rgba(0, 0, 0, 0);
          border-bottom: 0.12rem solid #CF2661;
        }
        .failureText{
          font-size: 0.24rem;
          height: 0.24rem;
          line-height: 0.24rem;
          .failure{
            margin-right: 0.15rem;
            font-weight: bold;
          }
          .failureNumber{
            color: #35BEA0;
            font-weight: 500;
          }
        }
      }
    }
    .logbuchBox{
      position: relative;
      overflow: hidden;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .logbucTitleBox{
        width: 100%;
        height: 0.61rem;
        margin-top: 0.05rem;
        display: flex;
        align-items: center;
        background: url(../../assets/img/clockIn/logbuc.png) left center no-repeat;
        background-size: 1.13rem 0.61rem;
        .title{
          display: block;
          width: 0.6rem;
          font-size: 0.22rem;
          line-height: 0.24rem;
          font-weight: 500;
          text-align: left;
          margin-left: 0.24rem;
        }
      }
      .despiteBox{
        position: relative;
        width: 100%;
        height: 3.16rem;
        background: url(../../assets/img/clockIn/shan.png) center bottom no-repeat;
        background-size: 7.5rem 2.22rem;
        display: flex;
        justify-content: center;
        .despite{
          position: relative;
          width: 1.5rem;
          margin-top: -0.95rem;
          font-size: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .photoBox{
            position: relative;
            .icon{
              position: absolute;
              top: -0.16rem;
              left: -0.18rem;
              width: 0.42rem;
            }
            .photoImg{
              width: 0.98rem;
              height: 0.98rem;
              border: 0.05rem solid rgba(0, 0, 0, 0);
              border-radius: 50%;
            }
            .photoBoxOne{
              border-color: #FFA323;
            }
          }
          .textBox{
            width: 1.24rem;
            height: 0.22rem;
            padding: 0.04rem 0;
            font-size: 0.22rem;
            line-height: 0.22rem;
            font-weight: 500;
            margin-top: -0.18rem;
            text-align: center;
            border-radius: 0.15rem;
            background: linear-gradient(-90deg,rgba(255,70,27,1),rgba(255,163,35,1));
            z-index: 2;
          }
          .textBoxLeft{
            background: linear-gradient(-90deg,rgba(55,126,253,1),rgba(29,215,255,1));
          }
          .textBoxRight{
            background: linear-gradient(-90deg,rgba(126,52,255,1),rgba(206,66,255,1));
          }
          .userText{
            font-size: 0.22rem;
            font-weight: 500;
            line-height: 0.3rem;
            height: 0.3rem;
            margin-top: 0.17rem;
            margin-bottom: 0.08rem;
            color: #333;
          }
          .desc{
            font-size: 0.24rem;
            font-weight: 500;
            line-height: 0.3rem;
            color: #FF5847;
          }
          .descAction{
            font-size: 0.28rem;
            font-weight: bold;
            line-height: 0.3rem;
          }
        }
        .despiteLeft{
          margin-top: -0.45rem;
          margin-right: 1rem;
        }
        .despiteRight{
          margin-top: -0.45rem;
          margin-left: 1rem;
        }
      }
      .bottomBox{
        width: 100%;
        flex: 1;
        background: #fff;
      }
    }
    .payPage{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      font-family:PingFang-SC-Medium;
      background: rgba(0, 0, 0, 0.7);
      z-index: 3;
      color: #333;
      display: flex;
      flex-direction: column;
      .payNoBox{
        position: relative;
        flex: 1;
        width: 100%;
      }
      .payBox{
        position: relative;
        width: 100%;
        background: #fff;
        bottom: 0;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
        .title{
          width:100%;
          margin-top: 0.32rem;
          font-size: 0.28rem;
          font-weight: 500;
          line-height: 0.42rem;
          text-align: center;
        }
        .partBox{
          position: relative;
          overflow: hidden;
          margin-top: 0.2rem;
          margin-bottom: 0.1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          .partItem{
            width: 3.2rem;
            height: 1.4rem;
            margin: 0.1rem 0.1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 0.15rem;
            box-sizing: border-box;
            border: 0.01rem solid rgba(238, 238, 238, 0.1);
            box-shadow: 0 0.01rem 0.04rem 0 rgba(0, 0, 0, 0.1);
            text-align: center;
            .numberBox{
              font-weight: bold;
              font-size: 0.28rem;
              line-height: 0.28rem;
              .number{
                font-size: 0.48rem;
                line-height: 0.48rem;
              }
            }
            .desc{
              margin-top: 0.24rem;
              font-size: 0.28rem;
              line-height: 0.28rem;
            }
          }
          .partItemActive{
            border-width: 0;
            background:linear-gradient(-36deg,rgba(255,88,71,1),rgba(255,145,120,1));
            color: #fff;
          }
        }
        .hint{
          width: 100%;
          box-sizing: border-box;
          font-size: 0.22rem;
          font-weight: 500;
          line-height: 0.24rem;
          height: 0.24rem;
          margin-bottom: 0.3rem;
          color: #FF5847;
          padding-left: 0.5rem;
        }
        .payTab{
          position: relative;
          overflow: hidden;
          width: 7.1rem;
          display: flex;
          font-weight: 500;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: auto;
          border-top: 0.01rem solid #EEEEEE;
          .payTabTitle{
            width: 6.6rem;
            margin-top: 0.35rem;
            margin-bottom: 0.18rem;
            font-size: 0.28rem;
            line-height: 0.28rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .payTitleIcon{
              width: 0.22rem;
              margin-right: 0.05rem;
              margin-left: 0.04rem;
            }
          }
          .payTabItem{
            width: 6.6rem;
            height: 0.7rem;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            justify-content: center;
            align-items: center;
            .payIcon{
              width: 0.4rem;
              margin-left: 0.03rem;
              margin-right: 0.16rem;
            }
            .payItemText{
              width: 5.48rem;
              font-size: 0.28rem;
              line-height: 0.28rem;
              span {
                color: #666666;
                font-size: 0.26rem;
                line-height: 0.26rem;
                margin-left: 0.07rem;
              }
            }
            .paySelectBut{
              width: 0.28rem;
              height: 0.28rem;
              /* img {
                width: 100%;
              } */
              background: url(../../assets/img/clockIn/tuoyuan.png) center center no-repeat;
              background-size: 0.28rem 0.28rem;
            }
          }
          .payTabItemNo{
            color: #BEBEBE;
            .payItemText{
              width: 5.76rem;
              span {
                color: #BEBEBE;
              }
            }
            .paySelectBut{
              display: none;
            }
          }
          .payTabItemCilck{
            .paySelectBut{
              background: url(../../assets/img/clockIn/dhao.png) center center no-repeat;
              background-size: 0.28rem 0.28rem;
            }
          }
        }
        .payButBox{
          display: flex;
          justify-content: center;
          align-items: center;
          .noBut,.yesBut{
            width: 2.8rem;
            height: 0.66rem;
            margin: 0.54rem 0.3rem;
            border-radius: 0.1rem;
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.66rem;
            text-align: center;
          }
          .noBut{
            background: #EEEEEE;
          }
          .yesBut{
            color: #fff;
            background: linear-gradient(-90deg,rgba(255,88,71,1),rgba(255,145,120,1));
          }
        }
      }
    }
    .dapPage{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
      z-index: 3;
      .earlyYes{
        position: relative;
        width: 4.8rem;
        height: 6.3rem;
        background: #fff;
        border-radius: 0.1rem;
        .earlyImg{
          position: absolute;
          width: 4.8rem;
          top: 0;
          left: 0;
        }
        .hiddenBut{
          position: absolute;
          right: 0.33rem;
          top: 0.31rem;
          width: 0.28rem;
          height: 0.28rem;
          background: url(../../assets/img/clockIn/guanbi.png) center center no-repeat;
          background-size: 0.28rem 0.28rem;
        }
        .time{
          position: relative;
          width: 2.7rem;
          height: 0.34rem;
          margin: auto;
          margin-top: 1.64rem;
          font-size: 0.2rem;
          font-weight: 500;
          line-height: 0.34rem;
          color: #005C9E;
          box-sizing: border-box;
          padding-left: 0.18rem;
          border-radius: 0.14rem;
          background: #fff;
          z-index: 3;
        }
        .desc{
          width: 100%;
          height: 2.39rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          margin-top: 0.53rem;
          font-size: 0.26rem;
          font-weight: bold;
          line-height: 0.44rem;
          text-align: center;
        }
        .shareBut{
          width: 3.85rem;
          height: 0.76rem;
          margin: auto;
          line-height: 0.76rem;
          border-radius: 0.38rem;
          font-size: 0.3rem;
          font-weight: 500;
          color: #fff;
          text-align: center;
          background: linear-gradient(-45deg,rgba(255,88,71,1),rgba(255,145,120,1));
        }
      }
    }
    .lateBox{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
      z-index: 3;
      .late{

      }
    }
    .remindBox{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      font-family:PingFang-SC-Medium;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
      z-index: 3;
      .remind{
        position: relative;
        width: 6.1rem;
        border-radius: 0.2rem;
        background: #fff;
        text-align: center;
        color: #333;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .remindText{
          padding-top: 0.57rem;
          padding-bottom: 0.53rem;
          .title{
            width: 100%;
            font-size: 0.36rem;
            line-height: 0.36rem;
          }
          .content{
            width: 100%;
            margin-top: 0.36rem;
            font-size: 0.32rem;
            line-height: 0.32rem;
            font-weight: 500;
          }
        }
        .butBox{
          position: relative;
          width: 100%;
          height: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.9rem;
          border-top: 0.01rem solid #EEEEEE;
          .cancelBut{
            flex: 1;
            border-right: 0.01rem solid #EEEEEE;
          }
          .confirmBut{
            flex: 1;
            color: #1C7EDE;
          }
        }
      }
    }
    .hintBox{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      font-family:PingFang-SC-Medium;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
      z-index: 3;
      .hint{
        width: 6.1rem;
        background: #fff;
        border-radius: 0.2rem;
        text-align: center;
        .hintDesc{
          width: 100%;
          padding-top: 0.68rem;
          padding-bottom: 0.62rem;
          font-size: 0.32rem;
          font-weight: 500;
          line-height: 0.48rem;
          color: #333;
        }
        .hintBton{
          width: 100%;
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.9rem;
          color: #1C7EDE;
          border-top: 0.01rem solid #EEEEEE;
        }
      }
    }
    .inviteFriend{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      font-family:PingFang-SC-Medium;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
      z-index: 3;
      .inviteImgBox{
        position: relative;
        width: 3.8rem;
        height: 6.7rem;
        .shutImg{
          position: absolute;
          top: -0.43rem;
          right: -0.43rem;
          width: 0.28rem;
          height: 0.28rem;
          background: url(../../assets/img/clockIn/guanbi.png) center center no-repeat;
          background-size: 0.28rem 0.28rem;
        }
        .inviteImgCode{
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 0.1rem;
          .inviteImg{
            position: absolute;
            width: 100%;
            top: -0.02rem;
            border-radius: 0.1rem;
          }
          .conTitle{
            position: relative;
            width:100%;
            height: 0.2rem;
            margin-top: 0.84rem;
            font-size: 0.18rem;
            font-weight: 500;
            text-align: center;
            line-height: 0.2rem;
            color: #fff;
          }
          .conNumber{
            position: relative;
            width: 100%;
            font-size: 0.5rem;
            font-weight: bold;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            margin-top: 0.25rem;
            margin-bottom: 0.30rem;
            color: #fff;
          }
          .personsBox{
            position: relative;
            overflow: hidden;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .photonBox{
              display: flex;
              margin-right: 0.19rem;
              justify-content: center;
              align-items: center;
              .phoImg{
                overflow: hidden;
                width: 0.26rem;
                height: 0.26rem;
                margin-left: -0.05rem;
                box-sizing: border-box;
                border: 1px solid #fff;
                border-radius: 50%;
                font-size: 0;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .photoText{
              position: relative;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 0.18rem;
              font-weight: 500;
              line-height: 0.2rem;
              height: 0.2rem;
              color: #fff;
              .dot{
                width: 0.04rem;
                height: 0.04rem;
                background: #fff;
                margin-right: 0.04rem;
                border-radius: 50%;
              }
              .personsNumber{
                color: #FFD647;
              }
            }
          }
          .meDetail{
            position: relative;
            height: 0.34rem;
            margin-top: 0.2rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            border-radius: 0.17rem;
            font-family:PingFang-SC-Medium;
            font-size: 0.2rem;
            font-weight: 500;
            line-height: 0.34rem;
            color: #005C9E;
            background: rgba(255, 255, 255, 0.35);
          }
          .twoCode{
            position: absolute;
            overflow: hidden;
            width: 1.04rem;
            height: 1.04rem;
            left: calc( 50% - 0.52rem );
            bottom: 0.74rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .inviteTitle{
        width: 100%;
        margin-top: 0.8rem;
        margin-bottom: 0.8rem;
        font-size: 0.28rem;
        font-weight: 500;
        line-height: 0.28rem;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          width: 1.2rem;
          height: 1px;
          margin-left: 0.12rem;
          margin-right: 0.12rem;
          background: #fff;
        }
      }
      .inviteButBox{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .item{
          height: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0);
          border: 0 solid rgba(0,0,0,);
          img {
            width: 0.88rem;
          }
          p {
            font-size: 0.24rem;
            font-weight: 500;
            line-height: 0.24rem;
            margin-top: 0.18rem;
            color: #fff;
          }
        }
      }
    }
  }
</style>
