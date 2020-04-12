const path = require('path')

const DB_URL = 'mongodb://test:123456@47.99.202.255:15001/testdb'
const REDIS = {
    host: '47.99.202.255',
    port: 15001,
    password: '123456'
}
const baseUrl = process.env.NODE_ENV === 'production' ? 'none' : 'http://localhost:8080'
const uploadPath = process.env.NODE_ENV === 'production' ? '/app/public' : path.join(path.resolve(__dirname), '../../public')
const JWT_SECRET = 'onedaythisismyfuture'  // 本来是一个编码后的值，这里使用了随机写的字母
// export default {
//     DB_URL,
//     REDIS
// }
const wsPort = 3001

module.exports = { DB_URL, REDIS, uploadPath, JWT_SECRET, baseUrl, wsPort }