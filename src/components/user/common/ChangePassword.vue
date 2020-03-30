<template>
  <div class="password-wrapper">
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <form class="ui form" method="post">
        <ValidationProvider name="password" rules="required|max:16|min:6" v-slot="{ errors }">
          <div class="field">
            <label>原来的密码</label>
            <input type="password" v-model="oldPassword" placeholder="请输入密码" />
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
            <label>新密码</label>
            <input type="password" v-model="newPassword" placeholder="请输入密码" />
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

        <button type="button" class="ui green button" @click="validate().then(submit)">修改密码</button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { changePassword } from '@/api/user'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'changePassword',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: ''
    }
  },
  mounted () {},
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      console.log('submit->userInfo', this.$store.state.userInfo)
      changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
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
          this.$alert('修改密码成功')
        } else if (res.code === 501) {
          this.$alert('原密码错误，请检查！')
        }
      })
    }
  },
  created () {}
}
</script>

<style scoped>
.password-wrapper {
  position: relative;
  top: 3px;
  width: 100%;
  height: 100%;
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
.ui.green.button {
  position: relative;
  top: 60px;
  left: 40px;
}
</style>
