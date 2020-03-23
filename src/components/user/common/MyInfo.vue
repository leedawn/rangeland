<template>
  <div class="my_info">
    <ValidationObserver ref="observer" v-slot="{validate}">
      <div class="ui form error">
        <ValidationProvider name="username" rules="required|email" v-slot="{errors}">
          <div class="inline field">
            <label>邮箱</label>
            <input type="text" placeholder="请输入邮箱" v-model="username" />
            <!-- <div class="ui error message">{{errors[0]}}</div> -->
            <p>{{errors[0]}}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider name="name" rules="required" v-slot="{errors}">
          <div class="inline field">
            <label>昵称</label>
            <input type="text" placeholder="请输入昵称" v-model="name" />
            <p>{{errors[0]}}</p>
          </div>
        </ValidationProvider>
        <div class="inline field">
          <label>城市</label>
          <input type="text" placeholder="请输入城市名称" v-model="location" />
        </div>
        <div class="inline fields">
          <label for="gender">性别</label>
          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                name="gender"
                tabindex="0"
                class="hidden"
                v-model="gender"
                value="0"
              />
              <label>男</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                name="gender"
                tabindex="0"
                class="hidden"
                v-model="gender"
                value="1"
              />
              <label>女</label>
            </div>
          </div>
        </div>
        <div class="field">
          <label>签名</label>
          <textarea rows="6" placeholder="随便写些什么刷下存在感" v-model="regmark"></textarea>
        </div>
        <div class="ui submit button" @click="validate().then(submit)">确认修改</div>
      </div>
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
    console.log('mounted -> this.$store.state.userInfo', this.$store.state.userInfo)
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
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
              name: this.this.name,
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
</style>
