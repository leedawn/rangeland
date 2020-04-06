import { extend, localize } from 'vee-validate'
import { email, required, min, max, length, confirmed, regex, is_not } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)
extend('regex', regex)
extend('is_not', is_not)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_filed_}'
  },
  names: {
    username: '邮箱',
    password: '密码',
    repassword: '确认密码',
    name: '昵称',
    code: '验证码',
    catalog: '专栏',
    title: '标题'
  },
  fields: {
    username: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}!!!'
    },
    name: {
      required: '请输入{_field_}!!!',
      min: '{_field_}至少4个字符'
    },
    password: {
      required: '请输入{_field_}!!!',
      min: '{_field_}至少需要6个字符',
      max: '{_field_}最多16个字符',
      confirmed: '{_field_}和确认密码不匹配'
    },
    repassword: {
      required: '请输入{_field_}!!!'
    },
    code: {
      required: '请输入{_field_}!!!',
      length: '{_field_}的长度必须为4'
    },
    catalog: {
      is_not: '专栏不能为空'
    },
    title: {
      required: '请输入{_field_}!!!'
    }
  }
})
