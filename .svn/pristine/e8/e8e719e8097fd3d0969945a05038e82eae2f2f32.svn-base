<template>
    <div class="contacts">
        <div class="contactsbox">
            <div class="contactsbg">
                <img :src="imgSrc" alt="">
            </div>
            <div class='contacts_time'>服务时间：{{time}}  {{"  " + date}}</div>
                <div class="codes">{{code}}</div>
             <div class="contactsbtn" @click="toContacts()">复制去微信添加</div>
             <div class="logo_one">
                 <img :src="logo" alt="">
            </div>
               <div class="logo_tow">
                 <img :src="logo" alt="">
            </div>
            <div class="logo_three">
                 <img :src="logo" alt="">
            </div>
            <div class="logo_four">
                 <img :src="logo" alt="">
            </div>
        </div>
        <contactAlert :name='shows' :code='code'></contactAlert>
    </div>
</template>

<script>
// import {XDialog, XCircle, TransferDomDirective as TransferDom, Previewer} from 'vux'
import contactAlert from '../../components/contactAlert'
export default {
  name: 'contacts',
  components: {
    contactAlert
  },
  data () {
    return {
      data: '',
      code: '1',
      imgSrc: require('../../assets/img/auth/contactbg.png'),
      logo: this.$logo,
      time: '',
      date: '',
      shows: false
    }
  },
  methods: {
    toContacts () {
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: this.code
      }, function (ret, err) {
        if (ret) {
          var wx = api.require('wx')
          wx.isInstalled(function (ret, err) {
            if (ret.installed) {
              if (api.systemType === 'android') {
                api.openApp({
                  androidPkg: 'com.tencent.mm',
                  mimeType: 'text/html',
                  uri: 'wechat://'
                }, function (ret, err) {
                  if (ret) {
                  } else {
                  }
                })
              } else {
                api.openApp({
                  iosUrl: 'weixin://'
                })
              }
            }
          })
        } else {
        }
      })
    },
    getWxCode () {
      this.$http.post('/amoy/user/service-qrcode', {}, false, true).then((res) => {
        if (res.code === 0) {
          this.code = res.data.wechat
          this.date = res.data.openday
          this.time = res.data.opentime
        }
      })
    }
  },
  mounted () {
    this.shows = true
    this.getWxCode()
  }
}
</script>

<style scoped lang="less">
    .contacts{
        height: 100%;

        .contactsbox{
            position: relative;
            height: 100%;
            background: linear-gradient(to bottom,#ff9975,#ff5740);
            .contactsbg{
                position: absolute;
                top:0;
                left:0;
                 height: 100%;
            }
            .contactsbtn{
                width: 5.27rem;
                height: .9rem;
                background: linear-gradient(to right,#fec555,#ffe0a1);
                border-radius: .5rem;
                position: absolute;
                top:10.8rem;
                left: 1.13rem;
                text-align: center;
                line-height: .9rem;
                font-size:.28rem;
                color: #ff6a47;
            }
            .codes{
                position: absolute;
                top: 9.5rem;
                left: 3rem;
                font-size: .25rem;
                color: #fff;
            }
            .contacts_time{
                width: 100%;
                position: absolute;
                top:1.75rem;
                font-size: .25rem;
                color: #fff;
                text-align: center;
            }
            .logo_one{
                position: absolute;
                width: .75rem;
                height: .75rem;
                top: 3.3rem;
                left: 6rem;
                border-radius: .1rem;
                overflow: hidden;
            }
            .logo_tow{
                position: absolute;
                width: .75rem;
                height: .75rem;
                border-radius: .1rem;
                overflow: hidden;
                top: 5.2rem;
                left: 6rem;
            }
            .logo_three{
                position: absolute;
                width: .75rem;
                height: .75rem;
                border-radius: .1rem;
                overflow: hidden;
                top: 7rem;
                left: 6rem;
            }
            .logo_four{
                position: absolute;
                width: .88rem;
                height: .88rem;
                border-radius: .12rem;
                overflow: hidden;
                top: 9.1rem;
                left: 2rem;
            }
        }
    }
</style>
