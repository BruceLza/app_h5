<template>
  <div class="help-center">
    <img class="top-img" src="../../assets/img/my/help_center_bg.jpg">
    <div class="kind-box" v-for="(kindItem, kindIndex) in data" :key="kindIndex">
      <div class="left">
        <img :src="kindItem.img">
        <p>{{kindItem.title}}</p>
      </div>
      <div class="right">
        <div class="article-item text-overflow_1-xzh" v-for="(item, index) in kindItem.info" :key="index" @click="show(item)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'help-center',
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getInfo () {
      this.$http.post('/amoy/user/help-center', {}, true).then(res => {
        console.log('res: ', res)
        this.data = res.data
      })
    },
    show (item) {
      utils.storage.set('richText', item)
      this.jumpTo(`/richText?title=${item.title}`)
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
.help-center{
  .top-img{
    width: 100%;
    margin-bottom: .2rem;
  }
  .kind-box{
    background: white;
    display: flex;
    position: relative;
    justify-content: space-between;
    margin-bottom: .15rem;
    align-items: center;
    .left{
      position: absolute;
      left: 0;
      height: 100%;
      top: 0;
      border-right: 1px solid #eee;
      background: white;
      width: 1.7rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      img{
        height: .54rem;
      }
      p{
        margin-top: .17rem;
        font-size: .26rem;
      }
    }
    .right{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      min-height: 1.4rem;
      .article-item{
        padding-left: 1.94rem;
        line-height: .9rem;
        font-size: .28rem;
        width: 100%;
        box-sizing: border-box;
      }
      .article-item:not(:last-child){
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
