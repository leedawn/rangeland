<template>
  <div class="setting">
    <div class="ui secondary pointing menu">
      <router-link class="item" :to="{name:'myInfo'}">我的资料</router-link>
      <router-link class="item" :to="{name:'pictureUpload'}">头像</router-link>
      <a class="item">密码</a>
      <a class="item">账号绑定</a>
    </div>
    <router-view></router-view>
  </div>
</template>
<style scoped>
.setting {
  padding: 5%;
}
</style>
