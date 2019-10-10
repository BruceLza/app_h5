<template>
    <div class="EditOrder">
      <div class="order">
        <div class="order-title">
          <p>{{data.title}}</p>
          <span v-if="data.right" @click="jumpLink(data.right_url)">{{data.right}}<img src="../assets/mall/img/my/right.png" alt=""></span>
        </div>
        <div class="order-list1">
          <div class="list-item1" v-for="(item, index) of data.items" :key="index" @click="jumpLink(item.link)">
            <img :src="item.img" alt="">
            <!--<span v-show="orderNum.num1 > 0">{{orderNum.num1}}</span>-->
            <p>{{item.text}}</p>
          </div>
        </div>
        <div class="list" v-show="expressList.length>0">
          <swiper :options="swiperOption4" ref="mySwiper1">
            <swiperSlide v-for="(item,index) in expressList" :key="index">
              <div class="list-text" @click="jumpTo({name: 'mallLogistics',query: {orderSn:item.orderSn}})">
                <img :src="item.goods.thumb || './static/img/under/111.png'" alt="">
                <div>
                  <div>
                    <img src="../assets/mall/img/my/yunshuzhong.png" alt="">
                    <span style="color: #fc3357;font-size: 0.3rem;width: 50%;" v-if="item.orderStatus == 1">运输中</span>
                    <span style="color: #fc3357;font-size: 0.3rem;width: 50%;" v-if="item.orderStatus == 2">完成中</span>
                    <span>{{item.list.time}}</span>
                  </div>
                  <span class="text-overflow_1">{{item.list.context}}</span>
                </div>
              </div>
            </swiperSlide>
          </swiper>
          <!--<div class="swiper-pagination" slot="pagination"></div>-->
        </div>
      </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'EditOrder',
  props: ['data', 'orderNum', 'expressList'],
  components: {
    swiper, swiperSlide
  },
  data () {
    return {
      swiperOption4: {
        direction: 'vertical',
        autoplay: {
          delay: 3000,
          waitForTransition: true
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.EditOrder{
  margin-top: -1px;
}
</style>
