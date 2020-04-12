<template>
  <div class="my-post">
    <div class="ui top attached tabular menu">
      <router-link class="item" :to="{name:'myPost'}" exact>我的发帖</router-link>
      <router-link class="item" :to="{name:'myCollect'}" exact>我收藏的帖</router-link>
    </div>
    <div class="ui bottom attached tab segment post-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.ui .tab {
  display: block;
}
</style>
