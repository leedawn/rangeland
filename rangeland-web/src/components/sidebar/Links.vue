<template>
  <div class="link-wrapper">
    <h3 class="sidebar-title">项目链接</h3>
    <div class="ui divider"></div>
    <div class="link-bottom">
      <router-link :to="{name:'game'}" class="link-info">游戏评分信息</router-link>
      <router-link :to="{name:'demo'}" class="link-info">Vue Demo</router-link>
      <router-link :to="{name:'ulikecam'}" class="link-info">剪映</router-link>
      <router-link :to="{name:'semantic'}" class="link-info">semantic</router-link>
      <router-link :to="{name:'blog-home'}" class="link-info">Blog</router-link>
      <router-link :to="{name:'fever'}" class="link-info">fever</router-link>
    </div>
  </div>
</template>
<style scoped>
</style>
