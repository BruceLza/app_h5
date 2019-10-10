<template>
  <div id="wechat_login">
    <i class="iconfont icon-close" @click="goBack"></i>
    <div class="wechat_login_img">
      <img :src="$logo" v-if="$logo" alt="">
    </div>
    <div class="edit_button" v-if="wx && isRegister">
      <button class="btn_bright_red" @click="wechatLogin()" :style="{background: $store.state.global.theme.mainColor}">
        <img src="../../assets/img/auth/wechat.png" alt="">
        微信登录
      </button>
    </div>
    <div class="edit_button" v-else>
      <button class="btn_bright_red"  @click="jumpTo('/login')" :style="{background: $store.state.global.theme.mainColor}">
        <!--<img src="../../assets/img/auth/wechat.png" alt="">-->
        登录
      </button>
    </div>
    <ul class="wechat_login_enroll">
      <li v-if="isRegister" class="li1" :style="{color: $store.state.global.theme.mainColor}"  @click="jumpTo('/register')">注册账号</li>
      <li v-else class="li1" :style="{color: $store.state.global.theme.mainColor}"  @click="getIsRegisterText">注册账号</li>
      <span :style="{color: $store.state.global.theme.mainColor}" >|</span>
      <li class="li2" :style="{color: $store.state.global.theme.mainColor}"  @click="jumpTo('/login')">手机登录</li>
    </ul>
    <p class="wechat_login_protocol">登录注册即表示同意 <span @click="jumpTo('/about?title=用户使用协议&type=7')">《用户使用协议》</span></p>
  </div>
</template>

<script>
export default {
  name: 'wechatLogin',
  data () {
    return {
      wx: false,
      data: '',
      auth: {},
      auths: {},
      authBtns: ['weixin'],
      loading: false,
      vuegConfig: {
        // sameDepthDisable: true,
        // forwardAnim: 'fadeInRight',
        // backAnim: 'fadeOutLeft',
        disable: false
      },
      isRegister: true, // 判断是否可以注册
      isRegisterText: ''
    }
  },
  inject: ['reload'],
  mounted: function () {
    let that = this
    that.getIsRegister()
    if (api.systemType === 'ios') {
      that.wx = api.appInstalled({
        sync: true,
        appBundle: 'weixin://'
      })
    } else {
      that.wx = api.appInstalled({
        sync: true,
        appBundle: 'com.tencent.mm'
      })
    }
  },
  methods: {
    wechatLogin () {
      let that = this
      let wx = api.require('wx')
      wx.auth({
        apiKey: ''
      }, function (ret, err) {
        if (ret.status) {
          that.$http.post('/amoy/auth/we-login', {
            code: ret.code,
            registration_id: that.$store.state.global.registrationId
          }, false, true).then(res => {
            if (res.code === 0) {
              // let ajpush = api.require('ajpush')
              // let param = {alias: res.data.uid}
              // ajpush.bindAliasAndTags(param, function (ret) {
              // })
              that.$store.commit('setToken', res.data.token)
              that.$store.commit('setUserInfo', res.data)
              that.$store.commit('setCouponpassMoney', res.data.couponpass_money)
              that.reload()
              // let redirect = decodeURIComponent(that.$route.query.redirect || '/')
              that.$router.push(that.$store.state.global.firstNav)
            } else if (res.code === 2) {
              that.jumpTo({name: 'wxbind', query: {type: 'new', token: res.data.access_token, openid: res.data.openid}})
            } else {
              that.$vux.toast.text(res.msg)
            }
          })
        } else {
          console.log(err.code)
        }
      })
    },
    getIsRegister() {
      this.$http.post('/amoy/auth/is-register', {}, false, true).then(res => {
        if (res.code === 0) {
          if(res.data == 1) {
            this.isRegister = true
          } else if(res.data == 0) {
            this.isRegister = false
            this.isRegisterText = "系统维护"
          }
        }
      })
    },
    getIsRegisterText(){
      this.$vux.toast.text(this.isRegisterText)
    }
  }
}
</script>

<style scoped lang="less">
  #wechat_login{
    height: 100%;
    background: #fff;
    overflow-y: auto;
    .icon-close{
      position: absolute;
      right: .5rem;
      top: .7rem;
      font-size: .3rem;
    }
  }
</style>
