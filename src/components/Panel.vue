<template>
  <div class="topbar">
    <div class="ui secondary menu">
      <a class="item active">首页</a>
      <a class="item">提问</a>
      <a class="item">分享</a>
      <a class="item">讨论</a>
      <a class="item">建议</a>
      <a class="item">公告</a>
      <a class="item">动态</a>
      <div class="right menu">
        <div class="item">
          <div class="ui icon input">
            <input type="text" placeholder="请输入搜索内容" />
            <i class="search link icon"></i>
          </div>
        </div>
        <div class="post-new-post">
          <button class="ui positive basic button">
            <router-link :to="{name:'add'}" class="post-button">发表新帖</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.topbar {
  position: absolute;
  background-color: white;
  top: 60px;
  left: 0%;
  width: 100%;
  height: 60px;
  padding: 0px 15px;
}
.post-new-post {
  margin-right: 30px;
  margin-top: 5px;
}
.ui.positive.basic.button {
  position: relative;
  top: 8px;
}
.ui.positive.basic.button a {
  color: #21ba45;
}
</style>
