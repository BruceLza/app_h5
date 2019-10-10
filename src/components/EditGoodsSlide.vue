<template>
    <div class="EditTrans"  :style="{backgroundColor: data.bgColor}" v-if="list.length > 0">
      <div class="title"><p :style="{color: data.leftColor}">{{data.leftTitle}}</p><span v-for="(items, i) of data.items" :key="i"  @click="jumpLink(items.link)" :style="{color: data.rightColor}">{{data.rightTitle}} <i class="iconfont icon-icon--"></i></span></div>
      <div class="lists" >
        <div class="list" v-for="(item, index) of list" :key="index" @click="detail(item)" v-if="index < 9">
          <div class="cover">
            <img :src="item.thumb" alt="">
          </div>
          <div class="t">{{item.title}}</div>
          <div class="estimateBox">
            <span class="estimate" v-if="item.commission_money">预估收益:{{item.commission_money}} 积分</span>
          </div>
          <div class="money"><p>￥<span>{{item.coupon_price}}</span></p><span>￥{{item.zk_final_price}}</span></div>
          <div class="quangAndSold">
            <div class="quang"><i class="leftRa"></i>{{item.coupon_money}}元券<i class="rightRa"></i></div>
            <div class="sold">已售{{item.volume}}件</div>
          </div>
        </div>
        <div class="more" v-for="(items, i) of data.items" :key="i"  @click="jumpLink(items.link)">查看更多<i class="iconfont icon-icon--"></i></div>
      </div>
    </div>
</template>

<script>
import * as utils from '../utils'
export default {
  name: 'EditTrans',
  components: {},
  props: ['data'],
  data () {
    return {
      list: []
    }
  },
  watch: {
    data () {
      this.getInfo()
    }
  },
  methods: {
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0')
    },
    getInfo () {
      if (this.data.type === '0') {
        this.$http.post('/amoy/opgoods/optional-goods', {
          page: 1
        }, true, true).then(res => {
          if (res.code === 0) {
            this.list = res.data
          }
        })
      } else {
        this.$http.post('/amoy/home/goods-list', {
          page: 1,
          type: this.data.tag,
          sort: 0
        }, true, true).then(res => {
          if (res.code === 0) {
            this.list = res.data.goodsList
          }
        })
      }
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
.EditTrans{
  margin-top: -1px;
  .title{
    padding: 0 0.4rem 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 0.88rem;
    font-size: 0.28rem;
    font-weight: bold;
    span{
      font-weight: normal;
      color: #666;
      font-size: 0.24rem;
      display: flex;
      align-items: center;
    }
  }
  /*.title:after{*/
    /*content: " ";*/
    /*display: inline-block;*/
    /*height: 6px;*/
    /*width: 6px;*/
    /*border-width: 1px 1px 0 0;*/
    /*border-color: #666;*/
    /*border-style: solid;*/
    /*-webkit-transform: matrix(.71,.71,-.71,.71,0,0);*/
    /*transform: matrix(.71,.71,-.71,.71,0,0);*/
    /*position: absolute;*/
    /*top: 50%;*/
    /*margin-top: -4px;*/
    /*right: 0.2rem;*/
  /*}*/
  .lists{
    display: -webkit-box;
    overflow-x: auto;
    padding-bottom: 0.28rem;
    .list{
      margin-left: 0.2rem;
      width: 2.4rem;
      font-size: 0;
      .cover{
        width: 2.4rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img{
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.1rem;
        }
        span{
          margin-top: -0.2rem;
          font-size: 0.2rem;
          display: inline-block;
          /*position: absolute;*/
          /*bottom: 0;*/
          background: linear-gradient(to right,#F74E3D,#FF968B);
          color: #fff;
          border-radius: 0.06rem;
          padding: 0 0.1rem;
        }
      }
      .t{
        color: #333333;
        font-size: 0.24rem;
        line-height: 0.26rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
      }
      .estimateBox{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .estimate{
          display: inline-block;
          padding-left: 0.08rem;
          padding-right: 0.08rem;
          padding-top: 0.07rem;
          padding-bottom: 0.07rem;
          border: 0.02rem solid #FF0036;
          border-radius: 0.05rem;
          font-size: 0.18rem;
          line-height: 0.18rem;
          font-weight: 500;
          color: #FF0036;
        }
      }
      .money{
        margin-top: 0.2rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        p{
          color: #FF0036;
          font-size: 0.2rem;
          line-height: 0.3rem;
          span{
            font-size: 0.3rem;
            font-weight: 500;
          }
        }
        >span{
          margin-left: 0.07rem;
          font-size: 0.2rem;
          line-height: 0.3rem;
          text-decoration: line-through;
          color: #C0C0C0;
        }
      }
      .quangAndSold{
        width: 100%;
        margin-top: 0.15rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .quang{
          padding-top: 0.07rem;
          padding-bottom: 0.07rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.18rem;
          line-height: 0.18rem;
          font-weight: 500;
          color: #fff;
          background: linear-gradient(90deg,rgba(255,7,51,1),rgba(255,107,4,1));
          border-radius: 0.03rem;
          .leftRa,.rightRa{
            width: 0.1rem;
            height: 0.1rem;
            background: #fff;
            border-radius: 50%;
          }
          .leftRa{
            margin-left: -0.05rem;
            margin-right: 0.1rem;
          }
          .rightRa{
            margin-right: -0.05rem;
            margin-left: 0.1rem;
          }
        }
        .sold{
          font-size: 0.2rem;
          font-weight: 500;
          color: #999;
        }
      }
    }
    .more{
      width: 2.16rem;
      height: 2.8rem;
      color: #c6c7c9;
      font-size: 0.24rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
