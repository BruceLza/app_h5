<template>
    <div class="revise">
      <group>
        <x-input  class="weui-vcode" placeholder="请选择地区" readonly v-model="mobileCountryName">
          <img slot="label"   src="../../assets/img/my/code.png">
          <x-button slot="right" type="primary" mini class="send" @click.native="onshow" :style="{background: $store.state.global.theme.mainColor}">切换地区</x-button>
        </x-input>
        <x-input placeholder="请输入手机号" v-model="mobile" :max="11" is-type="china-mobile" disabled>
          <img slot="label"   src="../../assets/img/my/phone.png">
        </x-input>
        <x-input  class="weui-vcode" placeholder="请输入验证码" v-model="smsCode">
          <img slot="label"   src="../../assets/img/my/code.png">
          <x-button slot="right" type="primary" mini class="send" @click.native="handSmsCode" :style="{background: $store.state.global.theme.mainColor}">{{getCode}}</x-button>
        </x-input>
        <x-input placeholder="请输入新密码" v-model="password" type="password">
          <img slot="label"   src="../../assets/img/my/password.png">
        </x-input>
        <x-input placeholder="请确认新密码" v-model="re_password" type="password">
          <img slot="label"   src="../../assets/img/my/password.png">
        </x-input>
      </group>
      <div class="primary_btn" @click="send" :style="{background: $store.state.global.theme.mainColor}">确认修改</div>
      <actionsheet
        v-model="actionState"
        :menus="phoneList"
        theme="android"
        @on-click-menu="onClickmenu">
      </actionsheet>
    </div>
</template>

<script>

import {Group, XInput, Cell, XHeader, Confirm, XButton, Actionsheet} from 'vux'
export default {
  name: 'revise',
  components: {
    Group, Cell, XHeader, Confirm, XInput, XButton, Actionsheet
  },
  data () {
    return {
      getCode: '获取验证码',
      timerFlag: false,
      mobile: this.$store.state.user.userInfo.mobile,
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
          this.$store.commit('logout')
          this.$router.push('/wechatLogin')
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
<style lang="less">
  @import "../../assets/less/common";
  .revise{
    .weui-cells{
      margin-top: 0;
    }
    .weui-cell__hd{
      display: flex;
      align-items: center;
      img{
        margin-right: .2rem;
        width: .22rem;
        max-height: .36rem;
      }
    }
    .weui-input{
      font-size: .28rem;
    }
    .weui-cell{
      padding: .27rem .3rem;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.revise{
}
</style>
