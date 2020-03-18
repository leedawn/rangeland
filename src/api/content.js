import qs from 'qs'
import axios from '@/util/request'

const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

const getTips = () => {
  return axios.get('/public/tips')
}

const getTop = () => {
  return axios.get('/public/topWeek')
}

const getLinks = () => {
  return axios.get('/public/links')
}

const uploadImg = (formData) => axios.post('/content/upload', formData)

const addPost = (data) => axios.post('/content/add', { ...data })

const getDetail = (tid) => axios.get('/public/content/detail?tid=' + tid)

export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadImg,
  addPost,
  getDetail
}
