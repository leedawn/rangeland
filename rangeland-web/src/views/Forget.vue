<template>
  <div class="login-wrapper background-white">
    <div class="tab font-black">
      <router-link :to="{name:'login'}" class="tab-left font-black">登录</router-link>
      <router-link :to="{name:'forget'}" class="tab-right font-green">找回密码</router-link>
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
import { forget } from '@/api/login'
import codeMix from '@/mixin/code'

export default {
  name: 'forget',
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
  mixins: [codeMix],
  methods: {
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
            this.$router.push('/login')
          }, 2000)
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
.extra-line-right {
  left: 125px;
}
</style>
