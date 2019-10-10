<template>
  <div class="tool" :style="{backgroundColor: data.bgColor,borderTopRightRadius: 0.2 +'rem',borderTopLeftRadius: 0.2+'rem',borderBottomRightRadius: 0+'rem',borderBottomLeftRadius: 0+'rem'}">
    <div v-if="data" class="option" :style="{paddingTop: 0 +'rem',paddingBottom: 0+'rem'}">
      <div v-for="(item, index) of data.items" :key="index" @click="jumpLink(item.link)" :style="{borderColor: '#fff',fontSize: 0.28 + 'rem'}">
        <div class="imgBox" v-show="item.img"><img :src="item.img" alt=""></div>
        <div :style="{color: item.color}">{{item.text}}</div>
        <div class="imgBox"><img src="../assets/img/my/jiantou.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditNavMoney',
  props: ['data'],
  components: {},
  data () {
    return {
      // data: {
      //   bgColor:'#fff',
      //   borderTopRightRadius: '5',
      //   borderTopLeftRadius: '5',
      //   borderBottomRightRadius: '0.1',
      //   borderBottomLeftRadius: '0.1',
      //   paddingTop: '0.26',
      //   paddingBottom: '0.26',
      //   borderColor: 'rgba(238,238,238,0.7)',
      //   fontSize: '0.26',
      //   display:'block',
      //   title: '标题',
      //   items:[{
      //     link:'123456',
      //     img:'',
      //     color:'red',
      //     text:'测试',
      //   }],
      // }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .tool{
    overflow: hidden;
    margin-top: -1px;
    border-radius: 10px;
    background: #fff;
    padding-left: 0.28rem;
    padding-right: 0.28rem;
    .option{
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      >div{
        // margin-bottom: .4rem;
        float: left;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        font-size: 0.24rem;
        color: #666;
        padding-top: 0.32rem;
        padding-bottom: 0.23rem;
        div:nth-child(1){
          width: 0.36rem;
          height: 0.36rem;
          // margin: 0 auto;
          margin-right: 0.2rem;
          // margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        div:nth-child(2){
          flex: 1;
        }
        div:nth-child(3){
          width: 0.12rem;
          height: 0.18rem;
          margin: 0 auto;
          font-size: 0;
          // margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .borerBottom{
        border-bottom: 0.01rem solid;
      }
    }
    .headers{
      float: left;
      line-height: 1rem;
      font-size: 0.3rem;
      width: 100%;
      padding-left: 0.2rem;
      position: relative;
      box-sizing: border-box;
      text-align: left !important;
    }
    .headers:before{
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #eeeeee;
      bottom: 0;
      left: 0;
    }
  }
</style>
