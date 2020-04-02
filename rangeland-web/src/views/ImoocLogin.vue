<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="tab">
        <router-link :to="{name:'login'}" class="tab-login">登录</router-link>
        <router-link :to="{name:'register'}" class="tab-register">注册</router-link>
        <hr class="selected-line" />
        <hr class="normal-line" />
      </div>
      <ValidationObserver ref="observer" v-slot="{ validate }">
        <form method="post" class="ui form">
          <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
            <div class="field">
              <label>用户名</label>
              <input type="text" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="error-message">
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider name="password" rules="required|max:16|min:6" v-slot="{ errors }">
            <div class="field">
              <label>密码</label>
              <input type="password" v-model="password" placeholder="请输入密码" />
            </div>
            <div class="error-message">
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="code"
            ref="codefield"
            rules="required|length:4"
            v-slot="{ errors }"
          >
            <div class="field">
              <label>验证码</label>
              <input type="text" v-model="code" placeholder="请再次验证码" />
            </div>
            <div class="error-message extra-length">
              <p>{{ errors[0] }}</p>
            </div>
            <label class="code-message" @click="_getCode()" v-html="svg">{{svg}}</label>
          </ValidationProvider>

          <button type="button" class="ui green button" @click="validate().then(submit)">立即登录</button>
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
  height: 100%;
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
.tab-register {
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
  top: 40px;
  left: 40px;
  width: 300px;
}
.error-message {
  position: absolute;
  left: 380px;
  color: red;
}
.extra-length {
  left: 540px;
}

.extra-message {
  position: absolute;
  top: 75px;
  left: 360px;
}
.code-message {
  position: relative;
  top: -20px;
  left: 350px;
}
.ui.green.button {
  position: relative;
  top: 40px;
  padding: 15px;
}
.forget-password {
  position: relative;
  top: 40px;
  left: 60px;
  color: black;
}
</style>
