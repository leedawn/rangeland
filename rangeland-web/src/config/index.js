const isDev = process.env.NODE_ENV === 'development'
export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    mock: 'http://localhost:36742',
    pro: 'http://47.99.202.255:3000'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : '47.99.202.255',
    port: isDev ? '3001' : 3001
  }
}
