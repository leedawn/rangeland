<template>
  <div class="my-info">
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <form class="ui form" method="post">
        <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
          <div class="inline field">
            <label>用户名</label>
            <input type="text" v-model="username" placeholder="请输入用户名" />
            <span class="error-message">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
          <div class="inline field extra-field">
            <label class="info-title">昵称</label>
            <input type="text" v-model="name" placeholder="请输入昵称" />
            <span class="error-message">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="inline field extra-field">
          <label>城市</label>
          <input type="text" v-model="location" placeholder="请输入城市名称" />
        </div>

        <div class="inline field extra-field">
          <label class="gender">性别</label>
          <div class="ui radio checkbox">
            <input type="radio" v-model="gender" value="man" />
            <label>男</label>
          </div>
          <div class="ui radio checkbox woman-checkbox">
            <input type="radio" v-model="gender" value="woman" />
            <label>女</label>
          </div>
        </div>

        <div class="inline field extra-field">
          <label>签名</label>
          <textarea v-model="regmark" rows="4" placeholder="随便说点什么"></textarea>
        </div>

        <button type="button" class="ui green button" @click="validate().then(submit)">确认修改</button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { updateUserInfo } from '@/api/user'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'myInfo',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      username: '',
      name: '',
      location: '',
      gender: '',
      regmark: ''
    }
  },
  mounted () {
    const {
      username,
      name,
      location,
      gender,
      regmark
    } = this.$store.state.userInfo
    console.log(
      'mounted -> this.$store.state.userInfo',
      this.$store.state.userInfo
    )
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || 'man'
    this.regmark = regmark || ''
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      updateUserInfo({
        username: this.username,
        name: this.name,
        location: this.location,
        gender: this.gender,
        regmark: this.regmark
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              username: this.username,
              name: this.name,
              location: this.location,
              gender: this.gender,
              regmark: this.regmark
            }
          })
          this.$alert('更新成功！')
        }
      })
    }
  }
}
</script>
<style scoped>
.my-info {
  position: relative;
  top: 10px;
}
.inline.field {
  position: relative;
  padding: 5px;
}
.extra-field {
  left: 12px;
}
.error-message {
  position: relative;
  top: 2px;
  left: 10px;
  color: red;
}
.woman-checkbox {
  position: relative;
  left: 50px;
}
.ui.form textarea {
  position: absolute;
  width: 80%;
}
.ui.green.button {
  position: relative;
  top: 100px;
  left: 50px;
}
</style>
