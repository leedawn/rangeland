<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="tab">
        <router-link :to="{name:'login'}" class="tab-login">登录</router-link>
        <router-link :to="{name:'regin'}" class="tab-regin">注册</router-link>
        <hr class="selected-line" />
        <hr class="normal-line" />
      </div>
      <ValidationObserver ref="observer" v-slot="{ validate }">
        <form method="post">
          <div class="field">
            <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
              <label class="field-name">用户名</label>
              <input v-model="username" type="text" class="form-input" placeholder="请输入用户名" />
              <label class="error-info">
                {{ errors[0] }}
                <!-- <ul><li v-for="error in errors" :key="error.id">{{ error }}</li></ul> -->
              </label>
            </ValidationProvider>
          </div>
          <div class="field">
            <ValidationProvider name="password" rules="required" v-slot="{ errors }">
              <label class="field-name password-label">密码</label>
              <input type="password" class="form-input" v-model="password" placeholder="请输入密码" />
              <label class="error-info">{{errors[0]}}</label>
            </ValidationProvider>
          </div>
          <div class="field">
            <ValidationProvider name="code" ref="codefield" rules="required" v-slot="{ errors }">
              <label class="field-name">验证码</label>
              <input type="text" class="form-input" v-model="code" placeholder="请输入验证码" />
              <label class="code" @click="_getCode()" v-html="svg">{{svg}}</label>
              <label class="error-info error-code">{{errors[0]}}</label>
            </ValidationProvider>
          </div>
          <button type="button" class="login-button" @click="validate().then(submit)">立即登录</button>
          <router-link :to="{name:'forget'}" class="forget-password">忘记密码</router-link>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { getCode, login } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import Alert from '@/components/modules/alert/Alert'
import uuid from 'uuid/v4'

export default {
  name: 'imooc',
  components: {
    ValidationProvider,
    ValidationObserver
    // Alert
  },
  data () {
    return {
      svg: '',
      username: '',
      password: '',
      code: '',
      errorMsg: [],
      value: ''
    }
  },
  mounted () {
    // window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    console.log(sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      console.log(sid)
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      })
        .then(res => {
          console.log(res.data)
          if (res.code === 200) {
            this.$store.commit('setUserInfo', res.data)
            this.$store.commit('setIsLogin', true)
            this.$store.commit('setToken', res.token)
            this.username = ''
            this.password = ''
            this.code = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
            this.$router.push({ name: 'index' })

            // setTimeout(() => {
            //   this.$router.push('/imooc')
            // }, 1000)
          } else if (res.code === 401) {
            this.$refs.codefield.setErrors([res.msg])
          } else if (res.code === 404) {
            // 觉得复制的代码有问题，因为这个状态服务端有返回
            this.$alert('用户名或密码错误')
          }
        })
        .catch(err => {
          const data = err.response.data
          console.log(data)
          if (data.code === 404) {
            // it was 500
            this.$alert('用户名密码校验失败，请检查')
          } else {
            this.$alert('服务器错误')
          }
          console.log(err.response)
        })
    }
  },
  created () {
    // console.log(uuid)
  }
}
</script>

<style scoped>
.login-wrapper {
  position: absolute;
  top: 60px;
  background-color: #e6e6e6;
  width: 100%;
  height: 900px;
}
.login-content {
  position: absolute;
  top: 40px;
  left: 5%;
  background-color: white;
  width: 90%;
  padding: 10px;
  height: 420px;
}
.tab {
  position: relative;
  padding: 14px 20px;
  color: black;
  font-size: 17px;
}
.tab-login {
  position: relative;
  color: #009688;
  left: 18px;
}
.tab-regin {
  position: relative;
  left: 80px;
  color: black;
}
.selected-line {
  position: absolute;
  top: 45px;
  width: 70px;
  border: 1px solid #009688;
  z-index: 1;
  cursor: default;
}
.normal-line {
  position: relative;
  top: 12px;
  border: 1px solid #e6e6e6;
}
.field {
  position: relative;
  top: 20px;
  left: 20px;
}
.field-name {
  position: relative;
  border: 1px solid #e6e6e6;
  padding: 9px 35px 10px;
  background-color: #fbfbfb;
  width: 120px;
  text-align: center;
}
.form-input {
  position: relative;
  top: 0px;
  left: -11px;
  border: 1px solid #e6e6e6;
  width: 189px;
}
.error-info {
  color: red;
}
.password-label {
  padding: 9px 43px 10px;
}
.code {
  position: absolute;
}
.error-code {
  position: relative;
  left: 180px;
}
.login-button {
  position: relative;
  top: 60px;
  left: 40px;
  background-color: #009688;
  color: white;
  padding: 7px 15px;
}
.forget-password {
  position: relative;
  top: 60px;
  left: 70px;
  color: black;
}
</style>
