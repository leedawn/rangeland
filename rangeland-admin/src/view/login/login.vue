<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form :svg="svg" @on-success-valid="handleSubmit" @getCode="_getCode"></login-form>
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
    console.log('mounted -> sid', sid)
    this.$store.commit('setSid', sid)
    this._getCode()
    console.log('svg', this.svg)
  },
  methods: {
    ...mapActions(['handleLogin']), // getUserInfo
    handleSubmit ({ userName, password, code, sid }) {
      this.handleLogin({ userName, password, code, sid }).then(res => {
        console.log('handleSubmit -> res', res)
        // this.getUserInfo().then(res => {
        this.$router.push({
          name: this.$config.homeName
        })
        // })
      })
    },
    _getCode () {
      const sid = this.$store.state.user.sid
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
