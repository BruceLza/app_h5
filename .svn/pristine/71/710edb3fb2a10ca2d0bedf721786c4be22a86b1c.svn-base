<template>
  <div class="home_list" v-if="list">
    <div class="header_count">
      <ul>
        <li v-for="(item,index) in list"  @click="handDetail(item.id)" :key="index">
          <img v-lazy="item.thumb" alt="">
          <div class="shop_name">
            <table></table>
            <p>{{item.goodsName}}</p>
            <div class="market-price">
              <del>¥ <span>{{item.marketprice}}</span></del>
            </div>
            <div class="price">
              <div class="price_main">¥ <span>{{item.spe_price}}</span></div>
              <span>已售：{{item.sales}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['list'],
  methods: {
    handDetail (id) {
      if(id=='3146'){
          this.$router.push({
            name: 'mallFacialDetail',
            query: {
              title: id
            }
        })
      }else{
          this.$router.push({
          name: 'mallHomeDetail',
          query: {
            title: id
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
