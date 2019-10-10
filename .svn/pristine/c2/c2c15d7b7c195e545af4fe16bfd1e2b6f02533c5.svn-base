<template>
    <div class="EditMallNotice" :style="{backgroundColor: data.bgColor}">
      <div class="new_product" v-if="newList" :style="{paddingBottom: data.padding + 'px',paddingTop: data.padding + 'px'}">
        <div class="new_box">
          <div class="mearee">
            <div class="left_img" @click="jumpLink(data.leftLink)">
              <img :src="data.img" alt="">
            </div>
            <marquee>
              <marquee-item v-for="(i,index) in newList" :key="index" @click.native="handDetailNew(i)">
                <div class="right_text">
                  <div class="text" :style="{color: data.color,fontSize: data.size + 'px'}">
                    {{i.title}}
                  </div>
                  <div class="right_img">
                    <img  :src="i.thumb || './static/img/under/111.png'" alt="">
                  </div>
                </div>
              </marquee-item>
            </marquee>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Marquee, MarqueeItem} from 'vux'
export default {
  name: 'EditMallNotice',
  components: {
    Marquee, MarqueeItem
  },
  props: ['data', 'newList'],
  data () {
    return {}
  },
  methods: {
    handDetailNew (item) {
      this.$router.push({
        name: 'mallArticleInfo',
        query: item
      })
    }
  }
}
</script>

<style scoped lang="less">
.EditMallNotice{
  margin-top: -1px;
}
</style>
