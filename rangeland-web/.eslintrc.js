module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',  //本来是 error ，现在先使用off 
    'camelcase': 'off'   // 关闭强制驼峰命名
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
