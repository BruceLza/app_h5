<template>
    <div class="p-rule">
       <div class="rich" v-html="details.sendRules"></div>
    </div>
</template>
<script>
import { XHeader} from 'vux'
import * as apiHttp from '../../../api/index'
  export default {
    name: 'mallFacialRule',
    components:{
      XHeader
    },
    data () {
      return{
          text:'',
          details:''
      }
    },
    mounted(){
       this.facialDetail()
    },
    methods:{
      facialDetail(){
         apiHttp.goodsDetail(this.$route.query.id).then(res => {
           this.details = res.data.detail;
         })
       }
    }
  }
</script>
<style scoped>
  .rich{
      padding:2vw;
      font-size:3.5vw;
  }
</style>

