<template>
    <div class="EditHotSale" v-if="obj">
      <div class="slice_main">
        <swiper :options="swiperOption3">
          <swiper-slide v-for="(item,index) in obj.hotGoodsList" :key="index"   @click.native="handDetail(item.id)">
            <div class="slide_box">
              <img v-lazy="item.thumb" alt="">
              <p>{{item.goodsName}}</p>
              <div class="price">
                <span>¥</span>{{item.spe_price}}
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'EditHotSale',
  components: {
    swiper, swiperSlide
  },
  props: ['obj'],
  data () {
    return {
      swiperOption3: {
        slidesPerView: 3.5,
        spaceBetween: 30,
        freeMode: true
      }
    }
  },
  methods: {
    handDetail (id) {
      this.$router.push({
        name: 'mallHomeDetail',
        query: {
          title: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
