<template>
  <div class="ui grid my-center">
    <div class="ui inverted vertical menu center-menu">
      <div v-for="(list,index) in lists" :key="'center'+index">
        <a class="item">
          <router-link :to="{name:list.link}">
            <!-- {name:list.link} -->
            <i :class="list.icon"></i>
            {{list.name}}
          </router-link>
        </a>
      </div>
    </div>
    <div class="center-content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-center',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'home icon',
          link: 'index'
        },
        {
          name: '用户中心',
          icon: 'user outline icon',
          link: 'userCenter'
        },
        {
          name: '基本设置',
          icon: 'edit outline icon',
          link: 'setting'
        },
        {
          name: '我的帖子',
          icon: 'file outline icon',
          link: 'posts'
        },
        {
          name: '我的消息',
          icon: 'comments outline icon',
          link: 'msg'
        },
        {
          name: '其他设置',
          icon: 'file outline icon',
          link: 'others'
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
