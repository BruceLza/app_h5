<template>
    <div class="index">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>{{title}}
      </x-header>
      <div class="contentBox">
        <template v-for="item of setDiyContent">
          <component  v-bind:is="item.name" :data="item.params" :key="item.id"></component>
        </template>
        <!--<div class="bodyCon">-->
          <!--<template v-for="item of setDiyContent">-->
            <!--<component  v-bind:is="item.name" :data="item.params" :key="item.id"></component>-->
          <!--</template>-->
        <!--</div>-->
        <!--<div class="tabbarBox" id="tabbar1" ref="tabbar" v-if="setDiyFooter"  :style="{background:setDiyFooter.bgColor}">-->
          <!--<template v-for="(item, key) of setDiyFooter.items">-->
            <!--<div class="upTab" :key="key" @click="jumpLink(item.link)" v-if="item.style && item.style === '1'">-->
              <!--<div class="tabbarIcon"  v-if="item.link && $route.path === item.link.url">-->
                <!--<img :src="item.activeImg" alt="" >-->
              <!--</div>-->
              <!--<div  class="tabbarIcon" v-else>-->
                <!--<img :src="item.img" alt="">-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="tabbar"  :key="key"  @click="jumpLink(item.link)" v-else>-->
              <!--<div class="tabbarIcon"  v-if="item.link && $route.path === item.link.url">-->
                <!--<img :src="item.activeImg" alt="" >-->
              <!--</div>-->
              <!--<div  class="tabbarIcon" v-else>-->
                <!--<img :src="item.img" alt="">-->
              <!--</div>-->
              <!--<p class="tabbarName" :style="{color: item.activeColor}" v-if="item.link && $route.path === item.link">{{item.text}}</p>-->
              <!--<p class="tabbarName" :style="{color: item.color}" v-else>{{item.text}}</p>-->
            <!--</div>-->
          <!--</template>-->
        <!--</div>-->
      </div>
    </div>
</template>

<script>
import EditSlide from '../../components/EditSlide'
import EditNav from '../../components/EditNav'
import EditNavSlide from '../../components/EditNavSlide'
import EditHeader from '../../components/EditHeader'
import EditBlank from '../../components/EditBlank'
import EditRichText from '../../components/EditRichText'
import EditText from '../../components/EditText'
import EditImg from '../../components/EditImg'
import EditCube from '../../components/EditCube'
import EditGoodsSlide from '../../components/EditGoodsSlide'
import EditNavGroup from '../../components/EditNavGroup'
import EditOrder from '../../components/EditOrder'
export default {
  name: 'diy',
  components: {
    EditSlide,
    EditNav,
    EditNavSlide,
    EditHeader,
    EditBlank,
    EditRichText,
    EditImg,
    EditCube,
    EditText,
    EditGoodsSlide,
    EditNavGroup,
    EditOrder
  },
  data () {
    return {
      title: this.$route.query.title,
      id: this.$route.query.id,
      setDiyFooter: '',
      setDiyContent: ''
    }
  },
  methods: {
    getInfo () {
      this.$http.get('/amoy/app/diy', {
        id: this.id
      }, true).then(res => {
        if (res.data.footer) {
          this.setDiyFooter = JSON.parse(res.data.footer)
        }
        if (res.data.content) {
          this.setDiyContent = JSON.parse(res.data.content)
        }
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
  .index{
    height: 100%;
    position: relative;
    background: #fff;
  }
  .contentBox{
    position: absolute;
    left: 0;
    right: 0;
    top: 0.88rem;
    bottom: 0;
    overflow-y: auto;
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
</style>
