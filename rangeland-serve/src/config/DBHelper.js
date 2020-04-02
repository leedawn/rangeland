const mongoose = require('mongoose')
// const config = require('./index')

mongoose.set('useCreateIndex',true)

const DB_URL='mongodb://echo:123456@47.99.202.255:27018/testdb'
const REDIS = {
    host: '47.99.202.255',
    port: 27017,
    password: '123456'
}

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to '+DB_URL);
})

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: '+err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
})

module.exports=mongoose