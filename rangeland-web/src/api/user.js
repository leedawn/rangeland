import axios from '@/util/request'

const userSign = () => axios.get('/user/fav')

const updateUserInfo = (data) => axios.post('/user/basic', data)

const changePassword = (data) => axios.post('/user/changePassword', data)

export { userSign, updateUserInfo, changePassword }
