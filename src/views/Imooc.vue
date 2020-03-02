<template>
  <div class="content">
    <div class="ui tabular menu">
      <router-link class="item" to="/imooc/login">login</router-link>
      <router-link class="item" to="/imooc/reg">Reg</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>
<style>
/* .Content {
  display: flex;
  flex-flow: column nowrap;
} */
</style>
