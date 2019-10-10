import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import routers from './router'
Vue.use(Router)

let router = new Router({
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

const whiteList = ['login', 'about', 'register', 'mailregister', 'newIndex', 'forget', 'mailforget', 'mobileLogin', 'wechatLogin', 'guide', 'wxbind', 'home', 'sort', 'super', 'my', 'my1', 'my2', 'my3', 'my4', 'materials', 'materials1', 'materials2', 'supergoods', 'supergoods2', 'search', 'results', 'list', 'fastrob', 'personSpeak', 'personArticle', 'discounts', 'circle', 'otherclassify', 'classify', 'liveBroadcast', 'dayingList', 'daying', 'comment', 'mallHome', 'mallHomeDetail', 'mallBusiness', 'mallSeller', 'mallUnderShop', 'mallUnderdetail', 'mallProductList', 'mallShopProductList', 'mallCategory', 'mallSecthList', 'mallNews', 'mallSearch', 'mallArticleList', 'mallArticleInfo', 'select']
router.beforeEach(function (to, from, next) {
  var firstPage = ['/home', '/newIndex', '/sort', '/fastrobNew', '/materials', '/materials2', '/super', '/materials1', '/my', '/newIndex', '/mall/home', '/mall/business', '/mall/underShop', '/mall/my', '/mall/cart', '/upgradeOperator']
  var currentRoute = to.path
  if (firstPage.indexOf(currentRoute) > -1) {
    window.canRightSlipBack = false
  } else {
    window.canRightSlipBack = true
  }
  // 登录拦截
  store.commit('hide')
  if (!config.isMallShop && currentRoute.indexOf('/mall/home') != -1) {
    // 当前往线上商城首页并无权进入时
    alert('此安装包暂无权限进入商城')
    return
  }
  if (!config.isMallUnderShop && currentRoute.indexOf('/mall/underShop') != -1) {
    // 当前往线下商城首页并无权进入时
    alert('此安装包暂无权限进入线下商城')
    return
  }
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/wechatLogin'
    })
  } else {
    next()
  }
})

export default router
