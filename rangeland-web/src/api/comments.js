import axios from '@/util/request'
import qs from 'qs'

const getComments = (params) => axios.get('/public/comments?' + qs.stringify(params))

const addComment = (data) => axios.post('/comments/reply', { ...data })

export {
  getComments,
  addComment
}
