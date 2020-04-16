<template>
  <div class="ui grid my-center">
    <div class="ui inverted vertical menu">
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
    <div class="content">
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
.my-center {
  position: relative;
  top: -20px;
  height: 100%;
  background-color: #e6e6e6;
  margin-bottom: 160px;
  width: 100%;
  margin-top: 1px;
}
.menu {
  position: absolute;
  top: 50px;
  left: 7%;
  width: 15%;
  height: 100%;
  text-align: center;
  font-size: 20px;
}
i {
  position: relative;
  left: -2%;
}
.content {
  position: absolute;
  left: 25%;
  top: 50px;
  width: 68%;
  height: 100%;
  background-color: white;
}
</style>
