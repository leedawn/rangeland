<template>
  <div class="ui bottom attached tab segment active" data-tab="imooc">
    <!-- <alert :isShow="true"></alert>  :msg="这个是弹窗" -->
    <ValidationObserver ref="observer" v-slot="{ validate }">
    <form class="ui form imooc" method="post">
      <div class="field">
        <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
        <label class="field-name">用户名</label>
         <div class="row">
          <div class="col">
          <input v-model="username" type="text" class="form-control" placeholder="请输入用户名"/>
          </div>
          <div class="col">
            <label class="error form-check-label">
              {{ errors[0] }}
              <!-- <ul><li v-for="error in errors" :key="error.id">{{ error }}</li></ul> -->
            </label>
          </div>
         </div>
        </ValidationProvider>
      </div>
      <div class="field">
        <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <label class="field-name">密码</label>
        <div class="row">
          <div class="col">
        <input type="password" class="form-control" v-model="password" placeholder="请输入密码"/>
          </div>
          <div class="col">
            <label class="error form-check-label">
              {{errors[0]}}
            </label>
          </div>
        </div>
        </ValidationProvider>
      </div>
      <div class="field">
        <ValidationProvider name="code" ref="codefield" rules="required" v-slot="{ errors }">
        <label class="field-name">验证码</label>
        <div class="inline fields row">
          <div class="col code">
            <input
              type="text"
              class="form-control"
              v-model="code"
              placeholder="请输入验证码"
            />
          </div>
          <div class="col">
            <label class="" @click="_getCode()"  v-html="svg">{{svg}}</label>
          </div>
          <div class="col">
            <label class="error form-check-label">
              {{errors[0]}}
            </label>
          </div>
        </div>
        </ValidationProvider>
      </div>
      <button type="button" class="btn btn-primary" @click="validate().then(submit)">登录</button>
      <button type="button" class="btn btn-link"><router-link to="/imooc/forget">忘记密码</router-link></button>
    </form>
    </ValidationObserver>
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
      console.log('submit')
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
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
        } else if (res.code === 404) { // 觉得复制的代码有问题，因为这个状态服务端有返回
          this.$alert('用户名或密码错误')
        }
      }).catch((err) => {
        const data = err.response.data
        console.log(data)
        if (data.code === 404) { // it was 500
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

<style>
 .imooc {
  background: #f2f2f2;
  width: 600px;
  margin-top:40px;
  padding:10px;
  margin-left: 20px;
  border:4px;
}
input {
  margin: 10px;
  padding: 10px;
}
.code {
  width: 150px;
}
/* .about input {
  width: 190px;
  margin-left: 70px;
}
.about label {
  margin-left: -400px;
}

.svg {
  position: relative;
  top: -15px;
}
label.error {
  position: relative;
  margin-right: -150px;
  top: 10px;
  color:#000000
}
.field-name {
  color:#000000;
} */

</style>
