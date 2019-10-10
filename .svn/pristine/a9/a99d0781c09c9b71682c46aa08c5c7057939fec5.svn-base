<template>
    <div class="NewEditNotice" :style="{backgroundColor: data.bgColor}" v-show="commissionList || goodsList">
      <div class="new_product" :style="{paddingBottom: data.padding + 'px',paddingTop: data.padding + 'px'}">
        <div class="new_box">
          <div class="mearee">
            <div class="left_img" @click="jumpLink(data.leftLink)">
              <img :src="data.img" alt="">
            </div>
            <marquee>
              <marquee-item v-for="(i,index) in commissionList" :key="'commission' + index" >
                <div class="right_text">
                  <div class="text commissionText" :style="{color: data.color,fontSize: data.size + 'px'}">
                    <span>{{i.nickname}}</span>
                    {{parseInt(Math.random()*(60 - 1) + 1)}}分钟之前获得佣金<span>{{i.price}}</span>元
                  </div>
                </div>
              </marquee-item>
              <marquee-item v-for="(item,index) in goodsList" :key="'goods' + index" >
                <div class="right_text" @click="goShopping(item)">
                  <div class="left_img">
                    <img src="../assets/img/auth/bobaoicon.png" alt="">
                  </div>
                  <div class="text" :style="{color: data.color,fontSize: data.size + 'px'}">
                    {{item.title}}
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
import * as utils from '../utils'
export default {
  name: 'NewEditNotice',
  components: {
    Marquee, MarqueeItem
  },
  props: ['data'],
  data () {
    return {
      commissionList: '',
      goodsList: ''
    }
  },
  methods: {
    goShopping (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0')
    },
    handDetailNew (item) {
      this.$router.push({
        name: 'mallArticleInfo',
        query: item
      })
    },
    getInfo() {
      this.$http.post('amoy/home/bobao-list', {}, false).then(res => {
        this.commissionList = res.data.commission
        this.goodsList = res.data.goods
      })
    }
  },
  mounted() {
  	this.getInfo()
  }
}
</script>

<style scoped lang="less">
.NewEditNotice{
  position: relative;
  width: 100%;
  .new_product{
    padding-left: 0.3rem;
    .new_box{
      .mearee{
        width: 6.7rem;
        padding-top: 0.05rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .left_img{
          width: 0.81rem;
          margin-right: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            max-width: 100%;
          }
        }
        .right_text{
          width: 5.7rem;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: left;
          .left_img{
            width: 0.6rem;
            margin-right: 0.2rem;
          }
          .text{
            width: 5.37rem;
            height: 0.32rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.28rem;
            line-height: 0.32rem;
            span {
              color: #FE4F43;
            }
          }
          .commissionText{
            width: 5.7rem;
          }
        }
      }
    }
  }
}
</style>
