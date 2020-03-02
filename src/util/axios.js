import axios from 'axios'
import errorHandle from './errorHandle'
// import config from '@/config/index'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  interceptors (instance) {
    instance.interceptors.request.use((config) => {
      console.log('config:' + config)
      return config
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use((res) => {
      console.log('res is: ' + res)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      debugger
      errorHandle(err)
      return Promise.reject(err)
    })
  }

  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    console.log(newOptions)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    console.log(options)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data

    })
  }
}

// const instance = axios.create({
//   baseURL: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   timeout: 10000
// })

export default HttpRequest
