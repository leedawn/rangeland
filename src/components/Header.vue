<template>
  <div class="menu-wrapper">
    <template v-if="!isShow">
      <div class="default-status">
        <router-link class="item" to="/login">登录</router-link>
        <router-link class="item" to="/reg">注册</router-link>
      </div>
    </template>
    <template v-else>
      <div class="login-status">
        <div class="login-info">
          <div class="user-info">
            {{userInfo.name}}
            {{userInfo.isVip}}
          </div>
          <img :src="userInfo.pic" class="image" />
        </div>
        <div class="dropdown-menu">
          <div class="item">
            <i class="cog icon"></i>个人设置
          </div>
          <div class="item">
            <i class="bell outline icon"></i>我的消息
          </div>
          <div class="item">
            <i class="home icon"></i>
            <router-link :to="{name:'center'}" class="my-page">我的主页</router-link>
          </div>
          <div class="ui divider"></div>
          <div class="item" href="javascript: void(0)" @click="logout()">退出</div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  methods: {
    show () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout () {
      this.$confirm(
        '确定退出吗？',
        () => {
          localStorage.clear()
          this.$store.commit('setToken', '')
          this.$store.commit('setUserInfo', '')
          this.$store.commit('setIsLogin', false)
          this.$router.push({ name: 'index' }, () => {})
        },
        () => {}
      )
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return (
        this.$store.state.userInfo || {
          name: '',
          pic: '',
          isVip: '0'
        }
      )
    }
  }
}
</script>
<style>
.menu-wrapper {
  position: fixed;
  top: 0px;
  height: 60px;
  width: 100%;
  background-color: #3d3d49;
  z-index: 100;
}
.default-status {
  position: absolute;
  top: 13px;
  right: 130px;
  color: #e6e6e6;
}
.default-status .item {
  color: rgba(255, 255, 255, 0.7);
}

.login-status {
  position: absolute;
  top: 5px;
  right: 40px;
  display: block;
}
.login-info {
  transition: all 10s;
}
.user-info {
  display: inline-block;
  position: relative;
  right: 20px;
  top: -7px;
  color: white;
}
.image {
  position: relative;
  top: 5px;
  padding: 2px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.dropdown-menu {
  position: relative;
  top: 20px;
  right: 20px;
  border: 1px solid #e2e2e2;
  text-align: center;
  box-shadow: 2px 2px 0.2px #e2e2e2;
  visibility: visible;
}
/* .login-info:hover + .dropdown-menu {
  visibility: visible;
  transform:scale(1.1)
} */
.item {
  position: relative;
  top: 5px;
  padding: 10px 18px;
  font-size: 15px;
}
.item:hover {
  background-color: #e2e2e2;
  transition: all 5s;
}
</style>
