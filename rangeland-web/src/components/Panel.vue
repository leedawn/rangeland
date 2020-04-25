<template>
  <div class="topbar-container background-white">
    <div class="ui secondary menu topbar-menu">
      <div v-for="(list,index) in lists" :key="'panel'+index">
        <router-link class="item" :to="list.path">{{list.name}}</router-link>
      </div>
      <!-- <a class="item active">首页</a> -->
      <!-- <a class="item">提问</a> -->
      <div class="right menu topbar-right-menu">
        <div class="item search-input">
          <div class="ui icon input">
            <input type="text" placeholder="请输入搜索内容" />
            <i class="search link icon"></i>
          </div>
        </div>
        <div class="new-post">
          <button class="ui positive basic button">
            <router-link :to="{name:'add'}" class="font-green">发表新帖</router-link>
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
          path: '/'
        },
        {
          name: '提问',
          path: '/index/ask'
        },
        {
          name: '分享',
          path: '/index/share'
        },
        {
          name: '讨论',
          path: '/index/discuss'
        },
        {
          name: '建议',
          path: '/index/advise'
        }
        // },
        // {
        //   name: '公告',
        //   path: '/index/notice'
        // },
        // {
        //   name: '动态',
        //   path: '/index/dynamic'
        // }
      ]
    }
  }
}
</script>
<style scoped>

</style>
