import axios from '@/util/request'
import qs from 'qs'

const getComents = (params) => axios.get('/public/comments?' + qs.stringify(params))

const addComment = (data) => axios.post('/comments/reply', { ...data })

export {
  getComents,
  addComment
}
