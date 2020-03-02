<template>
  <div id="app">
    <div id="nav" class="ui top attached tabular menu">
      <router-link to="/" class="item" data-tab="home">Home</router-link>
      <router-link to="/imooc" class="item" data-tab="imooc">Imooc</router-link>
      <router-link to="/demo" class="item" data-tab="demo">Demo</router-link>
      <router-link to="/blog" class="item" data-tab="blog">Blog</router-link>
      <router-link to="/fever" class="item" data-tab="fever">fever</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>
