<template>
    <div class="firmOrder_main">
        <x-header
          slot="header"
          :left-options="{showBack: false}"
        >
          <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
          确认订单
        </x-header>
      <div class="content">
        <div class="content_top" @click="handAddress()" v-show="obj.address == ''">
            点击添加默认地址
        </div>
        <div class="content_top" @click="jumpTo({name:'mallAddress'})" v-show="obj.address">
          <div class="div1">
              <div class="left_name">
                <i class="iconfont icon-wode1"></i>
                <span>收货人：{{obj.address ? obj.address.username : ''}}</span>
              </div>
              <div class="right_phone">
                {{obj.address ? obj.address.mobile : ''}}
              </div>
          </div>
          <div class="div2">
            <i class="iconfont icon-locationfill"></i>
            <span>{{obj.address ? obj.address.province + obj.address.city + obj.address.district + obj.address.address: ''}}</span>
            <i class="iconfont icon-right1 left"></i>
          </div>
        </div>
        <div class="border">
          <img src="../../../assets/mall/img/home/border.png" alt="">
        </div>
        <div v-for="(items,index) in obj.cartList" :key="index" class="one-shop-order">
          <div class="content_main">
            <div class="list">
              <div class="header">
                <img v-lazy="items.shopInfo.logo" alt="">
                <span>{{items.shopInfo.title}}</span>
              </div>
              <div class="mail" v-for="(item,index) in items.goods" :key="index">
                <div class="left">
                  <img v-lazy="item.thumb" alt="">
                </div>
                <div class="right">
                  <div class="div1">
                    {{item.goodsName}}
                  </div>
                  <div class="div2">
                    <div>
                    {{item.fieldInfo}}
                    </div>
                    <div>
                      ×{{item.goodsNum}}
                    </div>
                  </div>
                  <div class="div3">
                    <div class="price_main"><span>¥</span>{{item.goodsPrice}}</div>
                  </div>
                </div>
              </div>
              <div class="li_main">
                <div class="title_left">快递费</div>
                <div class="title_right">{{items.express.expressName}}</div>
              </div>
              <div class="li_main" v-if="items.express.postagePrice > 0">
                <div class="title_left">运费</div>
                <div class="title_right_red">{{items.express.postagePrice}}</div>
              </div>
            </div>
          </div>
          <div class="content_main" style="margin-top:0.1rem;">
            <div class="list">
              <div class="li_main li_main2">
                <div class="title_left">订单备注</div>
                <div class="title_right" style="width: 80%"><input type="text" placeholder="（选填），不超过50字" v-model="items.models" style="width: 100%;text-align: left"></div>
              </div>
              <div class="li_main">
                <div class="title_left">商品总计</div>
                <div class="title_right_red">
                  <span>¥</span>{{items.shopInfo.countPrice}}
                </div>
              </div>
            </div>
          </div>
          <div class="content_main"  style="margin-top:0.1rem;" v-if="payType==1">
            <div class="list jifen-box">
              <div class="line">
                <img src="../../../assets/mall/img/jifen.png">
                <p>可用积分: {{ticketInfo.credit2}}</p>
                <!--<img  src="../../../assets/img/balance/weixuan.png" @click="changeJifen(items, 1)">
                <img src="../../../assets/img/balance/yixuan.png"   @click="changeJifen(items, 0)">-->
              </div>
              <div  style="padding-left: 0.5rem; color: #999999;"></div>
              <input type="number" placeholder="请输入积分数量" v-model="credit2" @blur="ticketExchange(credit2)">
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
          <div class="footer_main">
            <div class="div1">
              <label>合计</label><span>¥</span>{{sumPrice}}
            </div>
            <div class="div_btn" @click="handDetail()">立即购买</div>
          </div>
      </div>
    </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
export default {
  name: 'firmOrder',
  data () {
    return {
      obj: {},
      aJifen: 0,
      totalPrice: 0, // 本次订单总价
      jifenRate: 0 ,// 每元有多少积分
      ticketInfo:'',
      credit2:'',
      sumPrice:'',
      price:'',
      payType:''
    }
  },
  mounted: function () {
    // 删除
    if (this.$route.query.type) {
      this.getDetail()
    } else {
      this.getDetail('interim', this.$route.query.data)
    }
    this.getTicket()
  },
  computed: {
    availableJifen: {
      get () {
        // 计算可用积分
        let availabel = this.obj.credit1
        for (let i = 0, len = this.obj.cartList.length; i < len; i++) {
          if (this.obj.cartList[i].useJifen) {
            availabel = availabel - this.obj.cartList[i].useJifenNum
          }
        }
        return availabel
      },
      set (val) {
      }
    },
    /*sumPrice : {
      get(){
          // 计算合计
        let sumPrice = +this.obj.countPrice
        for (let i = 0, len = this.obj.cartList.length; i < len; i++) {
          if (this.obj.cartList[i].useJifen) {
            sumPrice = sumPrice - this.obj.cartList[i].useJifenNum / this.jifenRate
          }
        }
        return sumPrice
      },
      set(ticket){
        let sumPrice = ticket
        //return sumPrice
      }
    }*/
  },
  methods: {
    // 切换使用积分时调用
    changeJifen (items, val) {
      items.useJifen = val
      if (items.shopInfo.deduce.type == 3) {
        if (!items.inputJifenNum) {
          // 刚开始此值为undefine
          items.inputJifenNum = 0
        }
        // 当抵扣类型为用户输入时，要做验证，数字输入不能过大
        if (items.inputJifenNum < items.useJifenNum) {
          // 当减少数量时
          this.availableJifen = this.availableJifen + (items.useJifenNum - items.inputJifenNum)
        } else {
          // 当增加数量时
          if (+val > +this.availableJifen) {
            // 当数字超过已有积分数量
            items.inputJifenNum = +this.availableJifen + +items.useJifenNum
          }
          if (+items.inputJifenNum / this.jifenRate > this.obj.countPrice) {
            // 当积分价值超过商品价值
            items.inputJifenNum = this.obj.countPrice * this.jifenRate
          }
        }
        items.useJifenNum = items.inputJifenNum
      } else {
        // 当抵扣类型为固定积分抵扣时
        console.log('this.availableJifen: ', this.availableJifen)
        console.log('items.shopInfo.deduce.credit1: ', items.shopInfo.deduce.credit1)
        if (val && +this.availableJifen < +items.shopInfo.deduce.credit1) {
          // 当要开启此积分抵扣但是可用积分不足时
          items.useJifen = 0
          this.$vux.toast.text('可用积分不足')
        }
      }
    },
    ticketExchange(ticket){
      if(parseFloat(ticket)>parseFloat(this.price)){
          this.$vux.toast.text("积分已超过商品价格");
          this.sumPrice =  this.price
          this.credit2 = ""
      }else{
          this.sumPrice = this.price - parseFloat(ticket)
      }
    },
    getDetail (type, data) {
      apiHttp.cardCheckout(type, data).then(response => {
        if (response.code === 0) {
          this.obj = response.data
          this.jifenRate = this.obj.creditConfig.credit3.exchange.credit1 / 100
          let list = this.obj.cartList
          this.payType = this.obj.cartList[0].payType
          this.sumPrice = this.obj.countPrice
          this.price = this.obj.countPrice
          for (let i = 0; i < list.length; i++) {
            list[i].models = ''
            this.$set(list[i], 'useJifen', 0)
            if (list[i].shopInfo.deduce && list[i].shopInfo.deduce.type != 3) {
              // 当可以使用积分，并且是固定积分时
              this.$set(list[i], 'useJifenNum', list[i].shopInfo.deduce.credit1)
            } else {
              // 当不可使用积分或者不是固定积分时
              this.$set(list[i], 'useJifenNum', '')
            }
          }
        }
      })
    },
    handAddress () {
      this.$router.push({
        name: 'mallAddress'
      })
    },
    queryOrder (data) {
      let noteList = []
      let deduceList = []
      let list = this.obj.cartList
      /*for (let i = 0; i < list.length; i++) {
        noteList[list[i].shopInfo.id] = list[i].models
        if (list[i].useJifen) {
          // 使用积分
          if (list[i].shopInfo.deduce.type == 3) {
            // 如果使用积分并且使用方式是用户输入时
            console.log('list[i].useJifenNum: ', list[i].useJifenNum)
            deduceList[list[i].shopInfo.id] = list[i].useJifenNum
          } else {
            // 否则为1
            deduceList[list[i].shopInfo.id] = 1
          }
        } else {
          // 不使用积分
          deduceList[list[i].shopInfo.id] = 0
        }
      }*/
      // noteList.splice(0,1);
     
      apiHttp.orderCreate(data, noteList, deduceList,this.credit2).then(response => {
        if (response.code === 0) {
          this.$router.push({
            name: 'mallPayMent',
            query: {
              orderId: response.data
            }
          })
        }
      })
    },
    getTicket(){
      this.$http.post('/amoy/user/user-credits', {}, false, true).then((res) => {
          if (res.code === 0) {
             this.ticketInfo = res.data
          }
      })
    },
    handDetail () {
      if (this.$route.query.type) {
        this.queryOrder()
      } else {
        this.queryOrder(this.$route.query.data)
      }
    }
  }
}
</script>

<style scoped>

</style>
