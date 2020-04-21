import config from '@/config'
const addPicURL = (data) => {
  const baseUrl =
        process.env.NODE_ENV === 'production'
          ? config.baseUrl.pro
          : config.baseUrl.dev
  data = baseUrl + data
  return data
}

export default addPicURL
