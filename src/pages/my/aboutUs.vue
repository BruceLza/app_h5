<template>
    <div class="about-us">
      <img :src="$logo" class="logo">
      <div class="list-box">
        <div class="list-item-info">
          <span>当前版本</span>
          <span>{{wgtVer}}</span>
        </div>
        <div class="list-item-info" @click="getVersion">
          <span>版本更新</span>
          <span>{{updateTips}}</span>
        </div>
      </div>
      <div class="list-box">
        <div class="list-item-info" @click="goSecret">
          <span>隐私政策</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="list-item-info" @click="jumpTo('/about?title=用户使用协议&type=7')">
          <span>用户注册服务协议</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="list-item-info" @click="goService">
          <span>平台服务协议和交易规则</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast1" class="updateBox">
          <div class="update">
            <img src="../../assets/img/my/update.png" alt="" class="bg">
            <div class="contentBox">
              <div class="add">
                <p class="t">新版本特性</p>
                <p class="info">{{version.update_log}}</p>
              </div>
              <div class="update_btn" ><span @click="showToast1 = false" v-if="!version.is_force">稍后提醒</span><span @click="downWgt" >立即升级</span></div>
            </div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast3" class="updateBox">
          <div class="update">
            <img src="../../assets/img/my/update.png" alt="" class="bg">
            <div class="contentBox">
              <div class="add">
                <p class="t" v-if="smart && smart.extra">新版本特性</p>
                <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
              </div>
              <div class="update_btn" ><span @click="showToast3 = false">稍后提醒</span><span @click="startSmart" >立即升级</span></div>
            </div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast4" class="updateBox">
          <div class="update">
            <img src="../../assets/img/my/update.png" alt="" class="bg">
            <div class="contentBox">
              <div class="add">
                <p class="t" v-if="smart && smart.extra">新版本特性</p>
                <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
              </div>
              <div class="update_btn" ><span @click="reboot" >立即重启</span></div>
            </div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast2" hide-on-blur :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}" class="progressBox">
          <div >
            <span style="color:#fff; font-size: .3rem" class="title">{{progressState}}</span>
            <x-progress :percent="percent" :show-cancel="false"></x-progress>
          </div>
        </x-dialog>
        </div>
    </div>
</template>

<script>
import {XDialog, XProgress, TransferDomDirective as TransferDom} from 'vux'
import * as utils from '../../utils'
export default {
  name: 'about-us',
  components: {
    XDialog, XProgress
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      version: '',
      deviceType: 1,
      wgtVer: window.api && api.appVersion || '0.0.1',
      wgtUrl: '',
      smart: '',
      percent: 0,
      progressState: '准备中',
      updateTips: '暂无更新',
      showToast1: false,
      showToast3: false,
      showToast2: false,
      showToast4: false
    }
  },
  methods: {
    downWgt () {
      let that = this
      if (that.version.download_type === 1) {
        if (api.systemType === 'android') {
          that.showToast1 = false
          that.showToast2 = true
          api.download({
            url: that.version.download_url,
            report: true
          }, function (ret, err) {
            if (ret && ret.state === 0) {
              that.percent = parseInt(ret.percent)
              // that.perCon = parseInt(ret.percent) + '%'
              that.progressState = '下载中' + that.percent + '%'
            }
            if (ret && ret.state === 1) {
              that.progressState = '安装中'
              let savePath = ret.savePath
              api.installApp({
                appUri: savePath
              })
            }
          })
        }
        if (api.systemType === 'ios') {
          api.installApp({
            appUri: that.version.download_url
          })
        }
      } else {
        api.openApp({
          uri: that.version.download_url,
          iosUrl: that.version.download_url
        })
      }
    },
    startSmart () {
      let that = this
      let mam = api.require('mam')
      mam.startSmartUpdate(function (ret, err) {
        if (ret) {
          that.showToast3 = false
          that.showToast2 = true
          that.percent = parseInt(ret.progress)
          if (ret.state === 0) {
            that.progressState = '准备中' + that.percent + '%'
          } else if (ret.state === 1) {
            that.progressState = '下载中' + that.percent + '%'
          } else if (ret.state === 2) {
            that.progressState = '解压中' + that.percent + '%'
          } else if (ret.state === 3) {
            api.rebootApp()
          } else if (ret.state === 4) {
            that.showToast2 = false
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    reboot () {
      api.rebootApp()
    },
    getVersion () {
      let that = this
      this.$http.post('/amoy/app/version', {
        deviceType: this.deviceType,
        version: this.wgtVer,
        type: this.$route.query.type
      }, false, true).then(res => {
        if (res.code === 0) {
          this.version = res.data
          this.showToast1 = true
        } else {
          let mam = api.require('mam')
          mam.checkSmartUpdate(function (ret, err) {
            console.log('检测到' + JSON.stringify(ret))
            if (ret && ret.packages.length > 0) {
              if (ret.packages[0].silent) {
                that.smart = ret.packages[0]
                mam.startSmartUpdate(function (ret, err) {
                  if (ret) {
                    if (that.smart && that.smart.extra) {
                      api.addEventListener({
                        name: 'smartupdatefinish'
                      }, function (ret, err) {
                        that.showToast4 = true
                      })
                    }
                  } else {
                    console.log(JSON.stringify(err))
                  }
                })
              } else {
                that.showToast3 = true
                that.smart = ret.packages[0]
              }
            } else {
              that.$vux.toast.text('当前已是最新版本')
            }
          })
        }
      })
    },
    checkVersion () {
      let that = this
      this.$http.post('/amoy/app/version', {
        deviceType: this.deviceType,
        version: this.wgtVer,
        type: this.$route.query.type
      }, false, true).then(res => {
        if (res.code === 0) {
          this.updateTips = '新版本：' + res.data.version
        } else {
          let mam = api.require('mam')
          mam.checkSmartUpdate(function (ret, err) {
            if (ret.packages.length > 0) {
              that.updateTips = '立即更新'
            }
          })
        }
      })
    },
    goSecret () {
      this.$http.post('/amoy/user/secret', {}, false, true).then(res => {
        utils.storage.set('richText', {title: '隐私政策', content: res.data.secret})
        this.jumpTo(`/richText?title=隐私政策`)
      })
    },
    goService () {
      this.$http.post('/amoy/user/secret', {}, false, true).then(res => {
        utils.storage.set('richText', {title: '平台服务协议和交易规则', content: res.data.service})
        this.jumpTo(`/richText?title=平台服务协议和交易规则`)
      })
    }
  },
  mounted () {
    if (window.api) {
      this.deviceType = (api.systemType === 'android') ? 1 : 2
    }
    this.checkVersion()
  }
}
</script>

<style scoped lang="less">
.about-us{
  .logo{
    width: 1.3rem;
    display: block;
    margin: .8rem auto;
  }
  .list-box{
    margin-bottom: .5rem;
    background: white;
    border-radius: .1rem;
    padding: 0 .3rem;
    .list-item-info{
      display: flex;
      justify-content: space-between;
      line-height: .9rem;
      span:first-child{
        font-size: .3rem;
      }
    }
    .list-item-info:not(:last-child){
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
