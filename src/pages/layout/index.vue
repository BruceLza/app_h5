<template>
  <view-box ref="viewBox" id="layout" :body-padding-top="$route.meta.isShowHead || $route.meta.isShowSearch ? '.88rem' : '0'" :body-padding-bottom="$route.meta.isShowTab ? h : '0'">
    <x-header
      v-show="$route.meta.isShowHead"
      slot="header"
      :left-options="{showBack: false}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    >
      <a v-show="!$route.meta.goBack" slot="left" @click="$route.meta.address ? jumpTo($route.meta.address) : goBack()" class="backBox"><i class="iconfont icon-back"></i></a>
      {{$route.query.title ? $route.query.title : $route.meta.title}}
    </x-header>
      <!--<keep-alive>-->
        <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
      <!--<transition :name='transitionName'  v-if="$route.meta.keepAlive">-->
        <!--<keep-alive>-->
          <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
        <!--</keep-alive>-->
      <!--</transition>-->
      <transition :name='transitionName'>
        <keep-alive  include="block,home,otherclassify,dayingList,daying,dayingShop,classify,sort,block,my,my1,my2,my3,binding,invite,pullNew,pullNewRule,sharePoster,materials,materials2,circle,list,select,super,results,personSpeak,personArticle,mallBusiness,wechatLogin,newIndex,classifyNew,otherclassifyNew,discounts">
        <router-view></router-view>
        </keep-alive>
      </transition>
    <div class="tabbarBox" id="tabbarBox" v-if="$store.state.global.footer" v-show="$route.meta.isShowTab" :style="{paddingBottom: bot + 'px',background:$store.state.global.footer.bgColor}">
      <template v-for="(item, key) of $store.state.global.footer.items">
        <div class="upTab" :key="key" @click="jumpLink(item.link)" v-if="item.style && item.style === '1'">
          <div class="tabbarIcon"  v-if="item.link && $route.path === item.link.url">
            <img :src="item.activeImg" alt="" >
          </div>
          <div  class="tabbarIcon" v-else>
            <img :src="item.img" alt="">
          </div>
        </div>
        <div class="tabbar"  :key="key"  @click="jumpLink(item.link)" v-else>
          <div class="tabbarIcon"  v-if="item.link && $route.path === item.link.url">
            <img :src="item.activeImg" alt="" >
          </div>
          <div  class="tabbarIcon" v-else>
            <img :src="item.img" alt="">
          </div>
          <p class="tabbarName" :style="{color: item.activeColor}" v-if="item.link && $route.path === item.link.url">{{item.text}}</p>
          <p class="tabbarName" :style="{color: item.color}" v-else>{{item.text}}</p>
        </div>
      </template>
    </div>
    <!--<tabbar slot="bottom" class="tabbar" ref="tabbar" id="tabbar" v-if="$store.state.global.footer" v-show="$route.meta.isShowTab" :style="{background:$store.state.global.footer.bgColor}">-->
      <!--<tabbar-item v-for="(item, key, index) of $store.state.global.footer.items" :key="key" :selected="$route.path === item.link.url" @click="test" v-if="item.link && ($store.state.global.footer.num - 1) >= index">-->
        <!--<img :src="item.img" alt="" slot="icon">-->
        <!--<img :src="item.activeImg" alt="" slot="icon-active">-->
        <!--<span slot="label" :style="{color: item.activeColor}" v-if="$route.path === item.link">{{item.text}}</span>-->
        <!--<span slot="label" :style="{color: item.color}" v-else>{{item.text}}</span>-->
      <!--</tabbar-item>-->
    <!--</tabbar>-->
    <div class="tabbarBox" id="tabbar1" ref="tabbar" v-if="$store.state.global.mallFooter" v-show="$route.meta.isShopShowTab && ($store.state.global.firstNav !== '/home' || $isMallShop)" :style="{paddingBottom: bot + 'px',background:$store.state.global.mallFooter.bgColor}">
      <template v-for="(item, key) of $store.state.global.mallFooter.items">
        <div class="upTab" :key="key" @click="jumpLink(item.link)" v-if="item.style && item.style === '1'">
          <div class="tabbarIcon"  v-if="item.link && $route.path === item.link.url">
            <img :src="item.activeImg" alt="" >
          </div>
          <div  class="tabbarIcon" v-else>
            <img :src="item.img" alt="">
          </div>
        </div>
        <div class="tabbar"  :key="key"  @click="jumpLink(item.link)" v-else>
          <div class="tabbarIcon"  v-if="item.link && $route.path === item.link.url">
            <img :src="item.activeImg" alt="" >
          </div>
          <div  class="tabbarIcon" v-else>
            <img :src="item.img" alt="">
          </div>
          <p class="tabbarName" :style="{color: item.activeColor}" v-if="item.link && $route.path === item.link">{{item.text}}</p>
          <p class="tabbarName" :style="{color: item.color}" v-else>{{item.text}}</p>
        </div>
      </template>
    </div>
  </view-box>
</template>

<script>
import '../../assets/js/api'
import { ViewBox, Tabbar, TabbarItem, XHeader } from 'vux'
export default {
  name: 'index',
  data () {
    return {
      h: (49 + Number(window.api && api.safeArea.bottom || 0)) + 'px',
      transitionName: '',
      pageName: ['home', 'my'],
      bot: window.api && api.safeArea.bottom || 0
    }
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XHeader
  },
  mounted () {
    if (window.api) {
      document.getElementById('tabbarBox') && (document.getElementById('tabbarBox').style.paddingBottom = api.safeArea.bottom + 'px')
      document.getElementById('tabbar1') && (document.getElementById('tabbar1').style.paddingBottom = api.safeArea.bottom + 'px')
    }
  },
  // 此段添加内容
  watch: {
    '$route' (to, from) {
      if (from.meta.routerZindex > to.meta.routerZindex) {
        this.transitionName = 'slide-right'
      } else if (from.meta.routerZindex < to.meta.routerZindex) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-none'
      }
    }
  }
}
</script>

<style scoped lang="less">
  #tabbar{
    height: 49px;
  }
  #tabbar1{
    height: 49px;
  }
  .router-fade-enter-active, .router-fade-leave-active {
    position: absolute;
    width: 100%;
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .weui-tabbar{
    background: #fff;
  }
  .weui-tabbar:before{
    border-top: 1px solid #e0dee6;
  }
</style>
<style lang="less">
  #layout{
    .weui-tabbar__item{
      padding-top: 7px;
    }
    .vux-header{
      .vux-header-left{
        left: 0;
        top: 0;
        .backBox{
          display: block;
          height: 0.88rem;
          line-height: .88rem;
          padding: 0 .2rem;
        }
      }
    }
    .tabbarBox{
      z-index: 2000;
      box-shadow: 0 4px 8px #525252;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 49px;
      padding-top: 5px;
      box-sizing: content-box;
      width: 100%;
      display: flex;
      .tabbar{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tabbarIcon{
          width: 23px;
          height: 23px;
          display: inline-block;
          margin-bottom: 1px;
          img{
            width: 23px;
            height: 23px;
            display: inline-block;
          }
        }
        .tabbarName{
          font-size: 12px;
          color: #999;
          line-height: 1.8;
          text-align: center;
        }
      }
      .upTab{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tabbarIcon{
          background: #fff;
          margin-top: -0.5rem;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
