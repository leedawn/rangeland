<template>
  <div class="register-wrapper">
    <div class="register-content">
      <div class="tab">
        <router-link :to="{name:'login'}" class="tab-login">登录</router-link>
        <router-link :to="{name:'register'}" class="tab-register">注册</router-link>
        <hr class="selected-line" />
        <hr class="normal-line" />
      </div>
      <ValidationObserver ref="observer" v-slot="{ validate }">
        <form class="ui form" method="post">
          <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
            <div class="field">
              <label>用户名</label>
              <input type="text" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="error-message extra-length">
              <p>{{ errors[0] }}</p>
            </div>
            <div class="extra-message">该用户名作为唯一登录名</div>
          </ValidationProvider>

          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <div class="field">
              <label>昵称</label>
              <input type="text" v-model="name" placeholder="请输入昵称" />
            </div>
            <div class="error-message">
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required|max:16|min:6|confirmed:confirmation"
            v-slot="{ errors }"
          >
            <div class="field">
              <label>密码</label>
              <input type="password" v-model="password" placeholder="请输入密码" />
            </div>
            <div class="error-message">
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="repassword"
            vid="confirmation"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="field">
              <label>确认密码</label>
              <input type="password" v-model="passwordConfirmation" placeholder="请再次输入密码" />
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

          <button type="button" class="ui green button" @click="validate().then(submit)">立即注册</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { getCode, reg } from '@/api/login'
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
      name: '',
      password: '',
      code: '',
      errorMsg: [],
      value: '',
      username: '',
      passwordConfirmation: ''
    }
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
    _getCode () {
      const sid = this.$store.state.sid
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
      reg({
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.username = ''
          this.name = ''
          this.password = ''
          this.repassword = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 1000)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  },
  created () {}
}
</script>

<style scoped>
.register-wrapper {
  position: absolute;
  top: 60px;
  background-color: #e6e6e6;
  width: 100%;
  height: 730px;
}
.register-content {
  position: absolute;
  top: 40px;
  left: 5%;
  background-color: white;
  width: 90%;
  padding: 10px;
  height: 600px;
}
.tab {
  position: relative;
  padding: 14px 20px;
  color: black;
  font-size: 17px;
}
.tab-login {
  position: relative;
  color: black;
  left: 18px;
}
.tab-register {
  position: relative;
  left: 80px;
  color: #009688;
}
.selected-line {
  position: absolute;
  top: 45px;
  left: 115px;
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
</style>
