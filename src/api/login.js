import axios from 'axios'

const getCode = async (sid) => {
  let result = ''
  try {
    result = await axios.get('/getCaptcha', {
      params: {
        sid: sid
      }
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}

export { getCode }
