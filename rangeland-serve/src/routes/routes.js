// import combineRoutes from 'koa-combine-routers'

// const moduleFiles = require.context('./modules', true, /\.js$/)

// const modules = moduleFiles.keys().reduce((items, path) => {
//     const value = moduleFiles(path)
//     items.push(value.default)
//     return items
// }, [])

// export default combineRoutes(modules)


const combineRoutes=require('koa-combine-routers')
const publicRoutes=require('./modules/publicRouter')
const userRoutes=require('./modules/userRouter')
const loginRoutes=require('./modules/loginRouter')
const contentRouter=require('./modules/contentRouter')
const commentRouter=require('./modules/commentRouter')

module.exports=combineRoutes(
    publicRoutes,
    loginRoutes,
    userRoutes,
    contentRouter,
    commentRouter
)