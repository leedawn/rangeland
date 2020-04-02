<template>
  <div class="sign-in">
    <div class="menu">
      <a class="item active-item">签到</a>
      <span class="vertical-bar"></span>
      <a class="item">说明</a>
      <span class="vertical-bar"></span>
      <a class="item">活跃榜</a>
      <div class="sign-in-days">
        已连续签到
        <span class="days">16</span>天
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="sign-in-info">
      <button class="ui red button">今日签到</button>
      <div class="kiss">
        可获得
        <span class="days">5</span>飞吻
      </div>
    </div>
  </div>
</template>
<style scoped>
.sign-in {
  position: relative;
  top: 20px;
  background-color: white;
  padding: 10px 0px;
}
.menu {
  position: relative;
}
.active-item {
  color: black;
}
.vertical-bar {
  position: relative;
  top: 3px;
  border: 0.5px solid #999;
}
.sign-in-days {
  position: absolute;
  top: 4px;
  right: 7px;
  color: #999;
}
.days {
  color: #ff5722;
}
.ui.divider {
  position: relative;
  top: 5px;
}
.sign-in-info {
  position: relative;
  padding: 10px 0px 12px;
}
.ui.red.button {
  position: relative;
  top: 5px;
  left: 90px;
}
.kiss {
  position: absolute;
  top: 25px;
  left: 200px;
}
</style>
