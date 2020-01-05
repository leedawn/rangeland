<template>
  <div id="app">
    <div id="nav" class="ui top attached tabular menu">
      <router-link to="/" class="item" data-tab="home">Home</router-link>
      <router-link to="/about" class="item" data-tab="about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>
