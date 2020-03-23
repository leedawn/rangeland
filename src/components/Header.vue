<template>
  <div class="ui inverted segment">
    <div class="ui inverted secondary menu">
      <template v-if="!isShow">
        <router-link class="right item" to="/login">login</router-link>
        <router-link class="item" to="/reg">Reg</router-link>
      </template>
      <template v-else>
        <div class="login-status">
          <div class="ui dropdown right item">
            <div class="text">
              {{userInfo.name}}
              {{userInfo.isVip}}
              <img :src="userInfo.pic" />
            </div>
            <div class="menu">
              <div class="item">个人设置</div>
              <div class="item">我的消息</div>
              <div class="item">我的主页</div>
              <div class="ui divider"></div>
              <div class="item" href="javascript: void(0)" @click="logout()">退出</div>
            </div>
          </div>
        </div>
      </template>
    </div>
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
<style scoped>
.ui.inverted.segment{
  background-color: #393d49
}
.login-status {
  float: right;
}
.ui.right.dropdown.item:hover .menu {
  display: block;
}
</style>
