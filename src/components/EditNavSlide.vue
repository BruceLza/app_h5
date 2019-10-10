<template>
    <div class="EidtNavSlide"   :style="{backgroundColor: data.bgColor}">
      <swiper class="banner_list" :options="swiperOption1">
        <swiper-slide class="allBox" v-for="(items, index) of data.items" :key="index">
          <div class="allList" v-for="(item,index) in items" :key="index"  @click="jumpLink(item.link)">
            <img v-lazy="item.img" alt="" :key="item.img">
            <p>{{item.text}}</p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-scrollbar">
      </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'EidtNavSlide',
  components: {
    swiper,
    swiperSlide
  },
  props: ['data'],
  data () {
    return {
      swiperOption1: {
        slidesPerView: 5,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      }
    }
  },
  methods: {}
}
</script>

<style  lang="less">
  .EidtNavSlide{
    margin-top: -1px;
    .banner_list{
      box-sizing: border-box;
      .allBox{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        font-size:0.26rem;
        margin-bottom:0.1rem;
        padding: 0 0.23rem;
        width:1rem!important;
        .allList{
          margin-bottom: 0.2rem;
          text-align: center;
          img{
            width:0.84rem;
            height:0.84rem;
          }
          p{
            color:#666666;
            width: 1.2rem;
          }
        }
      }
    }
    .swiper-scrollbar{
      height: 0.04rem;
      width: 12%;
      margin: 0 auto;
      background: #E4E4E4;
      div:first-child{
        background-color: #999999;
        width: 50%;
      }
    }
  }
</style>
