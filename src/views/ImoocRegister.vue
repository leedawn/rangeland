<template>
  <div class="ui bottom attached tab segment active" data-tab="imooc">
    <ValidationObserver ref="observer" v-slot="{ validate }">
    <form class="ui form imooc" method="post">
      <div class="field">
        <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
        <label class="field-name">用户名</label>
         <div class="row">
          <div class="col">
          <input v-model="username" type="text" class="form-control" placeholder="请输入用户名"/>
          <p>该用户名作为唯一登录名</p>
          </div>
          <div class="col">
            <label class="error form-check-label">
              {{ errors[0] }}
            </label>
          </div>
         </div>
        </ValidationProvider>
      </div>
      <div class="field">
        <ValidationProvider name="name" rules="regex:/^[0-9]+$/ " v-slot="{ errors }">
        <label class="field-name">昵称</label>
         <div class="row">
          <div class="col">
          <input v-model="name" type="text" class="form-control" placeholder="请输入昵称"/>
          </div>
          <div class="col">
            <label class="error form-check-label">
              {{ errors[0] }}
            </label>
          </div>
         </div>
        </ValidationProvider>
      </div>
      <div class="field">
        <ValidationProvider name="password" rules="required|max:16|min:6|confirmed:confirmation" v-slot="{ errors }">
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
        <ValidationProvider name="repassword" vid="confirmation" rules="required" v-slot="{ errors }">
        <label class="field-name">确认密码</label>
        <div class="row">
          <div class="col">
        <input type="password" class="form-control" v-model="passwordConfirmation" placeholder="请输入密码"/>
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
        <ValidationProvider name="code" ref="codefield" rules="required|length:4" v-slot="{ errors }">
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
      <button type="button" class="btn btn-primary" @click="validate().then(submit)">立即注册</button>
    </form>
    </ValidationObserver>
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
      reg({
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
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
            this.$router.push('/imooc/login')
          }, 1000)
          console.log(res)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  },
  created () {
  }
}
</script>

<style>
 .imooc {
  background: #f2f2f2;
  width: 800px;
  margin-top:40px;
  padding:10px;
  margin-left: 20px;
  border:4px;
}
.field {
  width:500px;
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
