<template>
  <div class="face">
    <div class="model" v-show="isShow">
      <ul class="face-lists">
        <li v-for="(value,key) in lists" :key="key" @click="handleFaceClick(key)" class="face-item">
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
<style scoped>
.model{
    position:absolute;
    top:230px;
    left:55px;
    width:382px;
    background-color:white;
    box-shadow:10px 10px 5px #e6e6e6;
    border:1px solid #e6e6e6;
}
.face-lists{
    position: relative;
    right: 26px;
    top: -4px;
    list-style-type: none;
}
.face-item {
    display:inline-block;
    border:1px solid #e6e6e6;
    padding:2px;
}
.face-item:hover {
    border:1px solid red;
}
</style>
