<template>
  <dic class="ui grid my_center">
    <div class="ui inverted vertical menu">
      <div v-for="(list,index) in lists" :key="'center'+index">
        <a class="item">
         <router-link :active-class="semantic-this" :to="{name:list.link}">  <!-- {name:list.link} -->
            <i :class="list.icon"></i>
            {{list.name}}
          </router-link>
        </a>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </dic>
</template>
<script>
export default {
  name: 'menu',
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
.my_center {
  background-color: darkgray;
  width: 100%;
  height: 1000px;
  margin-top: 1px;
}
.menu {
  position: absolute;
  left: 3%;
  top: 16%;
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
  left: 20%;
  top: 16%;
  width: 75%;
  height: 100%;
  background-color: white;
}
</style>
