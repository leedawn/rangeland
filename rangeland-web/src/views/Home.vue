<template>
  <div class="home">
    <div class="header">
      <page-header></page-header>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header'
export default {
  name: 'app',
  components: {
    'page-header': Header
  }
}
</script>
<style scoped>
.home {
  height: 100%;
}
.header {
  height: 60px;
  width: 100%;
  z-index: 100;
}
.content {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0px;
  z-index: 0;
}
</style>
