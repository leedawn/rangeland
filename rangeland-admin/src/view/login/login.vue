<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form :svg="svg" @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import uuid from 'uuid/v4'

import { getCode } from '@/api/user'
export default {
  data () {
    return {
      svg: ''
    }
  },
  components: {
    LoginForm
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit ({ userName, password, code }) {
      this.handleLogin({ userName, password, code }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
</script>

<style>
</style>
