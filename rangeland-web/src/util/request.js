import HttpRequest from './axios'
import config from '@/config/index'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
console.log(baseUrl)
const axios = new HttpRequest(baseUrl)

export default axios
