<template>
  <div class="topbar">
    <div class="ui secondary menu">
      <div v-for="(list,index) in lists" :key="'panel'+index">
        <router-link class="item" :to="list.path">{{list.name}}</router-link>
      </div>
      <!-- <a class="item active">首页</a> -->
      <!-- <a class="item">提问</a> -->
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
<script>
export default {
  name: 'topbar',
  data () {
    return {
      lists: [
        {
          name: '首页',
          path: '/',
          isNew: false
        },
        {
          name: '提问',
          path: '/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/share',
          isNew: false
        },
        {
          name: '讨论',
          path: '/discuss',
          isNew: false
        },
        {
          name: '建议',
          path: '/advise',
          isNew: false
        },
        {
          name: '公告',
          path: '/notice',
          isNew: false
        },
        {
          name: '动态',
          path: '/dynamic',
          isNew: false
        }
      ]
    }
  }
}
</script>
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
