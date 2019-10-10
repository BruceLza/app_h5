<template>
  <div class="ticket">
    <x-header :left-options="{showBack: false}"><a slot="left"  class="backBox">
      <i class="iconfont icon-back" @click="goBack()"></i><span class="closeWeb" @click="closeWeb">关闭</span></a>
      {{title}}
    </x-header>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'ticket',
  components: {
  },
  data () {
    return {
      url: this.$route.query.url,
      title: this.$route.query.title
    }
  },
  methods: {
    closeWeb () {
      var browser = api.require('webBrowser')
      browser.closeView()
      this.$router.go(-1)
    },
    goBack () {
      let that = this
      let browser = api.require('webBrowser')
      browser.historyBack(
        function (ret, err) {
          if (!ret.status) {
            browser.closeView()
            that.$router.go(-1)
          }
        }
      )
    }
  },
  activated () {
  },
  mounted() {
    var url = this.$route.query.url
    let h = (document.documentElement.clientWidth / 7.5) * 0.88
    let y = h + api.safeArea.top
    let browser = api.require('webBrowser')
    browser.openView({
      name: 'ticket',
      url: this.$route.query.url,
      rect: {
        x: 0,
        y: parseInt(y),
        w: 'auto',
        h: 'auto'
      }
    }, function (ret, err) {
    })
    // var name = this.$route.query.title
//     let browser = api.require('webBrowser')
//     browser.open({
//       url: url,
//       titleBar: {
//         textColor: '#333',
//         bg: '#fff'
//       }
//     })
  }
}
</script>
<style lang="less">
  .ticket{
    .weui-cells{
      margin-top: 0;
      font-size: 12px;
      .weui-cell{
        padding: 10px 15px !important;
      }
      .weui-cell:before{
        right: 15px;
      }
      .weui-input{
        font-size: 14px;
        color: #999;
      }
      .weui-label{
        font-size: 14px;
      }
      /*.weui-cell__bd{*/
      /*display: flex;*/
      /*}*/
    }
    .weui-cells:after,.weui-cells:before{
      left: 15px;
      right: 15px;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.4);
    }
    .weui-actionsheet_toggle{
      bottom: 30px;
      width: 90%;
      left: 5%;
      background: none;
      .weui-actionsheet__menu{
        border-radius: 5px;
      }
      .weui-actionsheet__action{
        border-radius: 5px;
      }
      .vux-actionsheet-menu-default{
        color: #666;
        font-size: .28rem;
      }
      .weui-actionsheet__cell{
        font-size: .3rem;
      }
    }
    .vux-header{
      .backBox{
        display: flex !important;
        align-items: center;
        .closeWeb{
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .vux-header-right{
        color: #666;
      }
    }
  }
</style>
