<template>
  <div id="register1">
    <x-header :left-options="{showBack: false}" v-if="headerState">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div v-if="show">
      <div class="register_list input_list">
        <div class="label2" @click="onshow">
          <input type="tel" placeholder="请选择地区" readonly v-model="mobileCountryName">
          <span :style="{background: $store.state.global.theme.mainColor}">切换地区</span>
        </div>
        <div class="label1">
          <input type="tel" placeholder="请输入手机号" v-model="mobile">
        </div>
        <div class="label2">
          <input type="text" placeholder="请输入验证码" v-model="smsCode">
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
      <div class="mail-reg" @click="replaceTo('/mailregister')" v-if="isOpenEmail=='1'">邮箱注册</div>
      <actionsheet
        v-model="actionState"
        :menus="phoneList"
        theme="android"
        @on-click-menu="onClickmenu">
      </actionsheet>
    </div>
  </div>
</template>

<script>
import { Actionsheet} from 'vux'
export default {
  name: 'register',
  components: {
    Actionsheet
  },
  props: {
    headerState: {
      type: Boolean,
      default (){
        return true
      }
    }
  },
  data () {
    return {
      imgSrc: './static/img/auth/pitch_on.png',
      pitchOn: './static/img/auth/pitch_on.png',
      unPitchOn: './static/img/auth/un_pitch_on.png',
      imgSrcFlag: false,
      getCode: '获取验证码',
      timerFlag: false,
      mobile: '',
      smsCode: '',
      invite_code: '',
      password: '',
      re_password: '',
      show: true,
      code: '',
      invite: false,
      isOpenEmail: '0',
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
  methods: {
    onshow () {
      this.actionState = true
    },
    onClickmenu (key, obj) {
      this.mobileCountryName = obj.label
      this.mobileCountry = key
    },
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
    getIsOpen (){
      this.$http.post('/amoy/auth/email').then((res)=>{
        this.isOpenEmail = res.data.status
      })
    },
    send () {
      if (!/^\d{8,11}$/.test(this.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
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
      this.$http.post('/amoy/auth/register', {
        mobile: this.mobile,
        type: 'register',
        sms_code: this.smsCode,
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
      if (!/^[0-9]\d{8,11}$/.test(this.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
        return
      }
      if (this.timerFlag === false) {
        this.$http.post('/amoy/auth/sms-verifycode', {
          mobile: this.mobileCountry + '-' + this.mobile,
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
    this.getIsOpen()
  }
}
</script>

<style >
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
