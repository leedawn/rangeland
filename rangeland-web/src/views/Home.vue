<template>
  <div class="home background-gray">
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
<style>
/* home */
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
/* endHome */

/* color */
.font-green {
  color: #21ba45;
}
.font-black {
  color: #000;
}
.font-red {
  color: red;
}
.background-gray {
  background-color: #e6e6e6;
}
.background-white {
  background-color: #fff;
}
/* end color */

/* login/register/forget/reset wrapper */
.wrapper {
  position: absolute;
  top: 40px;
  left: 5%;
  width: 90%;
  padding: 10px;
  height: 420px;
}
.tab {
  position: relative;
  padding: 14px 20px;
  font-size: 17px;
}
.tab-left {
  position: relative;
  left: 18px;
}
.tab-right {
  position: relative;
  left: 80px;
}
.selected-line {
  position: absolute;
  top: 45px;
  width: 80px;
  border: 1px solid #21ba45;
  z-index: 1;
  cursor: default;
}
.normal-line {
  position: relative;
  top: 12px;
  border: 1px solid #e6e6e6;
}
.field {
  position: relative;
  top: 40px;
  left: 40px;
  width: 300px;
}
.error-message {
  position: absolute;
  left: 380px;
}
.extra-length {
  left: 540px;
}
.extra-message {
  position: absolute;
  top: 75px;
  left: 360px;
}
.code-message {
  position: relative;
  top: -20px;
  left: 350px;
}
.main-button {
  position: relative;
  top: 40px;
  padding: 15px;
}
.forget-password-button {
  position: relative;
  top: 40px;
  left: 60px;
}
/* login/register/forget/reset wrapper */
</style>
