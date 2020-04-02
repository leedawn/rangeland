// import axios from 'axios'
import axios from '@/util/request'

// const getCode = async (sid) => {
//   let result = ''
//   try {
//     result = await axios.get('/getCaptcha', {
//       params: {
//         sid: sid
//       }
//     })
//     if (result.status === 200) {
//       return result.data
//     }
//   } catch (e) {
//     console.log(e)
//   }
//   return result
// }

const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

const forget = (option) => {
  return axios.post('/login/forget', {
    ...option
  })
}

const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

const reset = (option) => {
  return axios.post('/login/reset', {
    ...option
  })
}

export { getCode, forget, login, reg, reset }
