<template>
  <div id="forget">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div class="input_list">
      <div class="label2" @click="onshow">
        <input type="tel" placeholder="请选择地区" readonly v-model="mobileCountryName">
        <span :style="{background: $store.state.global.theme.mainColor}">切换地区</span>
      </div>
      <div class="label1">
        <input type="tel" placeholder="请输入手机号" v-model="mobile">
      </div>
      <div class="label2">
        <input type="text" placeholder="请输入验证码" v-model="smsCode">
        <span @click="handSmsCode">{{getCode}}</span>
      </div>
      <div class="label3">
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="label4">
        <input type="password" placeholder="请确认密码" v-model="re_password">
      </div>
    </div>
    <div class="edit_button">
      <button class="btn_bright_red" :style="{background: $store.state.global.theme.mainColor}" @click="send">完成</button>
    </div>
    <div class="mail-code" @click="replaceTo('/mailforget')">邮箱密码找回</div>
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
  name: 'forget',
  components: {
    Actionsheet
  },
  data () {
    return {
      getCode: '获取验证码',
      timerFlag: false,
      mobile: '',
      smsCode: '',
      password: '',
      re_password: '',
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
        }
      ]
    }
  },
  mounted: function () {
    // 删除
  },
  methods: {
    onshow () {
      this.actionState = true
    },
    onClickmenu (key, obj) {
      this.mobileCountryName = obj.label
      this.mobileCountry = key
    },
    send () {
      if (this.password !== this.re_password) {
        this.$vux.toast.text('两次密码不一致')
        return
      }
      this.$http.post('/amoy/auth/reset', {
        mobile: this.mobile,
        sms_code: this.smsCode,
        password: this.password,
        re_password: this.re_password
      }, true).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          this.$router.push('/login')
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    // 点击获取验证码
    handSmsCode () {
      if (!/^[0-9]\d{8,11}$/.test(this.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
        return
      }
      if (this.timerFlag === false) {
        this.$http.post('/amoy/auth/sms-verifycode', {
          type: 'reset',
          mobile: this.mobileCountry + '-' + this.mobile
        }, true).then(res => {
          this.timerFlag = !this.timerFlag
          this.$vux.toast.text(res.msg)
          this.countDown(60)
        })
      } else {
        return ''
      }
    },
    // 每秒执行
    countDown (time) {
      let count = time
      setTimeout(() => {
        count--
        if (time <= 0) {
          this.getCode = '获取验证码'
          this.timerFlag = false
        } else if (count !== time) {
          this.getCode = '重新获取' + count
          this.countDown(count)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
  #forget {
    height: 100%;
    background: #fff;
    overflow-y: auto;
  }
  .vux-header{
    position: relative !important;
  }
  .mail-code{
    margin-top:30px;
    width:100vw;
    text-align: center;
    font-size:4vw;
    color:rgb(255, 88, 71);
  }
</style>
