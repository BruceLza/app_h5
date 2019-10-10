<template>
  <div id="rightsConter" class="rightsConter" >
    <div class="headerConBox">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <p class="title">爆品专区</p>
      </div>
    </div>
    <div class="pageContent">
      <div v-if="bannerData && bannerData.BANNER_IS_SHOW == 1" class="bannerBox">
        <img class="banner" :src="bannerData.BANNER_CONFIG" alt="">
      </div>
     <!-- <div class="operatorAgency">
        <div class="itemBox">
          <tab :line-width="1" custom-bar-width="1.33rem" default-color="#333333" v-model="type" class="resultTab" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
            <tab-item @on-item-click="resetTab">代理权益</tab-item>
            <tab-item @on-item-click="resetTab" v-if="operatorBagTab">运营商权益</tab-item>
          </tab>
        </div>
        <div class="rightsDescBox" v-show="type == 0">
          <div class="titleBox">
            <div class="titleItemHeader">
              <span>专享权益</span>
              <p>购买礼包立享</p>
            </div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop2.png" alt=""><span class="titleContenText">购物奖励</span></div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop1.png" alt=""><span class="titleContenText">分享奖励</span></div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop4.png" alt=""><span class="titleContenText">直接会员出单</span></div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop3.png" alt=""><span class="titleContenText">间接会员出单</span></div>
          </div>
          <div class="contentBox" v-show="userTypeData">
            <swiper ref="smallImages1" :options="swiperOption1" class="swiper">
              <swiper-slide v-if="userTypeData" v-for="(items,index) in userTypeData" :key="'dlititle'+index">
                <div class="contentItemBox">
                  <div class="titleItem">
                    <span>{{items.level_title}}</span>
                    <p>最高返现</p>
                  </div>
                  <div class="itemContentBox" v-for="(item,index) in items.remark" :key="'dlione'+index">
                    <div class="itemcontent" :class="{itemcontentBorder: true}">{{item}}%</div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="descSolid"></div> 
        </div>
        <!--<div class="rightsDescBox" v-show="type == 1">
          <div class="titleBox">
            <div class="titleItemHeader">
              <span>专享权益</span>
              <p>购买礼包立享</p>
            </div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop2.png" alt=""><span class="titleContenText">购物奖励</span></div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop1.png" alt=""><span class="titleContenText">分享奖励</span></div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop4.png" alt=""><span class="titleContenText">直接会员出单</span></div>
            <div class="itemTitle"><img class="titleIcon" src="../../assets/img/giftBag/shop3.png" alt=""><span class="titleContenText">间接会员出单</span></div>
          </div>
          <div class="contentBox" v-show="operatorData">
            <swiper ref="smallImages1" :options="swiperOption1" class="swiper">
              <swiper-slide v-if="operatorData" v-for="(items,index) in operatorData" :key="'dlititle'+index">
                <div class="contentItemBox">
                  <div class="titleItem">
                    <span>{{items.level_title}}</span>
                    <p>最高返现</p>
                  </div>
                  <div class="itemContentBox" v-for="(item,index) in items.remark" :key="'dlione'+index">
                    <div class="itemcontent" :class="{itemcontentBorder: true}">{{item}}%</div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div v-if="splendidLList.length > 0" class="splendidBox">
          <div class="splendidTitle">
            <i class="titleIcon"></i>
            <span class="titleText">更多精彩权益</span>
          </div>
          <div class="iconBox">
            <div class="iconItem" v-for="(item, index) in splendidLList" :key="'splendid'+index">
              <img class="iconImg" :src="item.thumb" alt="">
              <p class="itemTitle">{{item.title}}</p>
              <span class="itemDesc">{{item.remark}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="upgradeBox" v-show="type == 0 && agencyData">
        <div class="upgradeTitle">
          <i class="upgradeTitIcon"></i>
          <span class="upTitTex">升级要求</span>
        </div>
        <div class="upgraderItemBox" v-show="agencyData">
          <swiper ref="smallImages" :options="swiperOption" class="swiper">
            <swiper-slide v-for="(item, index) in agencyData" :key = "'agencyDesc'+index" v-if="agencyData && item.status ==='1' && item.upInfo.model.is_show === '1'">
              <div class="upgraderItem">
                <div class="title">{{item.title}}</div>
                <div class="descBxo">
                  <div class="descItem">
                    <i class="descItemIcon"></i>
                    <p class="descText" v-html="item.descs">
                    </p>
                  </div>
                  <div class="descItem" v-if="item.remark">
                    <i class="descItemIcon"></i>
                    <p class="descText" v-html="item.remark">
                    </p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="upgradeBox" v-if="type == 1 && data">
        <div class="upgradeTitle" v-if="data.is_show.is_user == 1 || data.is_show.is_team == 1">
          <i class="upgradeTitIcon"></i>
          <span class="upTitTex">升级要求</span>
        </div>
        <div class="upOperatorBox" v-if="data.is_show">
           <div>
            <p class="ways">邀请好友</p>
            <div class="progressBox progressBox1">
              <x-progress :percent="( 5/ 10) * 100 > 100 ? 100 : ( 5 / 10) * 100" :show-cancel="false"></x-progress>
              <p v-if="true">10元</p>
            </div>
            <p class="present">自购佣金在10块钱以上：</p>
          </div>
          <div class="attentionDesc">*注：有效会员定义：必须近4个月购买或分享一单以上</div>
          <div class="upBton">邀请好友加入我的团队</div>
          <div v-if="data.is_show.is_user === '1'">
            <p class="ways">邀请好友</p>
            <div class="progressBox">
              <x-progress :percent="(data.requires.direct.num / data.requires.direct.require_num) * 100 > 100 ? 100 : (data.requires.direct.num / data.requires.direct.require_num) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.requires.direct">{{data.requires.direct.require_num}}人</p>
            </div>
            <p class="present">当前有效直属会员：{{data.requires.direct.num}}人</p>
            <div class="progressBox progressBox1">
              <x-progress :percent="(data.requires.non_direct.num / data.requires.non_direct.require_num) * 100 > 100 ? 100 : (data.requires.non_direct.num / data.requires.non_direct.require_num) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.requires.non_direct">{{data.requires.non_direct.require_num}}人</p>
            </div>
            <p class="present">当前有效非直属会员：{{data.requires.non_direct.num}}人</p>
            <div class="progressBox progressBox1" v-if="data.requires.person_price && data.requires.person_price.require_price > 0">
              <x-progress :percent="(data.requires.person_price.price / data.requires.person_price.require_price) * 100 > 100 ? 100 : (data.requires.person_price.price / data.requires.person_price.require_price) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.requires.person_price">{{data.requires.person_price.require_price}}元</p>
            </div>
            <p class="present" v-if="data.requires.person_price && data.requires.person_price.require_price && $bizId === 4">当前团队预估收益：{{data.requires.person_price.price}}元</p>
            <p class="present" v-else-if="data.requires.person_price && data.requires.person_price.require_price">当前个人预估收益：{{data.requires.person_price.price}}元</p>
            <p class="attentionDesc">*注：有效会员定义：{{data.requires.note}}</p>
            <div class="upBton" @click="jumpTo('invite')">邀请好友</div>
          </div>
          <div v-if="data.is_show.is_team === '1'">
            <p class="ways">订单收益</p>
            <div class="progressBox">
              <x-progress :percent="(data.teamInfo.orderNum.num / data.teamInfo.orderNum.require_num) * 100 > 100 ? 100 : (data.teamInfo.orderNum.num / data.teamInfo.orderNum.require_num) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.teamInfo.orderNum">{{data.teamInfo.orderNum.require_num}}单</p>
            </div>
            <p class="present">团队总订单数量：{{data.teamInfo.orderNum.num}}单</p>
            <div class="progressBox progressBox1">
              <x-progress :percent="(data.teamInfo.creditPrice.price / data.teamInfo.creditPrice.require_price) * 100 > 100 ? 100 : (data.teamInfo.creditPrice.price / data.teamInfo.creditPrice.require_price) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.teamInfo.creditPrice">{{data.teamInfo.creditPrice.require_price}}元</p>
            </div>
            <p class="present" v-if="$bizId === 4">当前团队结算收益：{{data.teamInfo.creditPrice.price}}元</p>
            <p class="present" v-else>个人累计收益：{{data.teamInfo.creditPrice.price}}元</p>
            <p class="attentionDesc">*注：有效会员定义：{{data.teamInfo.note}}</p>
            <div class="upBton" @click="jumpTo('home')">去下单</div>
          </div>
        </div>
      </div>-->
      <!-- 代理礼包-->
      <div class="shopBox" v-if="type == 0 && agencyBag">
        <div class="spopTitle">
          <!-- <img class="titLeftIcon" src="../../assets/img/giftBag/liwu.png" alt="">
          <span class="titText">购买礼包立享权益</span>
          <img class="titRigIcon" src="../../assets/img/giftBag/liwu.png" alt=""> -->
          <img class="shopTitleImg" src="../../assets/img/giftBag/shopTitle1.png" alt="">
        </div>
        <div class="itemBox">
          <tab :line-width="1" custom-bar-width="1.33rem" default-color="#333333" v-model="typeOne" class="resultTab" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
            <tab-item @on-item-click="resetTabOne(item.id)" v-for="(item,index) in agencyBagTab" :key="'dlilibao'+index">{{item.title}}</tab-item>
          </tab>
        </div>
        <div class="shopItemBox">
          <div class="shopItem" v-for="(item, index) in agencyGoodsList" :key="'shop'+index" @click="jumpTo('/giftBag?id=' + item.id)">
            <div class="imgBox">
              <div class="shopImg" :style="{backgroundImage: 'url('+item.img[0]+')'}"></div>
            </div>
            <p class="itemTitle"><img class="titIcon" src="../../assets/img/giftBag/liwu.png" alt="" v-show="false"><span>{{item.title}}</span></p>
            <div class="picBox"><span class="picIcon">¥</span><span class="pic">{{item.price}}</span></div>
          </div>
        </div>
      </div>
      <!-- 运营礼包 -->
      <div class="shopBox" v-if="type == 1 && operatorBag">
        <div class="spopTitle">
          <!-- <img class="titLeftIcon" src="../../assets/img/giftBag/liwu.png" alt="">
          <span class="titText">购买礼包立享权益</span>
          <img class="titRigIcon" src="../../assets/img/giftBag/liwu.png" alt=""> -->
          <img class="shopTitleImg" src="../../assets/img/giftBag/shopTitle.png" alt="">
        </div>
        <div class="itemBox">
          <tab :line-width="1" custom-bar-width="1.33rem" default-color="#333333" v-model="typeTwo" class="resultTab" @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
            <tab-item @on-item-click="resetTabTwo(item.id)" v-for="(item,index) in operatorBagTab" :key="'yyinglibao'+index">{{item.title}}</tab-item>
          </tab>
        </div>
        <div class="shopItemBox">
          <div class="shopItem" v-for="(item, index) in agencyGoodsList" :key="'shop'+index" @click="jumpTo('/giftBag?id=' + item.id)">
            <div class="imgBox">
              <div class="shopImg" :style="{backgroundImage: 'url('+item.img[0]+')'}"></div>
              <p class="imgDesc" v-if="item.type == 1">送30天运营权益</p>
              <p class="imgDesc" v-else-if="item.type == 2">送365天运营权益</p>
              <p class="imgDesc" v-else-if="item.type == 3">送永久运营权益</p>
            </div>
            <p class="itemTitle"><img class="titIcon" src="../../assets/img/giftBag/liwu.png" alt="" v-show="false"><span>{{item.title}}</span></p>
            <div class="picBox"><span class="picIcon">¥</span><span class="pic">{{item.price}}</span></div>
          </div>
        </div>
      </div>
      <!-- 运营商付费升级 -->
      <div class="moneyShopBox" v-if="type == 1 && operatorMoney && data">
        <div v-if="data && data.is_show.is_buy == 1">
          <p class="ways">付费升级</p>
          <div class="way" v-if="data.buyInfo.month_price !== '0'" @click="selectpay('month')" :style="{background: $store.state.global.theme.thirdColor}"><p>月付<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.month_price}}</span>元</p><span class="selectBox"  :class="{selected: payWays == 'month'}"></span></div>
          <div class="way" v-if="data.buyInfo.year_price !== '0'" @click="selectpay('year')" :style="{background: $store.state.global.theme.thirdColor}"><p>年付<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.year_price}}</span>元</p><span class="selectBox" :class="{selected: payWays == 'year'}"></span></div>
          <div class="way" v-if="data.buyInfo.forever !== '0' && $bizId === 6"  @click="selectpay('forever')" :style="{background: $store.state.global.theme.thirdColor}"><p>铂金<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.forever}}</span>元</p><span class="selectBox"  :class="{selected: payWays == 'forever'}"></span></div>
          <div class="way" v-else-if="data.buyInfo.forever !== '0'"  @click="selectpay('forever')" :style="{background: $store.state.global.theme.thirdColor}"><p>永久<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.forever}}</span>元</p><span class="selectBox"  :class="{selected: payWays == 'forever'}"></span></div>
          <div class="invite" @click="toPay">去付费</div>
        </div>
      </div>
      <!-- 代理付钱升级 -->
      <div class="moneyAgencyBox" v-if="type == 0 && agencyMoney">
        <div>
          <p class="ways">付费升级</p>
          <div class="way" v-for="(item, index) in agencyData" :key = "'moneyagency'+index" v-if="item.status ==='1' && item.upInfo.model.is_show === '1'" @click="upgrade(item.id,index)" :style="{background: $store.state.global.theme.thirdColor}"><p>{{item.title}}付<span :style="{color: $store.state.global.theme.mainColor}" >{{item.upInfo.charge.price}}</span>元</p><span class="selectBox" :class="{selected: moneyagencyActive == index}"></span></div>
          <div class="invite" @click="toPay">去付费</div>
        </div>
      </div>
    </div>
    <div class="waysBox" v-if="dialog">
      <div class="dialog" @click="dialog = false"></div>
      <div class="way">
        <p class="t">选择支付方式</p>
        <p class="ways" @click="getWay('wxpay')"><img src="../../assets/img/my/wx.png" alt="">微信支付</p>
        <p @click="getWay('alipay')"><img src="../../assets/img/my/zfb.png" alt="">支付宝支付</p>
        <i class="iconfont icon-close" @click="dialog = false"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import MescrollVue from 'mescroll.js/mescroll.vue'
import {Tab, TabItem} from 'vux'
import { XProgress } from 'vux'
import * as utils from '../../utils'
export default {
  name: 'rightsConter',
  components: {
    Tab,
    TabItem,
    MescrollVue,
    swiper,
    swiperSlide,
    XProgress
  },
  data () {
    return {
      agencyGoodsList: [],
      shopGoodsList: [],
      splendidLList: '',
      bannerData: '',
      type: 0,
      typeOne: 0,
      typeTwo: 0,
      data: '',
      agencyData: '',
      payWays: '',
      dialog: false,
      moneyagencyActive: '',
      moneyagencyId: '',
      operatorData: '',
      userTypeData: '',
      agencyBagTab: [],
      operatorBagTab: [],
      agencyBag: false,
      agencyMoney: false,
      operatorBag: false,
      operatorMoney: false,
      operator: {one:[],two:[],three:[],four:[]},/* 运营商 */
      userType: {one:[],two:[],three:[],four:[]},/* 代理 */
      tableHeadList: [{name: '铜牌',desc: '最高返现'},{name: '铜牌',desc: '最高返现'},{name: '铜牌',desc: '最高返现'}],
      swiperOption: {
          pagination: { el: ".swiper-pagination"},
          paginationClickable :true,
          loop: false,
          slidesPerView : 1.9,
          on: {
            transitionEnd: () => {
              if (this.$refs.smallImages.swiper) {
                this.index = this.$refs.smallImages.swiper.realIndex
              }
            },
            sliderMove: function (event) {
              window.canRightSlipBack = false
            },
            touchEnd: function (event) {
              setTimeout(() => {
                window.canRightSlipBack = true
              }, 600)
            }
          }
      },
      swiperOption1: {
          pagination: { el: ".swiper-pagination"},
          paginationClickable :true,
          loop: false,
          slidesPerView : 2.9,
          on: {
            transitionEnd: () => {
              if (this.$refs.smallImages1.swiper) {
                this.index = this.$refs.smallImages.swiper.realIndex
              }
            },
            sliderMove: function (event) {
              window.canRightSlipBack = false
            },
            touchEnd: function (event) {
              setTimeout(() => {
                window.canRightSlipBack = true
              }, 600)
            }
          }
      },
    }
  },
  methods: {
    getInfo(id) {
      var that = this
      this.$http.post('/amoy/user/manager',{ "id": id }, true).then(res => {
        this.data = res.data
      })
    },
    getSplendidList() {
      var that = this
      this.$http.get('/amoy/user/get-rights-list',{ type: this.type+1 }, true).then(res => {
        if(res.code == 0) {
          this.splendidLList = res.data
        }
      })
    },
    getBanner() {
      var that = this
      this.$http.get('/amoy/user/get-rights-config',{}, true).then(res => {
        if(res.code == 0) {
          this.bannerData = res.data
        }
      })
    },
    getUserRights() {
      var that = this
      this.$http.get('/amoy/user/user-rights',{}, true).then(res => {
        that.operatorData = res.data.operator
        that.userTypeData = res.data.userType
        for(let i = 0; i < res.data.userType.length; i++){
          that.userType.one.push(res.data.userType[i].remark[0])
          that.userType.two.push(res.data.userType[i].remark[1])
          that.userType.three.push(res.data.userType[i].remark[2])
          that.userType.four.push(res.data.userType[i].remark[3])
        }
        for(let m = 0; m < res.data.operator.length; m++){
          that.operator.one.push(res.data.operator[m].remark[0])
          that.operator.two.push(res.data.operator[m].remark[1])
          that.operator.three.push(res.data.operator[m].remark[2])
          that.operator.four.push(res.data.operator[m].remark[3])
        }
      })
    },
    getOperatorInfo() {
      var that = this
      this.$http.get('/amoy/user/operator-info',{}, true).then(res => {
        that.operatorBagTab = res.data.operatorList
        var operatorType = that.operatorBagTab[0].upInfo.show.condition
        for (let n = 0; n < that.operatorBagTab.length; n++){
          if(operatorType != that.operatorBagTab[n].upInfo.show.condition) {
            operatorType = 3
            break;
          }
        }
        if(operatorType == 1) {
          that.operatorMoney = true
        } else if(operatorType == 2) {
          that.operatorBag = true
        } else if(operatorType == 3) {
          that.operatorBag = false
          that.operatorMoney = false
        }
        that.getInfo(res.data.current)
      })
    },
    getlist () {
      var that = this
      this.$http.get('/amoy/user/partner', {}, true).then((res) => {
        if (res.code === 0) {
          this.agencyData = res.data
          for(let i = 0; i < res.data.length; i++) {
            // item.status ==='1' && item.upInfo.model.is_show === '1'
            if(res.data[i].status ==='1' && res.data[i].upInfo.model.is_show === '1') {
              that.agencyBagTab.push(res.data[i])
            }
          }
          var agencyType = that.agencyBagTab[0].upInfo.charge.type
          for (let n = 0; n < that.agencyBagTab.length; n++){
            if(agencyType != that.agencyBagTab[n].upInfo.charge.type) {
              agencyType = 3
              break;
            }
          }
          if(agencyType == 1) {
            that.agencyMoney = true
          } else if(agencyType == 2) {
            that.agencyBag = true
          } else if(agencyType == 3) {
            that.agencyBag = false
            that.agencyMoney = false
          }
          that.resetTabOne(that.agencyBagTab[0].id)
        }
      })
    },
    getUpgradeGoods(id) {
      var that = this
      this.$http.get('/amoy/user/upgrade-goods', {level: id}, true).then(res => {
        if(res.code == 0){
           that.agencyGoodsList = res.data
        }
      })
    },
    upgrade (id,index) {
      this.moneyagencyActive = index
      this.moneyagencyId = id
      // this.dialog = true
    },
    // 代理 运营商 tab
    resetTab(){
      var that = this
      that.payWays = ''
      that.moneyagencyActive = ''
      that.moneyagencyId = ''
      that.agencyGoodsList = ''
      if(that.type == 0) {
        that.resetTabOne(that.agencyBagTab[0].id)
      } else if (that.type == 1) {
        that.resetTabOne(that.operatorBagTab[0].id)
      }
      this.getSplendidList()
      console.log(this.type,'0代理，1运营')
    },
    //代理礼包tab
    resetTabOne(id){
      this.getUpgradeGoods(id)
    },
    // 运营商礼包tab
    resetTabTwo(id){
      this.getUpgradeGoods(id)
    },
    selectpay (way) {
      this.payWays = way
    },
    toPay () {
      if( this.type == 0) {
        if (this.moneyagencyActive === '') {
          this.$vux.toast.text('请选择付费方式')
        } else {
          this.dialog = true
        }
      } else if( this.type == 1) {
        if (this.payWays === '') {
          this.$vux.toast.text('请选择付费方式')
        } else {
          this.dialog = true
        }
      }
    },
    // 现金支付
    getWay (type) {
      var that = this
      if(that.type == 0) {
        // 代理
        that.$http.post('/amoy/user/upgrade-agent', {
          id: that.moneyagencyId,
          upgrade_type: 1,
          type: type
        }, true).then(res => {
          that.dialog = false
          if (res.code === 0) {
            if (type === 'alipay') {
              that.plusReady(1, res.data.payOrder)
            } else {
              that.plusReady(0, res.data.payOrder)
            }
          }
        })
      } else if(that.type == 1) {
        // 运营
        that.$http.post('/amoy/user/upgrade-agent', {
          upgrade_type: 2,
          term: that.payWays,
          type: type,
          id: that.data.buyInfo.id
        }, true).then(res => {
          that.dialog = false
          if (res.code === 0) {
            if (type === 'alipay') {
              that.plusReady(1, res.data.payOrder)
            } else {
              that.plusReady(0, res.data.payOrder)
            }
          }
        })
      }
    },
    // 获取支付通道
    plusReady (index, data) {
      let that = this
      if (index === 1) {
        let aliPayPlus
        if (this.$aliPay === 1) {
          aliPayPlus = api.require('aliPayTradePlus')
        } else {
          aliPayPlus = api.require('aliPayPlus')
        }
        aliPayPlus.payOrder({
          orderInfo: data
        }, function (ret, err) {
          switch (ret.code) {
            case '9000':
              that.$vux.toast.text('支付成功')
              setTimeout(() => {
                that.$router.go(-1)
              }, 2000)
              break
            case '6001':
              that.$vux.toast.text('取消支付')
              break
            case '8000':
              that.$vux.toast.text('正在处理中')
              break
            default:
              that.$vux.toast.text('支付失败')
          }
        })
      } else {
        let wxPay = api.require('wxPay')
        let info = {
          apiKey: data.appid,
          orderId: data.prepayid,
          mchId: data.partnerid,
          nonceStr: data.noncestr,
          timeStamp: data.timestamp,
          sign: data.sign
        }
        wxPay.payOrder(info, function (ret, err) {
          if (ret.status) {
            that.$vux.toast.text('支付成功')
          } else {
            console.log(JSON.stringify(err))
            if (err.code === -2) {
              that.$vux.toast.text('取消支付')
            } else {
              that.$vux.toast.text('支付失败')
            }
          }
        })
      }
    }
  },
  beforeMount() {
  },
  mounted () {
    // this.getInfo()
    this.getlist()
    this.getUserRights()
    this.getSplendidList()
    this.getBanner()
    // this.getUpgradeGoods()
    this.getOperatorInfo()
  }
}
</script>
<style scoped lang="less">
  .rightsConter{
    font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background: #F7F7F7;
    .headerConBox{
      position: absolute;
      overflow: hidden;
      width: 100%;
      background: #fff;
      z-index: 3;
      .header{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 0.83rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #191919;
        .icon-back{
          position: absolute;
          font-size: 0.4rem;
          font-weight: 500;
          color: #666;
          left: 0.31rem;
          z-index: 3;
        }
        .title{
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 3rem;
          height: 0.83rem;
          margin: auto;
          font-size: 0.34rem;
          font-weight: 500;
          line-height: 0.83rem;
          text-align: center;
          color: #333333;
        }
        .rightBut{
          position: absolute;
          right: 0.3rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.28rem;
          font-weight: 500;
          line-height: 0.83rem;
          color: #999999;
          i {

          }
        }
      }
    }
    .pageContent{
      position: absolute;
      overflow: auto;
      top: 0.83rem;
      bottom: 0;
      width: 100%;
      .bannerBox{
        position: relative;
        width: 100%;
        font-size: 0;
        img.banner{
          width: 100%;
        }
      }
      .operatorAgency{
        position: relative;
        background: #fff;
        .itemBox{
          box-shadow:0px 4px 10px 0px rgba(163,163,163,0.1);
          margin-top: 0.2rem;
          /deep/.vux-tab{
            background: rgba(255, 255, 255, 1);
          }
          /deep/.vux-tab .vux-tab-item.vux-tab-selected{
            font-size: 0.3rem;
            font-weight: 500;
            background: none;
            color: #FF5847;
          }
          /deep/.vux-tab .vux-tab-item{
            font-size:0.3rem;
            font-weight:500;
            background: none;
            color: #333333;
          }
          /deep/.vux-tab-bar-inner{
            background: #FF5847;
            height: 0.02rem;
          }
        }
        .rightsDescBox{
          position: relative;
          width: 7.1rem;
          display: flex;
          justify-content: center;
          padding-bottom: 0.2rem;
          background: #fff;
          margin: auto;
          margin-top: 0.2rem;
          border: 0.01rem solid rgba(255,209,202,1);
          border-radius: 0.2rem;
          .rightTitle{
            width: 100%;
            height: 1.3rem;
            box-sizing: border-box;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .titleItemHeader{
              width: 2.51rem;
              span {
                display: block;
                font-size: 0.26rem;
                font-weight: 500;
                line-height: 0.36rem;
                text-align: center;
                color: #333333;
              }
              p {
                font-size: 0.24rem;
                font-weight: 400;
                line-height: 0.36rem;
                text-align: center;
                color: #999999;
              }
            }
            .tabTitleItemBox{
              width: 4.19rem;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              .titleItem{
                width: 1.43rem;
                span {
                  display: block;
                  font-size: 0.26rem;
                  font-weight: 500;
                  line-height: 0.36rem;
                  text-align: center;
                  color: #333333;
                }
                p {
                  font-size: 0.24rem;
                  font-weight: 400;
                  line-height: 0.36rem;
                  text-align: center;
                  color: #999999;
                }
              }
            }
          }
          .rightItem{
            width: 100%;
            height: 0.94rem;
            box-sizing: border-box;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .itemTitle{
              width: 2.51rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-size: 0.26rem;
              font-weight: 500;
              line-height: 0.3rem;
              color: #333;
              img.titleIcon{
                width: 0.54rem;
                margin-right: 0.1rem;
              }
            }
            .tabItemcontent{
              width: 4.19rem;
              overflow: hidden;
              // display: flex;
              justify-content: center;
              align-items: center;
              .itemcontent{
                width: 1.37rem;
                height: 0.36rem;
                float: left;
                border-left: 1px solid rgba(137,137,137,0.2);
                font-size: 0.36rem;
                font-weight: 500;
                line-height: 0.36rem;
                color: #333;
                text-align: center;
              }
              .oneItemcontent{
                width: 1.2rem;
              }
            }
          }
          .descSolid{
            width: 6.68rem;
            margin: auto;
            border-bottom: 0.02rem dashed #EEEEEE;
          }
          .twoRightItem{
            width: 100%;
            height: 0.94rem;
            box-sizing: border-box;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .itemTitle{
              width: 2.51rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-size: 0.26rem;
              font-weight: 500;
              line-height: 0.3rem;
              color: #333;
              img.titleIcon{
                width: 0.54rem;
                margin-right: 0.1rem;
              }
            }
            .tabItemcontent{
              width: 4.19rem;
              overflow: hidden;
              // display: flex;
              justify-content: center;
              align-items: center;
              .itemcontent{
                width: 1.37rem;
                height: 0.36rem;
                float: left;
                border-left: 1px solid rgba(137,137,137,0.2);
                font-size: 0.36rem;
                font-weight: 500;
                line-height: 0.36rem;
                color: #333;
                text-align: center;
              }
              .oneItemcontent{
                width: 1.2rem;
              }
            }
          }
          .titleBox{
            width: 2.73rem;
            .titleItemHeader{
              width: 2.51rem;
              height: 1.3rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              span {
                display: block;
                font-size: 0.26rem;
                font-weight: 500;
                line-height: 0.36rem;
                text-align: center;
                color: #333333;
              }
              p {
                font-size: 0.24rem;
                font-weight: 400;
                line-height: 0.36rem;
                text-align: center;
                color: #999999;
              }
            }
            .itemTitle{
              width: 2.51rem;
              height: 0.94rem;
              margin-left: 0.2rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              img.titleIcon{
                width: 0.54rem;
                margin-right: 0.1rem;
              }
              span.titleContenText{
                flex: 1;
                font-size: 0.26rem;
                font-weight: 500;
                line-height: 0.3rem;
                color: #333;
                border-right: 1px solid rgba(137,137,137,0.2);
              }
            }
          }
          .contentBox{
            width: 4.37rem;
            height: 5.06rem;
            .contentItemBox{
              width: 1.43rem;
              height: 100%;
              float: left;
              .titleItem{
                width: 1.43rem;
                height: 1.3rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span {
                  display: block;
                  font-size: 0.26rem;
                  font-weight: 500;
                  line-height: 0.36rem;
                  text-align: center;
                  color: #333333;
                }
                p {
                  font-size: 0.24rem;
                  font-weight: 400;
                  line-height: 0.36rem;
                  text-align: center;
                  color: #999999;
                }
              }
              .itemContentBox{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1.42rem;
                height: 0.94rem;
                .itemcontent{
                  width: 100%;
                  height: 0.36rem;
                  float: left;
                  font-size: 0.36rem;
                  font-weight: 500;
                  line-height: 0.36rem;
                  color: #333;
                  text-align: center;
                }
                .itemcontentBorder{
                  border-right: 1px solid rgba(137,137,137,0.2);
                }
              }
            }
          }
        }
        .splendidBox{
          position: relative;
          margin-top: 0.22rem;
          .splendidTitle{
            width: 100%;
            height: 0.72rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            padding-left: 0.2rem;
            i.titleIcon{
              width: 0.04rem;
              height: 0.26rem;
              margin-right: 0.1rem;
              border-radius: 0.02rem;
              background: rgba(255,127,105,1);
            }
            span.titleText{
              font-size: 0.32rem;
              font-weight: 500;
              line-height: 0.4rem;
              color: #333;
            }
          }
          .iconBox{
            width: 100%;
            display: flex;
            padding-top: 0.27rem;
            padding-bottom: 0.45rem;
            justify-content: center;
            align-items: center;
            .iconItem{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              img.iconImg{
                width: 1.48rem;
                margin-bottom: 0.2rem;
              }
              p.itemTitle{
                font-size: 0.28rem;
                font-weight: 500;
                line-height: 0.42rem;
                color: #333;
              }
              span.itemDesc{
                display: block;
                font-size: 0.24rem;
                font-weight: 500;
                line-height: 0.42rem;
                color: #999;
              }
            }
          }
        }
      }
      .upgradeBox{
        position: relative;
        width: 7.5rem;
        background: #fff;
        margin-top: 0.2rem;
        .upgradeTitle{
          position: relative;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          padding-left: 0.2rem;
          padding-top: 0.4rem;
          padding-bottom: 0.37rem;
          i.upgradeTitIcon{
            width: 0.04rem;
            height: 0.26rem;
            border-radius: 0.02rem;
            background: #FF7F69;
            margin-right: 0.1rem;
          }
          span.upTitTex{
            font-size: 0.32rem;
            font-weight: 500;
            line-height: 0.32rem;
            color: #333;
          }
        }
        .upgraderItemBox{
          padding-bottom: 0.34rem;
          /deep/.swiper-wrapper{
            padding-left: 0.2rem;
            padding-right: 0.2rem;
          }
          .upgraderItem{
            position: relative;
            width: 3.6rem;
            height: 4.5rem;
            margin-top: 0.16rem;
            border: 0.01rem solid #FFD1CA;
            border-radius: 0.2rem;
            .title{
              width: 2rem;
              height: 0.56rem;
              margin: auto;
              margin-top: -0.16rem;
              border-radius: 0.28rem;
              background: linear-gradient(0deg,rgba(255,101,80,1),rgba(255,161,116,1));
              box-shadow:0px 4px 6px 0px rgba(255,158,114,0.48);
              font-size: 0.3rem;
              font-weight: 500;
              line-height: 0.52rem;
              text-align: center;
              color: #fff;
              z-index: 3;
            }
            .descBxo{
              width: 3.6rem;
              height: 3.8rem;
              padding-top: 0.25rem;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              div.descItem{
                position: relative;
                // margin-bottom: 0.2rem;
                display: flex;
                i.descItemIcon{
                  position: relative;
                  display: inline-block;
                  width: 0.1rem;
                  height: 0.1rem;
                  margin-top: 0.18rem;
                  margin-right: 0.13rem;
                  border-radius: 0.05rem;
                  background: linear-gradient(-45deg,rgba(255,156,113,1),rgba(255,124,110,1));
                }
                p.descText{
                  width: 2.9rem;
                  font-size: 0.26rem;
                  font-weight: 400;
                  line-height: 0.46rem;
                  color: #666;
                }
              }
            }
          }
        }
        .upOperatorBox{
          position: relative;
          overflow: hidden;
          /deep/.weui-progress__inner-bar{
            background: linear-gradient(270deg,rgba(246,61,54,1),rgba(248,123,100,1));
          }
          .ways{
            margin-left: 0.33rem;
            font-size: 0.26rem;
            font-weight: 500;
            line-height: 0.42rem;
            color: #666666;
          }
          .progressBox{
            padding: 0.3rem .2rem 0.26rem 0.33rem;
            display: flex;
            justify-content: space-between;
            .weui-progress{
              width: 6rem;
              /deep/.weui-progress__bar{
                overflow: hidden;
                height: 0.2rem;
                border-radius: 0.1rem;
              }
            }
          }
          .progressBox1{
            .weui-progress__bar{
              .weui-progress__inner-bar{
                background: #a256ff;
              }
            }
          }
          .present{
            color: #999;
            font-size: .24rem;
            font-weight: 500;
            line-height: 0.24rem;
            padding: 0rem .2rem .12rem 0.33rem;
          }
          .attentionDesc{
            padding: 0.32rem 0.2rem 0.35rem 0.33rem;
            font-size: 0.24rem;
            font-weight: 500;
            line-height: 0.3rem;
            color: #FF8972;
          }
          .upBton{
            width: 4rem;
            height: 0.66rem;
            margin: auto;
            margin-bottom: 0.32rem;
            border-radius: 0.33rem;
            background: linear-gradient(30deg,rgba(220,176,113,1),rgba(228,185,122,1),rgba(237,212,178,1));
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.66rem;
            text-align: center;
            color: #fff;
          }
        }
      }
      .shopBox{
        position: relative;
        width: 100%;
        .spopTitle{
          width: 100%;
          height: 1.1rem;
          margin-top: 0.3rem;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          img.titLeftIcon{
            width: 1rem;
          }
          span.titText{
            margin-left: 0.15rem;
            margin-right: 0.15rem;
            font-size: 0.32rem;
            font-weight: bold;
            line-height: 0.36rem;
            color: #FF5B61;
          }
          img.titRigIcon{
            width: 1rem
          }
          img.shopTitleImg{
            width: 4.94rem;
          }
        }
        .itemBox{
          box-shadow:0px 4px 10px 0px rgba(163,163,163,0.1);
          margin-top: 0.2rem;
          /deep/.vux-tab{
            background: rgba(255, 255, 255, 1);
          }
          /deep/.vux-tab .vux-tab-item.vux-tab-selected{
            font-size: 0.3rem;
            font-weight: 500;
            background: none;
            color: #FF5847;
          }
          /deep/.vux-tab .vux-tab-item{
            font-size:0.3rem;
            font-weight:500;
            background: none;
            color: #333333;
          }
          /deep/.vux-tab-bar-inner{
            background: #FF5847;
            height: 0.02rem;
          }
        }
        .shopItemBox{
          width: 100%;
          box-sizing: border-box;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
          padding-bottom: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .shopItem{
            width: 3.46rem;
            height: 4.7rem;
            margin-top: 0.2rem;
            background: #fff;
            .imgBox{
              position: relative;
              overflow: hidden;
              float: left;
              width: 3.46rem;
              height: 3.46rem;
              border-radius: 0.1rem;
              .shopImg{
                width:0;
                height:100%;
                padding-left: 100%;
                overflow:hidden;
                background-position: center center;
                background-repeat: no-repeat;
                -webkit-background-size:cover;
                -moz-background-size:cover;
                background-size:cover;
              }
              p.imgDesc{
                position: absolute;
                width: 100%;
                height: 0.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.26rem;
                font-weight: 500;
                line-height: 0.26rem;
                color: #fff;
                background: rgba(0,0,0,0.5);
                bottom: 0;
                z-index: 3;
              }
            }
            p.itemTitle{
              position: relative;
              overflow: hidden;
              width: 3.46rem;
              height: 0.7rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              box-sizing: border-box;
              padding-left: 0.16rem;
              padding-right: 0.16rem;
              img.titIcon{
                width: 0.28rem;
                margin-right: 0.07rem;
              }
              span {
                position: relative;
                overflow: hidden;
                width: 2.79rem;
                height: 0.3rem;
                font-size: 0.26rem;
                font-weight: 500;
                line-height: 0.3rem;
                color: #333;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .picBox{
              width: 100%;
              height: 0.7rem;
              box-sizing: border-box;
              padding-left: 0.16rem;
              padding-right: 0.16rem;
              span.picIcon{
                font-size: 0.24rem;
                font-weight: 500;
                line-height: 0.34rem;
                color: #FF5847;
                margin-right: 0.07rem;
              }
              span.pic{
                font-size: 0.34rem;
                font-weight: 500;
                line-height: 0.34rem;
                color: #FF5847;
              }
            }
          }
        }
      }
      .moneyShopBox{
        position: relative;
        overflow: hidden;
        background: #fff;
        .ways{
          margin: .1rem 0 0.1rem 0.2rem;
          width: 1.44rem;
          height: 0.46rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: .26rem;
          background: linear-gradient(270deg,rgba(246,61,54,1),rgba(248,123,100,1));
          border-bottom-right-radius: .46rem;
          border-top-left-radius: .46rem;
        }
        .way{
          margin: .2rem .2rem;
          background: #ffe8ef;
          display: flex;
          align-items: center;
          height: .74rem;
          border-radius: .37rem;
          padding: 0 .2rem;
          p{
            font-size: .28rem;
            flex: 1;
            span{
              color: #FF8972;
            }
          }
          .selectBox{
            width: .4rem;
            height: .4rem;
            border-radius: .2rem;
            background: #fff;
          }
          .selected{
            background: url("../../assets/img/my/select.png") no-repeat;
            background-size: contain;
            background-position: bottom;
          }
        }
        .invite{
          width: 4rem;
          height: .66rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .28rem;
          margin: .5rem auto 0.5rem;
          border-radius: .33rem;
          background: linear-gradient(30deg,rgba(220,176,113,1),rgba(228,185,122,1),rgba(237,212,178,1));
          font-weight: 500;
          color: #fff;
        }
      }
      .moneyAgencyBox{
        overflow: hidden;
        background: #fff;
        padding-top: 0.2rem;
        .ways{
          margin: .1rem 0 0.1rem 0.2rem;
          width: 1.44rem;
          height: 0.46rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: .26rem;
          background: linear-gradient(270deg,rgba(246,61,54,1),rgba(248,123,100,1));
          border-bottom-right-radius: .46rem;
          border-top-left-radius: .46rem;
        }
        .way{
          margin: .2rem .2rem;
          background: #ffe8ef;
          display: flex;
          align-items: center;
          height: .74rem;
          border-radius: .37rem;
          padding: 0 .2rem;
          p{
            font-size: .28rem;
            flex: 1;
            span{
              color: #FF8972;
            }
          }
          .selectBox{
            width: .4rem;
            height: .4rem;
            border-radius: .2rem;
            background: #fff;
          }
          .selected{
            background: url("../../assets/img/my/select.png") no-repeat;
            background-size: contain;
            background-position: bottom;
          }
        }
        .invite{
          width: 4rem;
          height: .66rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .28rem;
          margin: .5rem auto 0.5rem;
          border-radius: .33rem;
          background: linear-gradient(30deg,rgba(220,176,113,1),rgba(228,185,122,1),rgba(237,212,178,1));
          font-weight: 500;
          color: #fff;
        }
      }
    }
    .waysBox{
      .dialog{
        background: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100000;
      }
      .way{
        background: #fff;
        border-radius: .1rem;
        position: fixed;
        left: .3rem;
        top: 50%;
        margin-top: -1.75rem;
        width: 6.9rem;
        font-size: .3rem;
        z-index: 100001;
        .icon-close{
          position: absolute;
          right: .3rem;
          top: .25rem;
          font-size: .4rem;
        }
        p{
          text-align: center;
          height: 1.15rem;
          line-height: 1.15rem;
          justify-content: center;
          display: flex;
          align-items: center;
          position: relative;
          img{
            width: .4rem;
            margin-right: .1rem;
          }
        }
        .t:after{
          content: '';
          width: 100%;
          height: 1px;
          position: absolute;
          bottom: 0;
          right: 0;
          border-bottom: 1px solid #dadada;
          transform-origin: 0 0;
          transform: scaleY(.5);
        }
        .ways:after{
          content: '';
          width: 90%;
          height: 1px;
          position: absolute;
          bottom: 0;
          left: 5%;
          border-bottom: 1px solid #dadada;
          transform-origin: 0 0;
          transform: scaleY(.5);
        }
      }
    }
  }
</style>
