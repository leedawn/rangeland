<template>
  <div class="top-wrapper" v-show="lists.length > 0">
    <div class="menu">
      <label>置顶</label>
      <!-- <a href="#signin">去签到</a> -->
    </div>
    <div class="ui divider"></div>
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
.top-wrapper {
  position: relative;
  background-color: white;
  width: 100%;
}
.menu {
  position: relative;
  top: 12px;
  font-size: 15px;
  margin-left: 20px;
}
.ui.divider {
  position: relative;
  top: 13px;
}
</style>
