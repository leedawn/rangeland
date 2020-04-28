<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="code">
      <Input v-model="form.code" placeholder="请输入验证码">
        <span slot="prepend">
          <Icon :size="12" type="md-image"></Icon>
        </span>
        <span slot="append" v-html="svg" class="code-svg" @click.prevent="code"></span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    svg: {
      type: String,
      default: () => 'ha'
    },

    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { email: true, message: '格式不正确', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    },
    codeRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: '',
        code: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        code: this.codeRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            code: this.form.code,
            sid: this.$store.state.user.sid
          })
        }
      })
    },
    code () {
      this.$emit('getCode')
    }
  }
}
</script>
<style scoped>
.code-svg {
  display: inline-block;
  height: 20px;
  overflow: hidden;
  /* vertical-align: middle; */
  width: 120px;
}
.code-svg >>> svg {
  position: relative;
  width: 120px;
  top: -20px;
}
</style>
