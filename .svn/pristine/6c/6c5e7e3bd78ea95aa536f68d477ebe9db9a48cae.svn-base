<template>
  <div class="rich-text">
    <div v-html="content" style="padding: .31rem .27rem;"></div>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'rich-text',
  data () {
    return {
      content: '',
      title: ''
    }
  },
  mounted () {
    this.getRule()
  },
  methods:{
      getRule () {
        this.$http.get('/mall/users/user-kpi').then(res => {
         if (res.code === 0) {
           this.content = res.data.rule;
        }
      }).catch((e) => {
        
      })
    },
  }
}
</script>
<style scoped lang="less">
.rich-text{
  background-color: #f7f7f7;
  height: 100%;
}
</style>
