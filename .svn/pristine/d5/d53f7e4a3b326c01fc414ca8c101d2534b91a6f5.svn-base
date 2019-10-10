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
    this.title = utils.storage.get('richText').title
    this.content = utils.storage.get('richText').content
    utils.storage.remove('richText')
  }
}
</script>
<style scoped lang="less">
.rich-text{
  background-color: #f7f7f7;
  height: 100%;
}
</style>
