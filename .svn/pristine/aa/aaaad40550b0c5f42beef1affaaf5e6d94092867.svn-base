import {formatDate} from './data'
import * as utils from '../utils'
export default {
  install (Vue, options) {
    Vue.prototype.jumpLink = function (link) {
      if (typeof link === 'string') {
        link = JSON.parse(link)
      }
      if (link) {
        if (link.type == 0) {
          // type:0 vue内打开指定路由
          if (link.url == '/videoHome' || link.url == '/videoList') {
            if (this.$bizId == 4) {
              // 这个商户进老的共享影视,因为他有专属定制开发
              link.url = '/videoList'
            } else {
              // 其余商户进新的共享影视
              link.url = '/videoHome'
            }
          }
          if (link.url == '/mall/grade' && !utils.storage.get('isDisUser')) {
            // 当后台配置的是代理中心。需要根据用户是否是代理来跳转至不同页面
            link.url = '/mall/distributor'
          }
          if (link.url.indexOf('/diy') >= 0 && options.router.history.current.name == 'diy') {
            /*
            * TODO 现在是每次在diy页面中打开diy页面，都会创建新路由。后续可以考虑实现“先使用老的diy路由，如果不够用，再创建新的”
            * */
            // 当从/diy 页面进入 /diy 页面时, 动态添加新路由使用diy组件
            let diyRouteNum = 0
            let children = options.router.options.routes[0].children
            // 计算已有多少个使用diy组件的路由
            for (let i = 0, len = children.length; i < len; i++) {
              if (children[i].path.indexOf('/diy') >= 0) {
                diyRouteNum++
              }
            }
            options.router.addRoutes([{ // 插入路由
              name: 'diy' + diyRouteNum,
              path: '/diy' + diyRouteNum,
              component: resolve => require(['@/pages/diy/'], resolve)
            }])
            link.url = link.url.replace('/diy', '/diy' + diyRouteNum)
          }
          options.router.push(link.url)
        } else if (link.type === 1 || link.type === '1') {
          let browser = api.require('webBrowser')
          browser.open({
            url: link.url,
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
        } else if (link.type === 2 || link.type === '2') {
          api.openWin({
            name: 'aliWin',
            url: 'widget://html/main.html',
            reload: true,
            pageParam: {
              url: link.url,
              back: 'home'
            },
            animation: {
              type: 'push',
              subType: 'from_right',
              duration: 300
            },
            bounces: false,
            slidBackEnabled: false,
            allowEdit: true
          })
        } else if (link.type === 3 || link.type === '3') {
          let aliBC = api.require('aliBC')
          aliBC.asyncInit({
          }, function (ret, err) {
            if (ret.status) {
              aliBC.showLogin(function (ret, err) {
                if (ret.status) {
                  api.openWin({
                    name: 'cartMain',
                    url: 'widget://html/cartmain.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: {
                      name: ret.nick,
                      avater: ret.avatarUrl
                    },
                    allowEdit: true
                  })
                } else {
                  Vue.toast.text(err.message)
                }
              })
            }
          })
        } else if (link.type === 4 || link.type === '4') {
          // 当要进入抖券时
          api.openWin({
            name: 'video_coupon',
            url: 'widget://html/video_coupon.html'
          })
        } else if (link.type == 5) {
          // 当要进入订单红包时
          api.openWin({
            name: 'order_red_bag',
            url: 'widget://html/order_red_bag/order_red_bag.html'
          })
        } else if (link.type == 6) {
          // 当要进入信用卡时
          api.openWin({
            name: 'credit_card_main_head',
            url: 'widget://html/credit_card/credit_card_main_head.html'
          })
        }
      }
    }
    Vue.prototype.jumpTo = function (path) {
      options.router.push(path)
    }
    Vue.prototype.replaceTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.goBack = function (path) {
      window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
    }
    Vue.prototype.hide = function () {
      this.$vux.toast.show({type: 'cancel', text: '功能即将开放，敬请期待'})
    }
    Vue.prototype.formatDate = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
    Vue.prototype.jumpTos = function (item) {
      switch (item.types) {
        case 'mallHomeDetail':
          if (item.goodsId !== '0' && item.goodsId) {
            options.router.push({'name': item.types, 'query': {'title': item.goodsId}})
          }
          break
        case 'mallSeller':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({'name': item.types, 'query': {'spid': item.shopsId}})
          }
          break
        case 'mallProductList':
          if (item.goodsCid !== '0' && item.goodsCid) {
            options.router.push({'name': item.types, 'query': {'id': item.goodsCid}})
          }
          break
        case 'mallCategory':
          if (item.shopsCid !== '0' && item.shopsCid) {
            options.router.push({'name': item.types, 'query': {'type': item.shopsCid, 'title': item.title}})
          }
          break
        case 'mallSecthList':
          if (item.shopsCid !== '0' && item.shopsCid) {
            options.router.push({'name': item.types, 'query': {'shopCid': item.shopsCid, 'title': item.title}})
          }
          break
        case 'mallUnderdetail':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({'name': item.types, 'query': {'spid': item.shopsId}})
          }
          break
        case 'mallCart':
          options.router.push({name: item.types})
          break
        case 'mallShopProductList':
          options.router.push({name: item.types})
          break
        case 'httpUrl':
          let browser = api.require('webBrowser')
          browser.open({
            url: item.link,
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
          break
        default:
          options.router.push(item.types)
      }
    }
  }
}
