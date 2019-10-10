<template>
  <div id="login">
    <x-header :left-options="{showBack: false}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div class="login_img">
      <img :src="$logo" v-if="$logo" alt="">
    </div>
    <div class="input_list login_input">
      <div class="label3" @click="onshow">
        <input readonly type="tel" placeholder="请选择地区" v-model="mobileCountryName">
        <span :style="{background: $store.state.global.theme.mainColor}">切换地区</span>
      </div>
      <div class="label1">
        <input type="tel" :placeholder="placeholder" v-model="mobile">
      </div>
      <div class="label2">
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
      </div>
    </div>
    <div class="readPwd">
      <img :src="imgSrc" @click="onPitch">
      记住密码
    </div>
    <div class="edit_button btn_login">
      <button class="btn_bright_red" :style="{background: $store.state.global.theme.mainColor}" @click="login">登录</button>
    </div>
    <div class="edit_button btn_register">
      <button v-if="isRegister" class="btn_bright_red" @click="jumpTo('/register')" :style="{borderColor: $store.state.global.theme.mainColor}">注册</button>
      <button v-else class="btn_bright_red" @click="getIsRegisterText" :style="{borderColor: $store.state.global.theme.mainColor}">注册</button>
    </div>
    <div class="login_enroll_div">
      <ul class="login_enroll">
        <li class="li1" @click="jumpTo('/forget')" :style="{color: $store.state.global.theme.mainColor}" >忘记密码</li>
        <span :style="{color: $store.state.global.theme.mainColor}" >|</span>
        <li class="li2" :style="{color: $store.state.global.theme.mainColor}"  @click="jumpTo('/mobileLogin')">验证码登录</li>
      </ul>
    </div>
    <actionsheet
      v-model="actionState"
      :menus="phoneList"
      theme="android"
      @on-click-menu="onClickmenu">
    </actionsheet>
  </div>
</template>

<script>
import { Actionsheet} from 'vux'
export default {
  name: 'wechat_login',
  components: {
    Actionsheet
  },
  data () {
    return {
      mobile: '',
      password: '',
      placeholder: '请输入手机号码',
      isRegister: true, // 判断是否可以注册
      isRegisterText: '',
      imgSrc: './static/img/auth/pitch_on.png',
      pitchOn: './static/img/auth/pitch_on.png',
      unPitchOn: './static/img/auth/un_pitch_on.png',
      imgSrcFlag: false,
      actionState: false,
      mobileCountryName: '中国大陆 +86',
      mobileCountry: '+86',
      phoneList: [
        {
          label: '中国大陆 +86',
          value: '+86'
        },
        {
          label: '中国香港 +85',
          value: '+85'
        },
        {
          label: '中国台湾 +886',
          value: '+886'
        },
        {
          label: '新加坡 +65',
          value: '+65'
        },
        {
          label: '马来西亚 +60',
          value: '+60'
        },
        {
          label: '邮箱登陆',
          value: '666'
        }
      ]
    }
  },
  inject: ['reload'],
  methods: {
    onshow () {
      this.actionState = true
    },
    onClickmenu (key, obj) {
      this.mobileCountryName = obj.label
      this.mobileCountry = key
      if (key === '666') {
        this.placeholder = '请输入邮箱'
      } else {
        this.placeholder = '请输入手机号码'
      }
    },
    onPitch() {
      this.imgSrcFlag = !this.imgSrcFlag
      if (this.imgSrcFlag === true) {
        this.imgSrc = this.unPitchOn
      } else {
        this.imgSrc = this.pitchOn
      }
    },
    login() {
      var that = this;
      // var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      // if (this.mobile.length==11){
      //   if (!/[0-9]{8,11}/.test(this.mobile)) {
      //     this.$vux.toast.text('请输入正确的手机号')
      //     return
      //   }
      //   var isMobile = this.$http.post('/amoy/auth/login', {
      //     mobile: this.mobile,
      //     password: this.password,
      //     registration_id: that.$store.state.global.registrationId
      //   }, true)
      // }else{
      //   if (!reg.test(this.mobile)) {
      //     this.$vux.toast.text('请输入正确的邮箱')
      //     return
      //   }
      //   var isMobile = this.$http.post('/amoy/auth/email-login', {
      //     email: this.mobile,
      //     password: this.password,
      //     registration_id: that.$store.state.global.registrationId
      //   }, true)
      // }
      if (this.mobile && this.password) {
        var isMobile = ''
        if (this.mobileCountry === '666') {
          var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'/
          if (!reg.test(this.mobile)){
            isMobile = this.$http.post('/amoy/auth/email-login', {
              email: this.mobile,
              password: this.password,
              registration_id: that.$store.state.global.registrationId
            }, true)
          } else {
            this.$vux.toast.text('请输入正确的邮箱')
            return
          }
        } else {
          var reg = /^[0-9]\d{8,11}$/
          if (reg.test(this.mobile)){
            isMobile = this.$http.post('/amoy/auth/login', {
              mobile: this.mobile,
              password: this.password,
              registration_id: that.$store.state.global.registrationId
            }, true)
          } else {
            this.$vux.toast.text('请输入正确的手机号')
            return
          }
        }
      } else {
        this.$vux.toast.text('账号密码不能为空')
        return
      }
      isMobile.then(res => {
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('setUserInfo', res.data)
        this.$store.commit('setCouponpassMoney', res.data.couponpass_money)
        this.reload()
        this.setCookie()
        this.$router.push(this.$store.state.global.firstNav)
      })
    },
    getIsRegister() {
      this.$http.post('/amoy/auth/is-register', {}, false, true).then(res => {
        if (res.code === 0) {
          if (res.data == 1) {
            this.isRegister = true
          } else if (res.data == 0) {
            this.isRegister = false
            this.isRegisterText = '系统维护'
          }
        }
      })
    },
    setCookie (){
      if (!this.imgSrcFlag) {
        this.addCookie('userName', this.mobile)
        this.addCookie('userValue', this.password)
      }
    },
    getIsRegisterText() {
      this.$vux.toast.text(this.isRegisterText)
    },
    getCookie(objName) {
      var arrStr = document.cookie.split(';')
      for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split('=')
        if (temp[0] == objName) return unescape(temp[1])
      }
    },
    addCookie (objName, objValue, objHours) {//添加cookie
      var str = objName + '=' + escape(objValue);
      if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = 24 * 60 * 60 * 1000; //自己设置cookie时间
        date.setTime(date.getTime() + ms); //注意为毫秒值
        str += '; expires=' + date.toGMTString();
      }
      document.cookie = str
    }
  },
  mounted: function () {
    this.getIsRegister()
    if(this.getCookie('userName') && this.getCookie('userValue')){
      this.mobile = this.getCookie('userName')
      this.password = this.getCookie('userValue')
    }
  }
}
</script>

<style scoped lang="less">
  #login{
    overflow-x: hidden;
    height: 100%;
    background: #fff;
    overflow-y: auto;
  }
  .vux-header{
    position: relative !important;
  }
  .readPwd{
    width: 100%;
    box-sizing: border-box;
    font-size: 0.24rem;
    color: #666666;
    padding: 0.36rem 0.3rem 0 0.3rem;
    img{
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.19rem;
      vertical-align: middle;
    }
  }
</style>

