<template>
  <div class="tool" :style="{backgroundColor: data.bgColor,borderTopRightRadius: 0 +'rem',borderTopLeftRadius: 0+'rem',borderBottomRightRadius: 0.2+'rem',borderBottomLeftRadius: 0.2+'rem'}">
    <div v-if="data" class="option" :style="{paddingTop: data.paddingTop +'rem',paddingBottom: data.paddingBottom+'rem',borderTopColor: data.borderTopColor,borderBottomColor: data.borderBottomColor}">
      <div v-for="(item, index) of data.items" :key="index" @click="jumpLink(item.link)" :style="{fontSize: data.fontSize + 'rem'}">
        <div class="MoneyBox">
          <p class="moneyNumber" :style="{color: item.color}" v-if="item.type == 1">{{item.text}}:￥<span v-if="money.today_payment_share">{{money.today_payment_share}}</span><span v-else>0.00</span></p>
          <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 2">{{item.text}}:￥<span v-if="money.today_payment_share">{{money.last_month_Settlement}}</span><span v-else>0.00</span></p>
          <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 3">{{item.text}}:￥<span v-if="money.today_payment_share">{{money.last_month_payment}}</span><span v-else>0.00</span></p>
          <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 4">{{item.text}}:￥<span v-if="money.today_payment_share">{{money.thismonth_payment}}</span><span v-else>0.00</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditNavMoney',
  props: ['data','money'],
  components: {},
  data () {
    return {
      /* data: {
        bgColor:'#fff',
        borderTopRightRadius: '5',
        borderTopLeftRadius: '5',
        borderBottomRightRadius: '0.1',
        borderBottomLeftRadius: '0.1',
        paddingTop: '0.26',
        paddingBottom: '0.26',
        borderTopColor: 'rgba(255,255,255,1)',
        borderBottomColor: 'rgba(255,255,255,1)',
        fontSize: '0.24',
        display:'block',
        title: '标题',
        items:[{
          type: '1',
          color:'#FF4466',
          text:'本月预估',
          },{
          type: '2',
          color:'#FF4466',
          text:'今日收益',
        }],
      }, */
      /* money: {one: '1',two: '2',three: '3',four: '4'} */
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .tool{
    overflow: hidden;
    margin-top: -1px;
    border-radius: 10px;
    background: #fff;
    padding-left: 0.28rem;
    padding-right: 0.28rem;
    padding-bottom: 0.03rem;
    .option{
      overflow: hidden;
      flex: 1;
      display: flex;
      box-sizing: border-box;
      flex-wrap: wrap;
      overflow: hidden;
      border-top: 0.01rem solid;
      border-bottom: 0.01rem solid;
      >div{
        // margin-bottom: .4rem;
        float: left;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        font-size: 0.24rem;
        color: #666;
        .MoneyBox{
          flex: 1;
          text-align: center;
          .moneyNumber{
            font-weight: 500;
            line-height: 0.3rem;
          }
        }
      }
    }
  }
</style>
