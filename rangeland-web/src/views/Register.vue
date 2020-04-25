<template>
  <div class="login-wrapper background-white">
    <div class="tab">
      <router-link :to="{name:'login'}" class="tab-left font-black">登录</router-link>
      <router-link :to="{name:'register'}" class="tab-right font-green">注册</router-link>
      <hr class="selected-line extra-line-right" />
      <hr class="normal-line" />
    </div>
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <form class="ui form" method="post">
        <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
          <div class="field">
            <label>用户名</label>
            <input type="text" v-model="username" placeholder="请输入用户名" />
          </div>
          <div class="error-message extra-length font-red">
            <p>{{ errors[0] }}</p>
          </div>
          <div class="extra-message">该用户名作为唯一登录名</div>
        </ValidationProvider>

        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
          <div class="field">
            <label>昵称</label>
            <input type="text" v-model="name" placeholder="请输入昵称" />
          </div>
          <div class="error-message font-red">
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
          <div class="error-message font-red">
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
          <div class="error-message font-red">
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
          <div class="error-message extra-length font-red">
            <p>{{ errors[0] }}</p>
          </div>
          <label class="code-message" @click="_getCode()" v-html="svg">{{svg}}</label>
        </ValidationProvider>

        <button
          type="button"
          class="ui green button main-button"
          @click="validate().then(submit)"
        >立即注册</button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { reg } from '@/api/login'
import codeMix from '@/mixin/code'

export default {
  name: 'register',
  mixins: [codeMix],
  data () {
    return {
      name: '',
      password: '',
      errorMsg: [],
      value: '',
      username: '',
      passwordConfirmation: ''
    }
  },
  methods: {
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
          requestAnimationFrame((m) => {
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
.login-wrapper {
  height: 578px;
}
.extra-line-right {
  left: 115px;
}
</style>
