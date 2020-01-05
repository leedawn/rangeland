<template>
  <div class="ui bottom attached tab segment active" data-tab="about">
    <form class="ui form about">
      <ValidationObserver ref="form">
      <div class="field">
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <label class="field-name">用户名</label>
         <div class="row">
          <div class="col">
          <input v-model="name" type="text" class="form-control" placeholder="请输入用户名"/>
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
        <label class="field-name">密码</label>
        <input type="password" class="form-control" v-model="password" placeholder="请输入密码"/>
      </div>
      <div class="field">
        <label class="field-name">验证码</label>
        <div class="inline fields row">
          <div class="col code">
            <input
              type="text"
              class="form-control"
              v-model="code"
            />
          </div>
          <div class="col">
            <label class="" @click="_getCode()"  v-html="svg">{{svg}}</label>
          </div>
        </div>
      </div>
      </ValidationObserver>
      <button type="submit" class="btn btn-primary" @click="checkForm">登录</button>
      <button type="button" class="btn btn-link">忘记密码</button>
    </form>
  </div>
</template>
<script>
import { getCode } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'

export default {
  name: 'about',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      svg: '',
      name: '',
      password: '',
      code: '',
      errorMsg: [],
      value: ''
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
    console.log(sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    checkForm () {
      this.errorMsg = []
      if (!this.name) {
        this.errorMsg.push('登录为空！')
      }
      if (!this.password) {
        this.errorMsg.push('密码不能为空！')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空！')
      }
    }
  }
}
</script>

<style>
 .about {
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
