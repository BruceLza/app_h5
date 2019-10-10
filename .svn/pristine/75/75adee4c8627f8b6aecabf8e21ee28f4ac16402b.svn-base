<template>
  <div id="register1">
    <x-header :left-options="{showBack: false}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div v-if="show">
      <div class="register_list input_list">
        <div class="label_1">
          <input type="tel" placeholder="请输入邮箱" v-model="user_email">
        </div>
        <div class="label2">
          <input type="text" placeholder="请输入验证码" v-model="email_code">
          <span @click="handSmsCode" class="code">{{getCode}}</span>
        </div>
        <div class="label5">
          <input type="text" placeholder="请输入邀请码" v-model="invite_code">
          <span @click="clip" class="clip" :style="{background: $store.state.global.theme.mainColor}">一键粘贴</span>
        </div>
        <div class="label3">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="label4">
          <input type="password" placeholder="请确认密码" v-model="re_password">
        </div>
        <p>
          <img :src="imgSrc" @click="onPitch">
          登录注册即表示同意
          <span @click="jumpTo('/about?title=用户使用协议&type=7')">《用户使用协议》</span>
        </p>
        <div class="edit_button">
          <button class="btn_bright_red" :style="{background: $store.state.global.theme.mainColor}" @click="send">完成</button>
        </div>
      </div>
      <div class="mail-reg" @click="replaceTo('/register')">手机注册</div>
      <!--<div class="edit_button">-->
        <!--<button class="btn_bright_red" @click="test" :disabled="smsCode === ''">下一步</button>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'mailregister',
  data () {
    return {
      imgSrc: './static/img/auth/pitch_on.png',
      pitchOn: './static/img/auth/pitch_on.png',
      unPitchOn: './static/img/auth/un_pitch_on.png',
      imgSrcFlag: false,
      getCode: '获取验证码',
      timerFlag: false,
      user_email: '',
      email_code: '',
      invite_code: '',
      password: '',
      re_password: '',
      show: true,
      code: '',
      invite: false
    }
  },
  methods: {
    clip () {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.get(function (ret, err) {
        if (ret) {
          if (ret.value !== '') {
            that.invite_code = ret.value
          } else {
            this.$vux.toast.text('请复制邀请码')
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    send () {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(this.user_email)) {
        this.$vux.toast.text('请输入正确的邮箱')
        return
      }
      if (this.password !== this.re_password) {
        this.$vux.toast.text('两次密码不一致')
        return
      }
      if (this.imgSrcFlag) {
        this.$vux.toast.text('请先勾选用户使用协议')
        return
      }
      this.$http.post('/amoy/auth/email-register', {
        user_email: this.user_email,
        type: 'register',
        email_code: this.email_code,
        invite_code: this.invite_code,
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
    onPitch () {
      this.imgSrcFlag = !this.imgSrcFlag
      if (this.imgSrcFlag === true) {
        this.imgSrc = this.unPitchOn
      } else {
        this.imgSrc = this.pitchOn
      }
    },
    // 点击获取验证码
    handSmsCode () {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(this.user_email)) {
        this.$vux.toast.text('请输入正确的邮箱')
        return
      }
      if (this.timerFlag === false) {
        this.$http.post('/amoy/auth/email-verifycode', {
          user_email: this.user_email,
          type: 'register'
        }, true, true).then(res => {
          // this.invite = res.data.isNeedInvite !== '0'
          if (res.code === 0) {
            this.timerFlag = !this.timerFlag
            this.$vux.toast.text(res.msg)
            this.countDown(60)
          } else {
            this.$vux.toast.text(res.msg)
          }
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
  },
  mounted () {
    // 删除
  }
}
</script>

<style scoped>
  #register1{
    overflow-x: hidden;
    height: 100%;
    background: #fff;
    overflow-y: auto;
  }
  .vux-header{
    position: relative !important;
  }
  .mail-reg{
    margin-top:30px;
    width:100vw;
    text-align: center;
    font-size:4vw;
    color:rgb(255, 88, 71);
  }
</style>
