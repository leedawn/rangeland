import config from '@/config'
import defaultImg from '@/assets/test.png' // 使用相对路径导入图片

const addPicURL = (data) => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? config.baseUrl.pro
      : config.baseUrl.dev
  data = baseUrl + data
  var ImgObj = new Image()
  ImgObj.src = data
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return data
  } else {
    return defaultImg
  }
}

export default addPicURL
