const axios = require('axios')

// axios.interceptors.request.use(function (config) {
//   console.log('before send')
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   console.log('before response')
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

// var instance = axios.create({
//   baseURL: 'http://localhost:3000/user/',
//   timeout: 1000
// })

// function getUserAccount () {
//   instance.get('account')
//     .then(function (response) {
//       console.log(response.status)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }

// function getUserPermission () {
//   instance.get('permission')
//     .then(function (response) {
//       console.log(response.status)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }

// axios.all([getUserAccount(), getUserPermission()])
//   .then(axios.spread(function () {
//     console.log('test')
//   }))

// var CancelToken = axios.CancelToken
// var source = CancelToken.source()

// axios.get('http://localhost:3000/user/account', {
//   cancelToken: source.token
// }).catch(function (thrown) {
//   if (axios.isCancel(thrown)) {
//     console.log('Request canceled', thrown.message)
//   } else {
//     // 处理错误
//   }
// })

// source.cancel('Operation canceled by the user.')

var nums = [12, 22, 32]
for (var num in nums) {
  console.log(num)
  console.log('...')
}
for (var num2 of nums) {
  console.log(num2)
}
