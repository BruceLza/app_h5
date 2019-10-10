// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import http from './api/http'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'
import VueLazyload from 'vue-lazyload'
import {XHeader, ToastPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin } from 'vux'
import '../static/libs/iconfont/iconfont.css'
import VueScroller from 'vue-scroller'
import './pages/mall/home/home.less'
import './pages/mall/my/my.less'
import 'swiper/dist/css/swiper.css'
import * as utils from './utils'

require('./api/mock.js')
Vue.use(Clipboard).use(Vuex).use(ToastPlugin, {position: 'bottom'}).use(ConfirmPlugin).use(DatetimePlugin).use(LoadingPlugin).use(VueScroller)
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$img = utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png')
Vue.use(VueLazyload, {
  loading: utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png'),
  preLoad: 2,
  error: utils.storage.get('errorImg') ? utils.storage.get('errorImg') : require('@/assets/img/error.png'),
  adapter: 1
})
Vue.prototype.$logo = utils.storage.get('appLoginLogo') ? utils.storage.get('appLoginLogo') : ''
Vue.prototype.$logo = 'http://apma.oss-cn-hangzhou.aliyuncs.com/image/houniaologo.png'
http.post('/amoy/app/info', {}, false).then(res => {
  if (res.code === 0) {
    if (res.data.defaultImg.DEFAULT_IMG) {
      utils.storage.set('defaultImg', res.data.defaultImg.DEFAULT_IMG)
    }
    if (res.data.defaultImg.FAILURE_IMG) {
      utils.storage.set('errorImg', res.data.defaultImg.FAILURE_IMG)
    }
    utils.storage.set('appLoginLogo', res.data.appLoginLogo)
    // Vue.prototype.$logo = res.data.appLoginLogo
    Vue.prototype.$isCouponPass = res.data.isCouponPass
    Vue.prototype.$isInviteOpen = res.data.isInviteOpen
    Vue.prototype.$up_operator = res.data.up_operator
    Vue.prototype.$img = res.data.defaultImg.DEFAULT_IMG ? res.data.defaultImg.DEFAULT_IMG : require('@/assets/img/bg.png')
    Vue.use(VueLazyload, {
      loading: res.data.defaultImg.DEFAULT_IMG ? res.data.defaultImg.DEFAULT_IMG : require('@/assets/img/bg.png'),
      preLoad: 2,
      error: res.data.defaultImg.FAILURE_IMG ? res.data.defaultImg.FAILURE_IMG : require('@/assets/img/error.png'),
      adapter: 1
    })
  } else {
    Vue.prototype.$img = require('@/assets/img/bg.png')
    Vue.use(VueLazyload, {
      loading: require('@/assets/img/bg.png'),
      preLoad: 2,
      error: require('@/assets/img/error.png'),
      adapter: 1
    })
  }
})

// 右滑相关代码 —————————————start—————————————————
window.canRightSlipBack = true
Vue.prototype.rightSlip = function () {
  if (window.canRightSlipBack) {
    if (api.pageParam.backToWin) {
      // 当界面有别的window可返回，不做拦截，通过原生的右滑返回来处理
    } else {
      router.go(-1)
    }
  }
}
Vue.prototype.forbidRightSlip = function () {
  window.canRightSlipBack = false
}
Vue.prototype.allowRightSlip = function () {
  setTimeout(() => {
    window.canRightSlipBack = true
  }, 3000)
}
function vueTouch (el, binding, type) {
  var _this = this
  this.obj = el
  this.binding = binding
  this.touchType = type
  this.vueTouches = {
    x: 0,
    y: 0
  }
  this.vueMoves = true
  this.vueLeave = true
  this.vueCallBack = typeof (binding.value) === 'object' ? binding.value.fn : binding.value
  this.obj.addEventListener('touchstart', function (e) {
    _this.start(e)
  }, false)
  this.obj.addEventListener('touchend', function (e) {
    _this.end(e)
  }, false)
  this.obj.addEventListener('touchmove', function (e) {
    _this.move(e)
  }, false)
  this.start = function (e) {
    this.vueMoves = true
    this.vueLeave = true
    this.longTouch = true
    this.vueTouches = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) {
        this.touchType === 'longtap' && this.vueCallBack(this.binding.value, e);
        this.longTouch = false
      };
    }.bind(this), 1000)
  }
  this.end = function (e) {
    var disX = e.changedTouches[0].pageX - this.vueTouches.x
    var disY = e.changedTouches[0].pageY - this.vueTouches.y
    clearTimeout(this.time)
    if (Math.abs(disX) > 30 || Math.abs(disY) > 100) {
      this.touchType === 'swipe' && this.vueCallBack(this.binding.value, e)
      if (Math.abs(disX) > (Math.abs(disY)) * 2) {
        if (disX > 30) {
          this.touchType === 'swiperight' && this.vueCallBack(this.binding.value, e)
        };
        if (disX < -30) {
          this.touchType === 'swipeleft' && this.vueCallBack(this.binding.value, e)
        };
      } else {
        if (disY > 10) {
          this.touchType === 'swipedown' && this.vueCallBack(this.binding.value, e)
        };
        if (disY < -10) {
          this.touchType === 'swipeup' && this.vueCallBack(this.binding.value, e)
        };
      };
    } else {
      if (this.longTouch && this.vueMoves) {
        this.touchType === 'tap' && this.vueCallBack(this.binding.value, e);
        this.vueLeave = false
      };
    };
  }
  this.move = function (e) {
    this.vueMoves = false
  }
};

Vue.directive('swiperight', {
  bind: function (el, binding) {
    new vueTouch(el, binding, 'swiperight')
  }
})
// 右滑相关代码 —————————————end—————————————————

Vue.component('x-header', XHeader)

Vue.use(plugin, {router: router})

Vue.config.productionTip = false
Vue.prototype.link = 'http://houniao.meida520.cn/api/' + config.bizId
Vue.prototype.$color = '#fc3357'
// 控制线下的内容是否开启
Vue.prototype.$isMallUnderShop = config.isMallUnderShop
// 支付宝支付模块
Vue.prototype.$aliPay = config.aliPay
Vue.prototype.$bizId = config.bizId
// 控制线上的内容是否开启
Vue.prototype.$isMallShop = config.isMallShop

// 测试环境代码 —————————————start—————————————————
http.post('/amoy/app/design', {
  type: 1,
  version: '00.01.02',
  device: 1
}, true).then(res => {
  console.log(JSON.parse(res.data.content))
  console.log(JSON.parse(res.data.footer))
  if (res.data.footer) {
    store.commit('setFooter', JSON.parse(res.data.footer))
  }
  if (res.data.content) {
    store.commit('setContent', JSON.parse(res.data.content))
  }
  if (res.data.theme) {
    store.commit('setTheme', JSON.parse(res.data.theme))
  }
  let content = JSON.parse(res.data.content)
  if (res.data.content) {
    for (let i = 0; i < content.length; i++) {
      if (content[i].name === 'edit-header') {
        store.commit('setSearch', content[i].params)
      } else if (content[i].name === 'edit-xf-button') {
        store.commit('setFloating', content[i].params)
      } else if (content[i].name === 'edit-activity-alert') {
        store.commit('setActivity', content[i].params)
      }
    }
  }
  http.post('/amoy/app/design', {
    type: 2
  }, true).then(res => {
    if (res.data.content) {
      store.commit('setMyContent', JSON.parse(res.data.content))
    }
  })
  // vueObj 为了方便别的webview调用此vue对象
  window.vueObj = new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
  })
})
// 测试环境代码 —————————————end—————————————————

window.apiready = function () {
  var ajpush = api.require('ajpush')
  if (api.systemType === 'android') {
    ajpush.init(function (ret) {
      if (ret && ret.status) {
        // ajpush.setListener(
        //   function (ret) {
        //     var title = ret.title
        //     var content = ret.content
        //     var extra = ret.extra
        //     alert('监听' + title)
        //     alert('监听' + content)
        //     alert('监听' + extra)
        //   }
        // )
        let ajpush = api.require('ajpush')
        ajpush.getRegistrationId(function (ret) {
          let registrationId = ret.id
          store.commit('setRegistrationId', registrationId)
        })
        api.addEventListener({
          name: 'appintent'
        }, function (ret, err) {
          if (ret && ret.appParam.ajpush) {
            var ajpush = ret.appParam.ajpush
            if (ajpush.extra.msg_type === '1') {
              utils.storage.set('supergoods', [{}])
              router.push('/supergoods?type=' + ajpush.extra.goods_type + '&id=' + ajpush.extra.goods_id + '&i=0' + '&way=1')
            } else if (ajpush.extra.msg_type === '2') {
              router.push('/notice?type=1')
            } else if (ajpush.extra.msg_type === '3') {
              router.push('/notice')
            }
          }
        })
      }
    })
  } else {
    // ajpush.getRegistrationId(function (ret) {
    //   var registrationId = ret.id
    //   console.log(registrationId)
    //   alert(registrationId)
    // })
    // ajpush.setListener(
    //   function (ret) {
    //     var title = ret.title
    //     var content = ret.content
    //     var extra = ret.extra
    //     alert('监听' + title)
    //     alert('监听' + content)
    //     alert('监听' + extra)
    //   }
    // )
    // var param = {alias: 'myalias', tags: ['tag1', 'tag2']}
    // ajpush.bindAliasAndTags(param, function (ret) {
    //   var statusCode = ret.statusCode
    //   alert(statusCode)
    // })
    // api.addEventListener({
    //   name: 'noticeclicked'
    // }, function (ret, err) {
    //   if (ret && ret.value) {
    //     var ajpush = ret.value
    //     alert('ios')
    //     alert(JSON.stringify(ajpush))
    //   }
    // })
  }
  var app
  app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
  // vueObj 为了方便别的webview调用此vue对象
  window.vueObj = app
  let time = 0
  let getData = false
  let timer = setInterval(() => {
    time++
    if (time >= 5) {
      if (!getData) {
        getDesign()
      }
      clearInterval(timer)
    }
  }, 1000)
  function getDesign () {
    http.post('/amoy/app/design', {
      type: 1,
      version: api.appVersion,
      device: (api.systemType === 'android') ? 1 : 2
    }, true, true).then(res => {
      if (res.code === 0) {
        getData = true
        if (res.data.footer) {
          store.commit('setFooter', JSON.parse(res.data.footer))
        }
        if (res.data.content) {
          store.commit('setContent', JSON.parse(res.data.content))
        }
        if (res.data.theme) {
          store.commit('setTheme', JSON.parse(res.data.theme))
        }
        if (res.data.is_app_store) {
          store.commit('setFirstNav', '/mall/home')
        } else {
          store.commit('setFirstNav', '/home')
        }
        if (res.data.content) {
          let content = JSON.parse(res.data.content)
          for (let i = 0; i < content.length; i++) {
            if (content[i].name === 'edit-header') {
              store.commit('setSearch', content[i].params)
            } else if (content[i].name === 'edit-goods-list') {
              // 当后台装修了“商品列表”组件，储存对应数据
              store.commit('setGoodsList', content[i].params)
            } else if (content[i].name === 'edit-activity-alert') {
              store.commit('setActivity', content[i].params)
            } else if (content[i].name === 'edit-xf-button') {
              store.commit('setFloating', content[i].params)
              if (content[i].params && content[i].params.items) {
                for (let j in content[i].params.items) {
                  if (content[i].params.items[j].img) {
                    api.openFrame({
                      name: 'suspend_icon',
                      url: 'widget://html/suspend_icon.html',
                      rect: {
                        w: 70,
                        h: 70,
                        marginRight: 0,
                        marginBottom: 200
                      },
                      pageParam: {
                        img: content[i].params.items[j].img,
                        link: content[i].params.items[j].link
                      }
                    })
                  }
                }
              }
            }
          }
        }
        if (!utils.storage.get('Uquanyun')) {
          http.post('/amoy/app/guide', {
          }, true, true).then(response => {
            utils.storage.set('guideList', response.data)
            http.post('/amoy/app/design', {
              type: 2,
              version: api.appVersion,
              device: (api.systemType === 'android') ? 1 : 2
            }, true, true).then(res => {
              if (res.data.content) {
                store.commit('setMyContent', JSON.parse(res.data.content))
              }
            })
            // api.removeLaunchView({
            //   animation: {
            //     type: 'fade',
            //     duration: 500
            //   }
            // })
            if (res.data.is_app_store) {
              router.push('/mall/home')
            } else if (response.code === 0 && response.data.length > 0 && !utils.storage.get('Uquanyun')) {
              router.push('/guide')
            }
          })
        } else {
          // app = new Vue({
          //   el: '#app',
          //   router,
          //   store,
          //   components: { App },
          //   template: '<App/>'
          // })
          if (res.data.is_app_store) {
            router.push('/mall/home')
          } else if (!utils.storage.get('Uquanyun')) {
            router.push('/guide')
          }
          http.post('/amoy/app/design', {
            type: 2,
            version: api.appVersion,
            device: (api.systemType === 'android') ? 1 : 2
          }, true, true).then(res => {
            if (res.code === 0 && res.data.content) {
              store.commit('setMyContent', JSON.parse(res.data.content))
            }
            // setTimeout(() => {
            //   api.removeLaunchView({
            //     animation: {
            //       type: 'fade',
            //       duration: 500
            //     }
            //   })
            // }, 1000)
          })
        }
        api.addEventListener({
          name: 'supergoods'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=ali')
        })
        api.addEventListener({
          name: 'jdSupergoods'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push('/supergoods?type=21&id=' + ret.value.id + '&i=0&way=1&from=jd')
        })
        api.addEventListener({
          name: 'cartSupergoods'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push('/supergoods?type=' + ret.value.type + '&id=' + ret.value.id + '&i=0&way=1&from=cart')
        })
        api.addEventListener({
          name: 'fromCart'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=cart')
        })
        api.addEventListener({
          name: 'aliBack'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push(ret.value.name)
        })
        let home = res.data.is_app_store ? '/mall/home' : '/home'
        // 返回
        let now = false
        let time = null
        api.addEventListener({
          name: 'keyback'
        }, function (ret, err) {
          if (window.api && api.pageParam.backToWin) {
            // 当此window的backToWin为true，则直接返回上一个window
            api.closeWin()
            return
          }
          if (ret) {
            if (app.$route.path === home || app.$route.path === '/wechatLogin') {
              clearInterval(time)
              if (now) {
                now = false
                api.closeWidget({
                  silent: true
                })
              } else {
                now = true
                api.toast({
                  msg: '再按一次返回键退出',
                  duration: 2000,
                  location: 'bottom'
                })
                time = setTimeout(() => {
                  now = false
                }, 1000)
              }
              // 如果是内页则执行路由返回操作
            } else if (app.$route.path === '/videoDetail') {
              let browser = api.require('webBrowser')
              browser.historyBack(
                function (ret, err) {
                  if (!ret.status) {
                    browser.closeView()
                    router.go(-1)
                  }
                }
              )
            } else if (app.$route.path === '/video') {
              let browser = api.require('webBrowser')
              browser.historyBack(
                function (ret, err) {
                  if (!ret.status) {
                    browser.closeView()
                    router.go(-1)
                  }
                }
              )
            } else if (app.$route.path === '/supergoods') {
              if (app.$route.query.from === 'ali') {
                router.go(-1)
                api.openWin({
                  name: 'aliWin',
                  animation: {
                    type: 'push',
                    subType: 'from_left',
                    duration: 300
                  }
                })
              } else if (app.$route.query.from === 'cart') {
                router.go(-1)
                api.openWin({
                  name: 'cartMain',
                  animation: {
                    type: 'push',
                    subType: 'from_left',
                    duration: 300
                  }
                })
              } else {
                router.go(-1)
              }
            } else {
              router.go(-1)
            }
          }
        })
      } else {
        // app = new Vue({
        //   el: '#app',
        //   router,
        //   store,
        //   components: { App },
        //   template: '<App/>'
        // })
        api.addEventListener({
          name: 'supergoods'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=ali')
        })
        api.addEventListener({
          name: 'fromCart'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=cart')
        })
        api.addEventListener({
          name: 'aliBack'
        }, function (ret, err) {
          utils.storage.set('supergoods', [{}])
          router.push(ret.value.name)
        })
        let home = '/home'
        // 返回
        let now = false
        let time = null
        api.addEventListener({
          name: 'keyback'
        }, function (ret, err) {
          if (window.api && api.pageParam.backToWin) {
            // 当此window的backToWin为true，则直接返回上一个window
            api.closeWin()
            return
          }
          if (ret) {
            if (app.$route.path === home || app.$route.path === '/wechatLogin') {
              clearInterval(time)
              if (now) {
                now = false
                api.closeWidget({
                  silent: true
                })
              } else {
                now = true
                api.toast({
                  msg: '再按一次返回键退出',
                  duration: 2000,
                  location: 'bottom'
                })
                time = setTimeout(() => {
                  now = false
                }, 1000)
              }
              // 如果是内页则执行路由返回操作
            } else if (app.$route.path === '/videoDetail') {
              let browser = api.require('webBrowser')
              browser.historyBack(
                function (ret, err) {
                  if (!ret.status) {
                    browser.closeView()
                    router.go(-1)
                  }
                }
              )
            } else if (app.$route.path === '/supergoods') {
              if (app.$route.query.from === 'ali') {
                router.go(-1)
                api.openWin({
                  name: 'aliWin',
                  animation: {
                    type: 'push',
                    subType: 'from_left',
                    duration: 300
                  }
                })
              } else if (app.$route.query.from === 'cart') {
                router.go(-1)
                api.openWin({
                  name: 'cartWin',
                  animation: {
                    type: 'push',
                    subType: 'from_left',
                    duration: 300
                  }
                })
              } else {
                router.go(-1)
              }
            } else {
              router.go(-1)
            }
          }
        })
        // setTimeout(() => {
        //   api.removeLaunchView({
        //     animation: {
        //       type: 'fade',
        //       duration: 500
        //     }
        //   })
        // }, 1000)
      }
      // Vue.$vux.toast.show({
      //   type: 'text',
      //   text: '自定义出错',
      //   time: 1000,
      //   position: 'middle'
      // })
    })
  }
  getDesign()
}
