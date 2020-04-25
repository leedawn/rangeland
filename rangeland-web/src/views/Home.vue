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
<style lang="scss">
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
  color: #ff5722;
}
.background-gray {
  background-color: #e6e6e6;
}
.background-white {
  background-color: #fff;
}
/* end color */

/* login/register/forget/reset wrapper */
.login-wrapper {
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

/* homepage panel/sidebar wrapper */
.homepage-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.post-content {
  height: 100%;
  position: relative;
  top: 20px;
  width: 86%;
  left: 2.5%;
}
.post-list {
  position: absolute;
  left: 5%;
  width: 66%;
  height: 100%;
}
.sidebar {
  position: absolute;
  left: 73%;
  width: 33%;
}

.topbar-container {
  position: relative;
  top: 0px;
  left: 0%;
  width: 100%;
  height: 60px;
  padding: 0px 15px;
}
.topbar-menu {
  position: relative;
  left: 7%;
  top: 6px;
  width: 90%;
}
.topbar-right-menu {
  position: absolute;
  left: 60%;
  width: 40%;
}
.search-input {
  position: relative;
  top: 1px;
}
.new-post {
  position: relative;
  left: 0%;
  top: 6px;
}

.tips-wrapper {
  position: relative;
  top: 0px;
  background-color: white;
  padding: 10px 0px;
}
.sidebar-title {
  margin: 4px 15px;
}
.signin-wrapper {
  position: relative;
  top: 20px;
  background-color: white;
  padding: 10px 0px;
}
.signin-menu {
  position: relative;
}
.vertical-line {
  position: relative;
  top: 3px;
  border: 0.5px solid #999;
}
.signin-days {
  position: absolute;
  top: 4px;
  right: 7px;
  color: #999;
}
.signin-info {
  position: relative;
  padding: 10px 0px 12px;
}
.signin-today {
  position: relative;
  top: 5px;
  left: 90px;
}
.signin-kiss {
  position: absolute;
  top: 25px;
  left: 200px;
}
.hot-discussion-wrapper {
  position: relative;
  top: 40px;
  padding: 10px 0px;
  background-color: white;
  width: 100%;
}
.sidebar-title {
  margin: 4px 15px;
}
.ads-wrapper {
  position: relative;
  top: 60px;
  padding: 10px 0px;
  width: 100%;
  background-color: white;
}
.ads-bottom {
  position: relative;
  text-align: center;
}
.ads-title {
  display: block;
  position: relative;
  margin: 7px 15px;
  padding: 15px;
  height: 50px;
  background-color: #5fb878;
  color: white;
  font-size: 20px;
}
.link-wrapper {
  position: relative;
  top: 80px;
  padding: 10px 0px;
  background-color: white;
  width: 100%;
}
.link-bottom {
  margin: 4px 15px;
}
.link-info {
  margin-right: 10px;
}
/* end homepage panel/sidebar wrapper */

/* homepage list wrapper */
.top-wrapper {
  position: relative;
  background-color: white;
  width: 100%;
}
.top-menu {
  position: relative;
  top: 12px;
  font-size: 15px;
  margin-left: 20px;
  height: 30px;
}
.list-container {
  background-color: white;
  position: relative;
  top: 20px;
  width: 100%;
  height: auto;
  margin-bottom: 50px;
}
.list-menu {
  position: relative;
  padding: 8px 0px 6px;
  height:30px;
}
.item-right {
  left: 40%;
}

.item-wrapper {
  position: relative;
  top: 0px;
}
.item-top {
  position: relative;
}
.item-pic {
  position: relative;
  padding: 0px 10px 8px;
  img {
    width: 50px;
  }
}

.item-right-wrapper {
  position: absolute;
  top: 20px;
  left: 80px;
  width: 100%;
}
.item-header {
  position: relative;
  .post-catalog {
    position: relative;
    color: #5fb878;
    border: 1px solid #5fb878;
    width: 40px;
    padding: 2px 5px;
  }
  .post-title {
    position: absolute;
    top: 1px;
    left: 60px;
    font-size: 15px;
  }
  .post-tag {
    position: absolute;
    top: 1px;
    right: 18%;
  }
}
.item-description {
  position: relative;
  top: 9px;
  .name {
    position: relative;
    color: gray;
  }
  .time {
    position: relative;
    left: 8px;
    color: #999;
  }
  .tag {
    position: relative;
    top: -30px;
    left: 83%;
  }
  .fav {
    position: absolute;
    left: 160px;
    color: red;
  }
  .answer {
    position: absolute;
    top: 2px;
    left: 80%;
    color: #999;
  }
}
.item-bottom {
  height: 58px;
}
.more-answer {
  position: relative;
  left: 45%;
  top: 15px;
  padding: 10px;
  border: 1px solid #009e94;
  color: black;
  cursor: pointer;
}
.no-more {
  position: relative;
  left: 45%;
  top: 15px;
  padding: 10px;
  color: #999;
}
/* end homepage list wrapper */
</style>
