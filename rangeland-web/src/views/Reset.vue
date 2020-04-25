<template>
  <div class="login-wrapper background-white">
    <div class="tab">
      <router-link :to="{name:'login'}" class="tab-left font-black">登录</router-link>
      <router-link :to="{name:'reset'}" class="tab-right font-green">重置密码</router-link>
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
            <input type="text" v-model="code" placeholder="请输入验证码" />
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
        >提交</button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { reset } from '@/api/login'
import codeMix from '@/mixin/code'

export default {
  name: 'reset',
  data () {
    return {
      errorMsg: [],
      value: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  mixins: [codeMix],
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      reset({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setToken', res.token)
          this.username = ''
          this.password = ''
          this.passwordConfirmation = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          this.$alert('密码重置成功')
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 3000) // 如果时间是 1000 的话，会出现 $store.commit 来不及操作的问题
        } else if (res.code === 401) {
          this.$alert('验证码错误，请检查！')
        } else if (res.code === 500) {
          this.$alert('该邮箱未注册，请检查！')
        }
      })
    }
  },
  created () {}
}
</script>

<style scoped>
.login-wrapper {
  height: 508px;
}
.extra-line-right {
  left: 125px;
}
</style>
