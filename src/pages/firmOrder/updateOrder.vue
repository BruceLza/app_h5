<template>
  <div id="add-site">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      修改地址
    </x-header>
    <div class="site-body">
      <div class="details">
        <div class="one">
          <!--<img src="../../assets/img/my/shouhuoren.png" alt="">-->
          <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人：</span>
          <input type="text" placeholder="请输入收货人姓名" v-model="userName">
        </div>
        <div class="one">
          <!--<img src="../../assets/img/my/shoujihaoma.png" alt="">-->
          <span>手机号码：</span>
          <input type="text" placeholder="请输入手机号" v-model="mobile">
        </div>
        <div class="one" style="justify-content: space-between">
          <!--<img src="../../assets/img/my/diqu.png" alt="">-->
          <span>所在地区：</span>
          <x-address @on-hide="logHide" @on-show="logShow" title="" v-model="value" :list="addressData"
                     @on-shadow-change="onShadowChange" placeholder="请选择地址" :show.sync="showAddress" raw-value></x-address>
        </div>
        <div class="one" style="border:none">
          <span>详细地址：</span>
        </div>
        <div class="two">
          <textarea name="site" v-model="address" id="" cols="42" rows="3" placeholder="街道、街牌号等"></textarea>
        </div>
      </div>
      <div class="change">
        <i class="iconfont icon-roundcheckfill" @click="checkdefault" :style="{'color' : status === '1' ? '#fc3357' : '#a1a1a1'}"></i>
        <span>设为默认地址</span>
      </div>
      <div class="confirm" @click="submit">
        <button>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
// import './my.less'
import { XHeader, XAddress, ChinaAddressV4Data } from 'vux'
import * as apiHttp from '../../api/index'
import address from '../../plugin/address'
export default {
  name: 'address1',
  components: {
    XHeader,
    XAddress,
    ChinaAddressV4Data
  },
  data () {
    return {
      status: this.$route.query ? this.$route.query.isdefault : '',
      value: this.$route.query ? [this.$route.query.province, this.$route.query.city, this.$route.query.district] : [],
      addressAll: [],
      address: this.$route.query ? this.$route.query.address : '',
      addressData: address,
      showAddress: false,
      userName: this.$route.query ? this.$route.query.username : '',
      mobile: this.$route.query ? this.$route.query.mobile : ''
    }
  },
  mounted: function () {
    // 删除
  },
  methods: {
    doShowAddress () {
      this.showAddress = true
      setTimeout(() => {
        this.showAddress = false
      }, 2000)
    },
    onShadowChange (ids, names) {
      console.log(names)
      this.addressAll = names
      this.value = names
    },
    checkdefault () {
      if (this.status === '1') {
        this.status = '0'
      } else {
        this.status = '1'
      }
    },
    submit () {
      var that = this
      let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      if (!this.mobile) {
        this.$vux.toast.text('手机号不能为空')
        return
      }
      if (!reg.test(this.mobile)) {
        this.$vux.toast.text('手机号格式不对')
        return
      }
      if (this.value.length === 0) {
        this.$vux.toast.text('请选择地址')
        return
      }
      if (this.address.length === 0) {
        this.$vux.toast.text('请输入详细地址')
        return
      }
      this.$http.post('/amoy/user/address-post', {username:that.userName, mobile:that.mobile, province:that.addressAll[0], city:that.addressAll[1], district:that.addressAll[2], address:that.address, isdefault:that.status, type:'save', id:that.$route.query.id}, true).then(response => {
        if (response.code === 0) {
          this.$vux.toast.text(response.msg)
          setTimeout(() => {
            // this.$router.push({name: 'homeFirmOrder'})
            this.$router.go(-1)
          })
        } else {
          this.$vux.toast.text(response.msg)
        }
      })
      /* apiHttp.updateAdress(this.userName, this.mobile, this.addressAll[0], this.addressAll[1], this.addressAll[2], this.address, this.status, 'save', this.$route.query.id).then(response => {
        if (response.code === 0) {
          this.$vux.toast.text(response.msg)
          setTimeout(() => {
            this.$router.push({name: 'homeFirmOrder'})
          })
        } else {
          this.$vux.toast.text(response.msg)
        }
      }) */
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    }
  }
}
</script>

<style scoped lang="less">
/deep/.icon-roundcheckfill{
  // background: linear-gradient(270deg,rgba(246,61,54,1),rgba(248,123,100,1));
}
/deep/.confirm{
  display: flex;
  justify-content: center;
  button {
    width: 5.2rem;
    height: 0.88rem;
    margin: auto;
    border-radius: 0.44rem;
    background: linear-gradient(270deg,rgba(246,61,54,1),rgba(248,123,100,1));
  }
}
</style>
