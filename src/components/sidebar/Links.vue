<template>
  <div class="friendly-link">
    <h3>项目链接</h3>
    <div class="ui divider"></div>
    <div class="links">
      <router-link :to="{name:'home'}" class="link-info">游戏评分信息</router-link>
      <router-link :to="{name:'demo'}" class="link-info">Vue Demo</router-link>
      <router-link :to="{name:'ulikecam'}" class="link-info">剪映</router-link>
      <router-link :to="{name:'semantic'}" class="link-info">semantic</router-link>
      <router-link :to="{name:'blog-home'}" class="link-info">Blog</router-link>
      <router-link :to="{name:'blog-home'}" class="link-info">fever</router-link>
    </div>
  </div>
</template>
<style scoped>
.friendly-link {
  position: relative;
  top: 80px;
  padding: 10px 0px;
  background-color: white;
  width: 100%;
}
.friendly-link h3 {
  margin: 4px 15px;
}
.links {
  margin: 4px 15px;
}
.link-info {
  margin-right: 10px;
}
</style>
