<template>
  <div id="inforDeta">
    <div class="month">
      <ul>
        <li @click="ajax_month(index,{y:T_year,m:item,d:T_days(T_year,item,index),pageSize:31})"
            v-for="(item,index) in T_month" :key="index">
          <!-- class="span-article" -->
          <span :class="{'span-article':indexActive === index}">{{item |number_cn}}月明细</span>
        </li>
      </ul>

    </div>

    <!--每日-->
    <div class="month-day">
      <ul class="day-ul">
        <!--列表-1-->
        <li class="ul-li" v-for="(item,index) in day_list" :key="index">
          <!--left-->
          <div class="left">
            <p>{{item.time | time_formatting(1)}}:{{item.time | time_formatting(2)}}</p>
            <p>{{item.time | time_formatting(0)}}</p>
          </div>
          <!--中-->
          <div class="zhong">
            <!--金额-->
            <ol>
              <li class="li-dian seeMore">
                <span>预计总收益(元):<span class="txt">{{item.money_all}}</span></span>
                <span class="see-right" @click="jumpTo('/invitationMssage?param='+item.time)">查看更多<x-icon
                  type="ios-arrow-right"
                  size="11"
                  class="icon-red"></x-icon></span>
              </li>

              <li>
                激活用户数(人):<span class="txt">{{item.jh_sum}}</span>
              </li>

              <li>
                推荐奖励金(元):<span class="txt">{{item.prospect}}</span>
              </li>
            </ol>
            <!--人数-->
            <ol>
              <li class="li-dian">
                <span>首购用户数(人):<span class="txt">{{item.sg_sum}}</span></span>
              </li>

<!--              <li>-->
<!--                复购用户数(人):<span class="txt">0</span>-->
<!--              </li>-->

              <li>
                绑卡用户数(人):<span class="txt">{{item.bk_sum}}</span>
              </li>
            </ol>
          </div>
        </li>
      </ul>
      <p v-if="isShowTxt" style="text-align:center;">暂无数据明细~</p>
    </div>


  </div>
</template>

<script>
  import {Toast, Loading} from 'vux'


 
import { close } from 'fs';

  export default {
    name: 'informationDetailed',
    components:{
      Toast,
      Loading,

    },
    data() {
      return {
        indexActive: 0,
        day_list: [],
        // month: 0,
        total: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),//现在日期
        /*样式下标*/
        index: 0,
        isShowTxt: false,
        callBack: false,
        /*当前月份*/
        T_month: [],
        /*当前年份*/
        T_year: new Date().getFullYear(),
        /*当前天数*/
        /**
         * @return {number}
         */
        T_days: (year, item,index) => {
          if(index==0){
            return 0;
          }else{
            //(year%4==0 && year%100!=0)|| year%400==0?'该年是闰年':'该年的平年';
            return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? (item == 1 || item == 3 || item == 5 || item == 7 || item == 8 || item == 10 || item == 12 ? 31 : item == 2 ? 29 : 30) : item == 1 || item == 3 || item == 5 || item == 7 || item == 8 || item == 10 || item == 12 ? 31 : item == 2 ? 28 : 30;
          }
        }
      }
    },
    mounted() {
      var _this = this;
      /*初始加载*/
      _this.ajax_month(this.index,{pageSize:31});
      /*加载月份*/
      let mont = new Date().getMonth() + 1;
      let num = 12;
      for (var i = 0; i < 12; i++) {
        mont--;
        if (mont <= 0) {
          mont = num--;
        }
        _this.T_month.push(mont);
      }
      _this.T_month.unshift(_this.T_month.pop());
      

    },
    methods: {
     
      /*加载数据*/
      ajax_month(index, param) {
        let _this = this;
        if ((index + 1) > _this.T_month[0]) {
          param.y = _this.T_year - 1;
        }
        _this.callBack = false;
        this.$vux.loading.show({
          text: 'Loading'
        });
        _this.index = index;
        this.indexActive = index;
        if(index == 0){
          this.$http.post('/amoy/user/award-list',{pageSize:31}).then(res => {
            if (res.code === 0) {
              this.$vux.loading.hide();
              _this.callBack = true;
              if (res.data == [] || res.data.length == 0) {
                _this.isShowTxt = true;
                return;
              }
              _this.day_list = res.data;
            } else {
              _this.$vux.toast.text('加载失败！');
              _this.callBack = false;
            }
          });
        }else{
          this.$http.post('/amoy/user/award-list', param).then(res => {
            if (res.code === 0) {
              this.$vux.loading.hide();
              _this.callBack = true;
              if (res.data == [] || res.data.length == 0) {
                _this.isShowTxt = true;
                return;
              }
              _this.day_list = res.data;
            } else {
              _this.$vux.toast.text('加载失败！');
              _this.callBack = false;
            }
          });
        }
      },
    },
    filters: {
      /*时间格式化*/
      time_formatting(val, index) {
        return val.trim().split('-')[index];
      },
      /*数字转中文*/
      number_cn(val) {
        switch (val % 12) {
          case 1:
            return "一";
          case 2:
            return "二";
          case 3:
            return "三";
          case 4:
            return "四";
          case 5:
            return "五";
          case 6:
            return "六";
          case 7:
            return "七";
          case 8:
            return "八";
          case 9:
            return "九";
          case 10:
            return "十";
          case 11:
            return "十一";
          case 0:
            return "十二";
        }
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo;
      }
    },
  }
</script>

<style scoped lang="less">

  #inforDeta {
    background-color: white;
    /*height: 100%;*/
    /*overflow: hidden;*/
  }

  .month {
    width: 100%;
    height: 1rem;
    overflow: auto;
    border-bottom: 0.02rem solid #cecece;

    ul {
      clear: both;
      width: 9999px;

      li {
        &:not(:last-child):after {
          content: "|";
          width: 0.02rem;
          height: 0.26rem;
          color: rgba(153, 153, 153, 1);
          position: relative;
          left: 0.64rem;
          top: -0.1rem;
        }

        float: left;
        width: calc(375px / 3);
        height: 1rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;

        span {
          display: block;
          height: 100%;
          line-height: 1rem;
          font-size: 0.3rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }

        .span-article {
          font-size: 0.3rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(247, 107, 4, 1);
          border-bottom: 2px solid rgba(247, 107, 4, 1);
          border-radius: 1px;
          box-sizing: border-box;
        }
      }
    }
  }


  .month-day {
    height: calc(100% - 1rem);
    padding: 0.4rem;
    padding-bottom: 0;
    /*overflow: hidden;*/

    .day-ul {
      border-left: 1px solid rgba(255, 103, 0, 1);
      margin: 0 15px;
      box-sizing: border-box;

      .ul-li {
        margin-bottom: 0.34rem;
        position: relative;
      }

      .ul-li:before {
        content: "";
        position: absolute;
        left: -0.14rem;
        top: 0px;
        width: 0.24rem;
        height: 0.24rem;
        background: url("../../assets/img/choniceness/mingxiyuan.png") no-repeat;
        background-size: 100% 100%;
      }

      li {
        width: 100%;
        display: flex;
        display: -webkit-flex;

        .left {
          width: 1.8rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(54, 54, 54, 1);

          p {
            padding-left: 10px;
          }

          p:first-child {
            font-size: 0.36rem;
          }

          p:last-child {
            font-size: 0.24rem;
          }
        }

        .zhong {
          width: calc(100% - 1.8rem);
          margin-top: 0.1rem;

          ol {
            margin: 0;

            .li-dian {
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              margin-top: -5px;
            }

            li {
              clear: both;
              height: 0.48rem;
              font-size: 0.24rem;

              .txt {
                color: #FF6700;
                font-size: 0.24rem;
              }

              .see-right {
                float: right;
                font-size: 0.22rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(54, 54, 54, 1);
              }
            }
          }

          position: relative;

          ol:before {
            content: "●";
            color: rgba(255, 103, 0, 1);
            position: absolute;
            left: -12px;
            top: -5px;
            font-size: 5px;
          }

          ol:nth-child(2) {
            margin-top: 0.36rem;
          }

        }
      }
    }
  }


</style>
