<template>
  <div id="inforMssage">
    <div class="days">
      <p v-if="isShow" style="text-align: center;">没有邀请明细，赶紧去邀请朋友吧！</p>
      <ul class="day-ul">
        <li class="day-li" v-for="(item,index) in data_list" :key="index">
          <div class="day-tit">
            <span v-text="item.mobile"></span>
            <span v-if="item.status == '1'" class="blue">新注册</span>
            <span v-else-if="item.status == '2'" class="red">激活</span>
            <span v-else class="yellow">首购</span>
          </div>
          <div class="day-msg">
            <p>注册时间：{{item.register_date}}</p>
            <p>首购时间：{{item.buy_date}}</p>
            <p>激活时间：{{item.bind_date}}</p>
            <p>订单号：{{item.tb_trade_parent_id}}</p>
          </div>
        </li>

        <!--        <li class="day-li">-->
        <!--          <div class="day-tit">-->
        <!--            <span>15100000000</span>-->
        <!--            <span class="red">新注册</span>-->
        <!--          </div>-->
        <!--          <div class="day-msg">-->
        <!--            <p>注册时间：2019/12/12 14:00:00</p>-->
        <!--            <p>首购时间：2019/12/12 14:00:00</p>-->
        <!--            <p>激活时间：2019/12/12 14:00:00</p>-->
        <!--            <p>订单号：201954689</p>-->
        <!--          </div>-->
        <!--        </li>-->

        <!--        <li class="day-li">-->
        <!--          <div class="day-tit">-->
        <!--            <span>15100000000</span>-->
        <!--            <span class="yellow">新注册</span>-->
        <!--          </div>-->
        <!--          <div class="day-msg">-->
        <!--            <p>注册时间：2019/12/12 14:00:00</p>-->
        <!--            <p>首购时间：2019/12/12 14:00:00</p>-->
        <!--            <p>激活时间：2019/12/12 14:00:00</p>-->
        <!--            <p>订单号：201954689</p>-->
        <!--          </div>-->
        <!--        </li>-->


      </ul>
    </div>


  </div>
</template>

<script>
  import {Toast } from 'vux'
  export default {
    name: 'inforMssage',
    comments: {Toast},
    data() {
      return {
        data_list: [],
        isShow:false,
      }
    },
    mounted() {
      let _this = this;
      let day = window.location.href.split('?')[1].split("=")[1];
      this.$http.post('/amoy/user/new-user-list',{
        y:day.split('-')[0],
        m:day.split('-')[1],
        d:day.split('-')[2]
      }).then(res => {
        if (res.code == 0) {
          console.log(res);
          if(res.data.length <= 0 || res.data == []){
            /*TODO--没有数据页面*/
            _this.$vux.toast.text('没有数据！');
            _this.isShow = true;
            return;
          }
          _this.data_list = res.data;
        } else {
          this.$vux.toast.text('加载失败！');
        }
      })
    }
  }
</script>

<style scoped lang="less">

  .days {
    width: 100%;
    padding: 0 0.44rem;
    background-color: white;
    box-sizing: border-box;

    .day-ul {
      list-style-type: none;

      .day-li {
        padding: 0.34rem 0;

        &:not(:last-child) {
          background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
          background-size: 8px 1px;
          background-repeat: repeat-x;
          background-position: left bottom;
        }

        .day-tit {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;

          span:first-child {
            font-size: 15px;
            font-family: PingFang-SC-Medium;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 28px;
          }

          span:last-child {
            font-size: 13px;
            font-family: PingFang-SC-Regular;
            font-weight: bold;
            line-height: 28px;
          }

          /*蓝色字*/

          .blue {
            color: #1679FB;
          }

          /*红色字*/

          .red {
            color: #FF2020;
          }

          /*黄色字*/

          .yellow {
            color: #F76B04;
          }
        }

        .day-msg {

          p {
            font-size: 13px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(56, 56, 56, 1);
            line-height: 25px;
          }
        }
      }

    }
  }

</style>
