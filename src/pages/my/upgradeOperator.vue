<template>
    <div class="upgradeOperator" ref="freeUpgrade" v-if="data">
      <img class="bgImg" src="../../assets/img/my/upgradeOperator.jpg" alt="">
      <div class="upgradeBox" ref="upgradeBox">
        <div class="status">
          <div class="successNav" v-if="data && data.length > 0">
            <swiper :options="swiperOption" class="swiper">
              <swiper-slide v-for="(item, index) in data" :key="index" :class="{active:index === 0, shadow:true}">
                <div class="upgradeItem">
                  <div class="titleBox">
                    <div class="left"></div>
                    <div class="title">{{item.title}}</div>
                    <div class="right"></div>
                  </div>
                  <div class="contentBox">
                    <div class="itemBox">
                      <div class="condition">
                        <div v-if="item.upInfo.show.user == 1 && item.upInfo.user.one != 0" class="term"><i class="icon"></i><p class="termText">直推有效粉丝数量{{item.upInfo.user.one}}个</p></div>
                        <div v-if="item.upInfo.show.user == 1 && item.upInfo.user.fone != 0" class="term"><i class="icon"></i><p class="termText">非直推有效粉丝数量{{item.upInfo.user.fone}}个</p></div>
                        <div v-if="item.upInfo.show.user == 1 && item.upInfo.user.teamprice != 0" class="term"><i class="icon"></i><p class="termText">个人预估收益{{item.upInfo.user.teamprice}}元</p></div>
                      </div>
                      <div class="condition">
                        <div v-if="item.upInfo.show.team == 1 && item.upInfo.team.orderNum != 0" class="term"><i class="icon"></i><p class="termText">团队总订单数量{{item.upInfo.team.orderNum}}个</p></div>
                        <div v-if="item.upInfo.show.team == 1 && item.upInfo.team.creditPrice != 0" class="term"><i class="icon"></i><p class="termText">个人累计收益{{item.upInfo.team.creditPrice}}元</p></div>
                      </div>
                      <div class="condition">
                        <div v-if="item.upInfo.show.buy == 1 && item.upInfo.price.month != 0" class="term"><i class="icon"></i><p class="termText">月付:{{item.upInfo.price.month}}元</p></div>
                        <div v-if="item.upInfo.show.buy == 1 && item.upInfo.price.year != 0" class="term"><i class="icon"></i><p class="termText">年付:{{item.upInfo.price.year}}元</p></div>
                        <div v-if="item.upInfo.show.buy == 1 && item.upInfo.price.forever != 0" class="term"><i class="icon"></i><p class="termText">永久:{{item.upInfo.price.forever}}元</p></div>
                      </div>
                    </div>
                    <div class="alertBut">
                      <p v-if="item.upInfo.model.level == 1" class="alert">（满足上述任意一条件即可升级）</p>
                      <p v-else-if="item.upInfo.model.level == 2" class="alert">（满足上述所有条件即可升级）</p>
                      <div class="upgradeBut" @click="toSearch(item.id,item.title)">立即升级</div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'upgradeOperator',
  components: {
    swiper, swiperSlide
  },
  data () {
    return {
      data: '',
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: false,
        loopedSlides: 3,
        slidesPerView: 2,
        spaceBetween: 10,
        coverflowEffect: {
          rotate: 2,
          stretch: -20,
          depth: 0,
          modifier: 3,
          slideShadows: false
        },
        on: {
          sliderMove: function (event) {
            window.canRightSlipBack = false
          },
          touchEnd: function (event) {
            setTimeout(() => {
              window.canRightSlipBack = true
            }, 600)
          }
        }
      }
    }
  },
  methods: {
    getInfo () {
      this.$http.post('/amoy/user/operator-list', {}, true).then(res => {
        this.data = res.data
      })
    },
    toSearch (id, title) {
      this.$router.push('/freeUpgrade?id=' + id + '&title=' + title)
    }
  },
  created () {
    this.getInfo()
  }
}
</script>
<style lang="less">
 .successNav{
   .swiper-wrapper{
     .title{
       font-size: .28rem;
       text-align: center;
     }
     .info{
       text-align: center;
       color: #f6c585;
       font-size: .24rem;
     }
   }
 }
  .personSwiper{
    width: 3rem;
    margin: 0 auto;
    .swiper-slide{
      width: 1rem !important;
      height: 1rem;
      border-radius: .5rem;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .upgradeOperator{
    .progressBox{
      .weui-progress__bar{
        height: .2rem;
        border-radius: .1rem;
        .weui-progress__inner-bar{
          border-radius: .1rem;
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
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.upgradeOperator{
  background: #f7f7f7;
  /* background: url("../../assets/img/my/upgradeOperator.jpg") no-repeat;
  background-size: 100% auto; */
  background: #FEE8D1;
  height: 100%;
  overflow-y: auto;
  .bgImg{
    position: absolute;
    width: 100%;
    max-width: 100%;
  }
 .status{
    margin-top: 5.26rem;
   .upgradeItem:first-of-type{
     margin-left: -0.5rem;
   }
    .upgradeItem{
      position: relative;
      width: 4.6rem;
      .titleBox{
        width: 100%;
        height: 0.66rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .left{
          width: 0;
          height: 0;
          border-top: 0.12rem solid rgba(0, 0, 0, 0);
          border-left: 0.06rem solid rgba(0, 0, 0 , 0);
          border-right: 0.06rem solid #FB5251;
          border-bottom: 0.12rem solid #FB5251;
        }
        .title{
          width: 2.96rem;
          height: 0.66rem;
          font-size: 0.34rem;
          font-weight: 500;
          text-align: center;
          line-height: 0.66rem;
          color: white;
          background: linear-gradient(0deg,rgba(255,101,80,1),rgba(255,161,116,1));
        }
        .right{
          width: 0;
          height: 0;
          border-top: 0.12rem solid rgba(0, 0, 0, 0);
          border-right: 0.06rem solid rgba(0, 0, 0 , 0);
          border-left: 0.06rem solid #FB5251;
          border-bottom: 0.12rem solid #FB5251;
        }
      }
      .contentBox{
        width: 4.6rem;
        height: 6.8rem;
        box-sizing: border-box;
        border: 0.06rem solid #FD9875;
        border-radius: 0.06rem;
        margin-top: -0.42rem;
        padding-top: 0.5rem;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .itemBox{
          width: 3.4rem;
          height: 4.7rem;
          display: flex;
          flex-direction: column;
          /*justify-content: space-around;*/
          .condition{
            margin-bottom: 0.2rem;
            .term{
              i{
                opacity: 0;
              }
            }
            .term:first-of-type{
              i{
                opacity: 1;
              }
            }
          }
          .term{
            width: 3.4rem;
            display: flex;
            .icon{
              display: block;
              width: 0.06rem;
              height: 0.06rem;
              margin-top: 0.2rem;
              margin-right: 0.11rem;
              background: #F6846D;
            }
            .termText{
              width: 3.2rem;
              font-size: 0.28rem;
              line-height: 0.46rem;
              color: #333;
            }
          }
        }
        .alertBut{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .alert{
            font-size: 0.26rem;
            line-height: 0.46rem;
            font-weight: 500;
            color: #333;
            margin-bottom: 0.3rem;
          }
          .upgradeBut{
            width: 3.4rem;
            height: 0.6rem;
            border-radius: 0.3rem;
            background: linear-gradient(270deg,rgba(255,91,74,1),rgba(255,144,119,1));
            font-size: 0.26rem;
            line-height: 0.66rem;
            text-align: center;
            color: white;
            font-weight: 500;
            margin-bottom: 0.6rem;
          }
        }
      }
    }
    .select{
      padding: .2rem;
    }
    .ways{
      margin: .1rem 0 0.1rem 0.2rem;
      width: 1.44rem;
      height: 0.46rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: .26rem;
      background: linear-gradient(to right, @theme-col, @partial-color);
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
          color: @theme-col;
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
    .present{
      color: #999;
      font-size: .24rem;
      padding: .1rem .2rem .2rem;
    }
    .progressBox{
      padding: 0 .2rem;
      display: flex;
      justify-content: space-between;
      .weui-progress{
        width: 6rem;
      }
    }
    .notice{
      padding: 0 .2rem;
      color: #f6c585;
      font-size: .24rem;
    }
    .invite{
      width: 5.1rem;
      height: .88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .34rem;
      margin: .5rem auto 0.5rem;
      border-radius: .44rem;
      background: linear-gradient(to right, #f7c785, #f6deac);
      font-weight: bold;
    }
  }
}
</style>
