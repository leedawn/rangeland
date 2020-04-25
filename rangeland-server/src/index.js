const koa = require('koa')
const helmet = require('koa-helmet')
const statics = require('koa-static')
const cors = require('@koa/cors')
const JWT = require('koa-jwt')
const compress = require('koa-compress')
const path = require('path')
const koaBody = require('koa-body')
const jsonutil = require('koa-json')
const compose = require('koa-compose')

const router = require('./routes/routes')
const config = require('./config/index')
const errorHandle = require('./common/ErrorHandle')
const WebSocketServer = require('./config/WebSocket')

const app = new koa()
const ws = new WebSocketServer()

ws.init()
global.ws = ws
const isDevMode = process.env.NODE_ENV === 'production' ? false : true

//除了公共路径，其他路径都需要鉴权
const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /^\/login/, /^\/img/] })

const middleware = compose([
    koaBody({
        multipart: true,
        formidable: {
            keepExtensions: true,
            maxFieldsSize: 5 * 1024 * 1024
        },
        onError: err => {
            console.log('koabody TCL:err', err)
        }
    }),
    statics(path.join(__dirname, '../public')),
    statics('/app/public'),  //服务器获取静态文件
    cors(),
    jsonutil({ pretty: false, param: 'pretty' }),
    helmet(),
    errorHandle,
    jwt
])

if (!isDevMode) {
    app.use(compress())
}
app.use(middleware)
// app.use(statics(path.join(__dirname,'../public')))
app.use(router())

app.listen(3000)