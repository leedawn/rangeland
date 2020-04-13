import axios from '@/util/request'
import qs from 'qs'

const userSign = () => axios.get('/user/fav')

const updateUserInfo = (data) => axios.post('/user/basic', data)

const changePassword = (data) => axios.post('/user/changePassword', data)

const getMsg = (data) => axios.get('/user/getMsg?' + qs.stringify(data))

const setMsg = (data) => axios.get('/user/setMsg?' + qs.stringify(data))

const addCollect = (data) => axios.post('/user/setCollect', data)

const getPostListByUid = (data) => axios.get('/user/post?' + qs.stringify(data))

export { userSign, updateUserInfo, changePassword, getMsg, setMsg, addCollect, getPostListByUid }
