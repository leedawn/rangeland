<template>
  <div class="tips">
    <div class="title">
      <h3>温馨通道</h3>
    </div>
    <div class="ui divider"></div>
    <ul>
      <li v-for="(item,index) in lists" :key="'tips'+index">
        <a :href="item.link" target="_blank">{{item.title}}</a>
        test
      </li>
    </ul>
  </div>
</template>
<script>
import { getTips } from '../../api/content'
export default {
  name: 'tips',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>
<style scoped>
.tips {
  position: relative;
  top: 0px;
  background-color: white;
  padding: 10px 0px;
}
.title {
  margin: 4px 15px;
}
</style>
