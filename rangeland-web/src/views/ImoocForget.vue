<template>
  <div class="forget-wrapper">
    <div class="forget-content">
      <div class="tab">
        <router-link :to="{name:'login'}" class="tab-login">登录</router-link>
        <router-link :to="{name:'forget'}" class="tab-forget">找回密码</router-link>
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
              <input type="text" v-model="code" placeholder="请输入验证码" />
            </div>
            <div class="error-message extra-length">
              <p>{{ errors[0] }}</p>
            </div>
            <label class="code-message" @click="_getCode()" v-html="svg">{{svg}}</label>
          </ValidationProvider>

          <button type="button" class="ui green button" @click="validate().then(submit)">提交</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { getCode, forget } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'

export default {
  name: 'forget',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      svg: '',
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
      forget({
        username: this.username,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.username = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          this.$alert('提交成功，请注意查收邮件')
          setTimeout(() => {
            this.$router.push('/imooc/login')
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
.forget-wrapper {
  position: absolute;
  top: 60px;
  background-color: #e6e6e6;
  width: 100%;
  height: 100%;
}
.forget-content {
  position: absolute;
  top: 40px;
  left: 5%;
  background-color: white;
  width: 90%;
  padding: 10px;
  height: 400px;
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
.tab-forget {
  position: relative;
  left: 63px;
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
