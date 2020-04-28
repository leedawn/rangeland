<template>
  <div class="menu-wrapper">
    <button class="ui labeled icon button goback-button" @click="goBack()">
      <i class="left chevron icon"></i>
      返回
    </button>
    <template v-if="!isShow">
      <div class="default-status">
        <router-link class="item" to="/login">登录</router-link>
        <router-link class="item" to="/register">注册</router-link>
      </div>
    </template>
    <template v-else>
      <div class="login-status" @mouseover="show()" @mouseleave="hide()">
        <div class="login-info">
          <div class="user-info">
            {{userInfo.name}}
            <!-- {{userInfo.isVip}} -->
          </div>
          <img :src="userInfo.pic" class="user-image" />
          <div class="my-popup" v-show="hasMsg">您有{{num.message}}条未读消息</div>
        </div>
        <transition name="fade">
          <div class="dropdown-menu" v-show="isHover">
            <div class="item hover-style">
              <i class="cog icon"></i>
              <router-link :to="{name:'setting'}">个人设置</router-link>
            </div>
            <div class="item hover-style">
              <i class="bell outline icon"></i>
              <router-link :to="{name:'msg'}">我的消息</router-link>
            </div>
            <div class="item hover-style">
              <i class="home icon"></i>
              <router-link :to="{name:'center'}" class="my-page">我的主页</router-link>
            </div>
            <div class="divider-line"></div>
            <div class="item hover-style" href="javascript: void(0)" @click="logout()">退出</div>
          </div>
        </transition>
        <div class="my-message" v-show="num.message && num.message!==0">{{num.message}}</div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverCtrl: {},
      hasMsg: false
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
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('name:"index"')
    }
  },
  watch: {
    num (newval, oldval) {
      if (newval.event && newval !== oldval) {
        this.hasMsg = true
        setTimeout(() => {
          this.hasMsg = false
        }, 2000)
      }
    }
  },
  computed: {
    ...mapState({
      num: state => state.num
    }),
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
.goback-button {
  position: absolute;
  top: 10px;
  left: 7%;
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
  right: 7%;
  display: block;
  width: 150px;
}
.login-info {
  position: relative;
  left: 10px;
  transition: all 10s;
}
.user-info {
  display: inline-block;
  position: relative;
  right: 2px;
  top: -7px;
  color: white;
}
.user-image {
  position: relative;
  top: 5px;
  right: -20px;
  padding: 2px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.divider-line {
  position: relative;
  top: 6px;
  height: 1px;
  background-color: #e6e6e6;
}

.my-popup {
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  left: -13%;
  top: 68px;
}
.my-popup::after {
  content: '';
  position: absolute;
  top: -12px;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #555 transparent;
}

.dropdown-menu {
  position: relative;
  top: 20px;
  right: 2px;
  border: 1px solid #e2e2e2;
  text-align: center;
  background-color: white;
  width: 140px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
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
.hover-style {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.my-message {
  position: absolute;
  left: -35px;
  top: 15px;
  background-color: rgb(224, 113, 28);
  padding: 2px 4px;
  color: white;
}
</style>
