<template>
  <div class="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
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
/* .Content {
  display: flex;
  flex-flow: column nowrap;
} */
</style>
