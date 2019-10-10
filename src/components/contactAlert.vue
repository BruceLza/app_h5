<template>
    <div  v-show="name"  id="contactAlert" @click="close()">
        <div class="contactAlerts">
            <img :src="lefttabs" alt="">
            <div class="close" @click="close()"></div>
            <div class="next" @click="toContacts()"></div>
            <div class="logo_three">
                 <img :src="logo" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['name', 'code'],
  data () {
    return {
      lefttabs: require('../assets/img/auth/contactAlert.png'),
      logo: this.$logo
    }
  },
  methods: {
    toContacts () {
      this.name = false
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
    close () {
      this.name = false
    }
  }
}
</script>
<style lang="less">
  #contactAlert{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0,0,0,0.25);
  }
    .contactAlert{
        width: 100%;
        height: 100%;
        background: rgba(red, green, blue, 0);
        position: absolute;
        z-index: 999;
    }
    .contactAlerts{
        position: absolute;
        width:3.5rem;
        height:3.8rem;
        top: 35%;
        left:50%;
        margin-left: -1.75rem;
        margin-top:-1.9rem
    }
    .close{
        position: absolute;
        top: 0.58rem;
        left: 3.18rem;
        width: .2rem;
        height:.2rem;
        background:rgba(red, green, blue, 0);
    }
    .next{
        position: absolute;
        top: 2.85rem;
        left: 0.65rem;
        width: 2.2rem;
        height:.6rem;
        background:rgba(red, green, blue, 0);
        // background:red;
    }
    .logo_three{
        position: absolute;
        width: .75rem;
        height: .75rem;
        border-radius: .1rem;
        overflow: hidden;
        top: .5rem;
        left: 1.4rem;
    }

</style>

