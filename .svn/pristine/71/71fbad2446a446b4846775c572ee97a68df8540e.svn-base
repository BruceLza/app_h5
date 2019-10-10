<template>
  <div class="beginner-guider">
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'beginner-guider',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getInfo () {
      this.$http.get('/amoy/user/new-article-list', null, true).then(res => {
        this.content = res.data.content
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
