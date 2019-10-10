<template>
  <div class="bankdetailed">
    <div class="containers">
      <ul class="bank_list_box">
        <li class="lists em">
          <div class="name lt">姓名</div>
          <div class="name_int lt">
            <input type="text" placeholder="请输入您的姓名"  v-model="username">
          </div>
        </li>
        <li class="lists em">
          <div class="name lt">电话</div>
          <div class="name_int lt">
            <input type="text" placeholder="请输入您的电话号码" v-model="mobile">
          </div>
        </li>
      </ul>
    </div>
    <div class="tixing">*三个工作日内会与您取得联系</div>
    <div  class="tocore" @click="setpwd(type)">
      提交
    </div>
  </div>
</template>
<script>
import * as utils from '../../utils'
export default {
  name:"",
  components: {
    },
  data(){
    return {
      username:"",
      mobile:"",
      userid:"",
    }
  },
  methods:{
    setpwd(){
      if(this.username.length <= 0){
        this.$vux.toast.text('姓名不能为空')
      }else if(this.mobile.length <= 0){
        this.$vux.toast.text('手机号')
      }else if(!/[0-9]{11}/.test(this.mobile)){
        this.$vux.toast.text('请输入正确的手机号')
      }else{
        this.$http.post('/amoy/home/int',{
          id:this.userid,
          username:this.username,
          mobile:this.mobile 
        },true,true).then(res =>{
          if(res.code === 0){
            this.$vux.toast.text(res.msg);
            this.$router.push('/newactivities');
          }else{
            this.$vux.toast.text(res.msg);
          }
        })
      }
    }
  },
  mounted:function(){
    this.userid = utils.storage.get('userInfo').uid;
  }
}
</script>
<style scoped lang='less'>
  .bankdetailed{
   .containers{
     margin-top: .2rem;
     background: #fff;
     .bank_list_box{
       .em{
          min-height: 1rem;
          padding: 0 .2rem;
          border-bottom: 1px solid #eeeeee;
          line-height: 1rem;
          .name{
            width:1rem;
          }
          .name_int{
            input{
              background: #fff;
              font-size: 0.26rem;
              outline: none;
              border: none;
            }
          }
           .name_ints{
            textarea{
              width: 100%;
              background: #fff;
              font-size: 0.26rem;
              outline: none;
              border: none;
            }
          }
        }
     }

   } 
    .tixing{
      color:#999999;
      padding-left: .2rem;
      margin-top: .2rem;
    }
   .outpwd{
     text-align: right;
     padding-right: .2rem;
     margin-top: .2rem;
     color: #666;
   }
   .outpwds{
    width: 100%;
    height: .3rem;
    line-height: .3rem;
    background: #f63f37;
    text-align: center;
    color: #fff;
   }

.tocore{
      width: 5.22rem;
      height: .9rem;
      background:  linear-gradient(to right,#f97b65, #f63f37);
      margin: 1.3rem auto .5rem;
      text-align: center;
      line-height: .9rem; 
      font-size: .3rem;
      color: white;
      border-radius: .5rem;
    }
  }
  .lt{float: left;}
  .rt{float: right;}
   ul :nth-last-child(li){
      border:none;
    }
    .label2{
      background-size: .42rem .42rem;
      position: relative;
      .labelint{
        width: 6rem;
        border: none;
        background: rgba(0, 0, 0, 0);
        line-height: 0.6rem;
        margin: 0.25rem 0;
        font-size: 0.3rem;
        padding-left: 0.82rem;
      }

    }
</style>



