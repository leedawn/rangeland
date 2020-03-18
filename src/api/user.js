import axios from '@/util/request'

const userSign = () => axios.get('/user/fav')

const updateUserInfo = (data) => axios.post('/user/basic', data)

export { userSign, updateUserInfo }
