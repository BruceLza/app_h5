<template>
  <div v-if="data" class="tool" :style="{backgroundColor: data.bgColor,borderTopRightRadius: 0.2 +'rem',borderTopLeftRadius: 0.2+'rem',borderBottomRightRadius: 0.2+'rem',borderBottomLeftRadius: 0.2+'rem'}">
    <div class="moneyTitle" @click="jumpLink(data.link)">
      <div :style="{color: '#333'}">{{data.title}}</div>
      <div class="imgBox"><img src="../assets/img/my/jiantou.png" alt=""></div>
    </div>
    <div v-if="data" class="option">
      <div class="optionClOneBox">
        <div class="optionClOne" v-for="(item, index) of data.items1" :key="index">
          <div class="MoneyBox">
            <p class="moneyNumber" :style="{color: item.color}" v-if="item.type == 1"><span v-if="money && money.today_payment_share">{{money.today_payment_share}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 2"><span v-if="money && money.last_month_Settlement">{{money.last_month_Settlement}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 3"><span v-if="money && money.last_month_payment">{{money.last_month_payment}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 4"><span v-if="money && money.thismonth_payment">{{money.thismonth_payment}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 5"><span v-if="money && money.yesterday_share">{{money.yesterday_share}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 6"><span v-if="money && money.sum_price">{{money.sum_price}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 7"><span v-if="money && money.withdraw">{{money.withdraw}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 8"><span v-if="money && money.unliquidated">{{money.unliquidated}}</span><span v-else>0.00</span></p>
            <p class="moneyItemName">{{item.text}}</p>
          </div>
          <div class="itemSolid" style="background: #eee;" v-show="index == 0"></div>
        </div>
      </div>
      <div class="optionClTwoBox">
        <div class="optionClTwo" v-for="(item, index) of data.items2" :key="index">
          <div class="MoneyBox">
            <p class="moneyNumber" :style="{color: item.color}" v-if="item.type == 1">{{item.text}}:<span v-if="money && money.today_payment_share">{{money.today_payment_share}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 2">{{item.text}}:<span v-if="money && money.last_month_Settlement">{{money.last_month_Settlement}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 3">{{item.text}}:<span v-if="money && money.last_month_payment">{{money.last_month_payment}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 4">{{item.text}}:<span v-if="money && money.thismonth_payment">{{money.thismonth_payment}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 5">{{item.text}}:<span v-if="money && money.yesterday_share">{{money.yesterday_share}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 6">{{item.text}}:<span v-if="money && money.sum_price">{{money.sum_price}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 7">{{item.text}}:<span v-if="money && money.withdraw">{{money.withdraw}}</span><span v-else>0.00</span></p>
            <p class="moneyNumber" :style="{color: item.color}" v-else-if="item.type == 8">{{item.text}}:<span v-if="money && money.unliquidated">{{money.unliquidated}}</span><span v-else>0.00</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditNavMoney',
  props: ['data', 'money'],
  components: {},
  data () {
    return {
      // data: {
      //   bgColor:'#fff',
      //   borderTopRightRadius: '5',
      //   borderTopLeftRadius: '5',
      //   borderBottomRightRadius: '0.1',
      //   borderBottomLeftRadius: '0.1',
      //   paddingTop: '0.26',
      //   paddingBottom: '0.26',
      //   borderTopColor: 'rgba(238,238,238,1)',
      //   borderBottomColor: 'rgba(238,238,238,1)',
      //   display:'block',
      //   title: '标题',
      //   items:[{
      //     type: '1',
      //     color:'#FF4466',
      //     text:'本月预估',
      //     },{
      //     type: '2',
      //     color:'#FF4466',
      //     text:'今日收益',
      //     }],/* 1 今日预估  2 上月结算  3 上月预估  4 本月预估*/
      //   },
      // money: {one: '1',two: '2',three: '3',four: '4'}
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
  .tool{
    position: relative;
    overflow: hidden;
    margin-top: -1px;
    border-radius: 10px;
    background: #fff;
    padding-left: 0.28rem;
    padding-right: 0.28rem;
    .moneyTitle{
      // margin-bottom: .4rem;
      position: relative;
      width: 100%;
      height: 0.81rem;
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      text-align: left;
      font-size: 0.28rem;
      color: #666;
      padding-top: 0.32rem;
      padding-bottom: 0.23rem;
      div:nth-child(1){
        flex: 1;
      }
      div:nth-child(2){
        width: 0.12rem;
        height: 0.18rem;
        margin: 0 auto;
        font-size: 0;
        // margin-bottom: 0.14rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .option{
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      flex-wrap: wrap;
      overflow: hidden;
      .optionClOneBox{
        position: relative;
        width: 100%;
        display: flex;
        padding-top: 0.34rem;
        padding-bottom: 0.29rem;
        border-top: 0.01rem solid #EEEEEE;
        border-bottom: 0.01rem solid #EEEEEE;
        .optionClOne{
          // margin-bottom: .4rem;
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          text-align: left;
          font-size: 0.24rem;
          color: #666;
          .MoneyBox{
            flex: 1;
            text-align: center;
            .moneyNumber{
              font-size: 0.38rem;
              font-weight: 500;
              line-height: 0.52rem;
            }
            .moneyItemName{
              margin-top: 0.1rem;
              font-size: 0.24rem;
              font-weight: 500;
              line-height: 0.36rem;
              color: #333;
            }
          }
          .itemSolid{
            width: 1px;
            height: 0.52rem;
          }
        }
      }
      .optionClTwoBox{
        position: relative;
        width: 100%;
        display: flex;
        padding-top: 0.23rem;
        padding-bottom: 0.28rem;
        .optionClTwo{
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
  }
</style>
