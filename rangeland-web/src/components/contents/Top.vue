<template>
  <div class="top-wrapper" v-show="lists.length > 0">
    <div class="top-menu">
      <label>置顶</label>
      <!-- <a href="#signin">去签到</a> -->
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>
<script>
import listMix from '@/mixin/list'
import ListItem from './ListItem'
export default {
  name: 'top',
  mixins: [listMix],
  data () {
    return {
      isTop: 1
    }
  },
  components: {
    ListItem
  }
}
</script>
<style scoped>
</style>
