<template>
  <div class="townsPicker" @click.stop="onClickTowns" >
    <popup-picker title="所在乡镇：" :data="townsList" v-model="value" :placeholder="placeholder" :columns="2" :show.sync="townsPickerSate"
                  :show-name="true" @on-shadow-change="onShadowChange"
    ></popup-picker>
  </div>
</template>

<script>
import { PopupPicker , Group } from 'vux'
import * as apiHttp from '@/api/index'

export default {
  name: 'townsPicker',
  props: {
    addresId: {
      type: Number,
      default: 0
    },
    region: Array,
    type: 0,
    town: Array
  },
  components: {
    PopupPicker,
    Group
  },
  data () {
    return {
      townsList: [],
      value: [],
      townsPickerSate: false,
      placeholder: '请选择乡镇'
    }
  },
  mounted () {
    if (this.type > 0) {
      this.townsList = [[{name: this.town[0], value: '001', parent: '001'}]]
      this.value = ['001']
      this.$emit('onSendAddress', this.town)
    }
  },
  methods: {
    onShowTown () {
      apiHttp.getTownsList(this.addresId).then ( res => {
        if (res.code === 0 ) {
          if ( res.data.length > 0 ) {
            this.townsList = [res.data]
            this.townsPickerSate = true
          } else {
            this.townsList = [[{name: this.region.slice(-1).join(), value: '001', parent: '001'}]]
            this.value = ['001']
            this.$emit('onSendAddress', this.region.slice(-1))
          }
        }
      })
    },
    onClickTowns () {
      if (this.region.length === 0){
        this.$vux.toast.text('请选择地区')
        this.townsPickerSate = false
        return
      } else {
        this.onShowTown()
      }
    },
    onShadowChange (ids, name) {
      this.$emit('onSendAddress', name)
    },
    clearData () {
      this.townsList = []
      this.value = []
    }
  }
}
</script>

<style lang="less">
  .townsPicker{
    .weui-cell{
      display: flex;
      padding: 14px 0;
      font-size: 0.28rem;
      border-bottom: 1px solid #f2f2f2
    }
  }
</style>
