<template>
  <div class="face">
    <div v-show="isShow">
      <ul>
        <li v-for="(value,key) in lists" :key="key" @click="handleFaceClick(key)">
          <img :src="value" alt />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import faces from '@/assets/js/face'
export default {
  name: 'face',
  props: ['isShow'], // 父组件传数据给子组件
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item) // 子组件触发父组件的事件
      this.$emit('closeEvent')
    }
  }
}
</script>
