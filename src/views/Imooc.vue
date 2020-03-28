<template>
  <div class="app">
    <div class="header">
    <imooc-header></imooc-header>
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
    'imooc-header': Header
  }
}
</script>
<style>
.header{
  z-index:100;
}
.content{
  z-index:-1;
}
</style>
