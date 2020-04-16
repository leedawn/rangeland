// for es5: const => var

const redis = require("redis")
// import redis from 'redis'
// const config = require("./index")
var Promise = require('bluebird')

var DB_URL='mongodb://test:123456@47.99.202.255:15001/testdb'
var REDIS = {
    host: '47.99.202.255',
    port: 15001,
    password: '123456'
}

var options = {
    host: REDIS.host,
    port: REDIS.port,
    password: REDIS.password,
    detect_buffers: true,
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
}

const client = Promise.promisifyAll(redis.createClient(options))
// const client = redis.createClient(options)

client.on('error', function (err) {
    console.log('Redis Client Error:' + err)
})

function setValue (key, value, time) {
    if (typeof value === 'undefined' || value == null || value === ''){
        return
    }
    if (typeof value === 'string') {
        if(typeof time !== 'undefined') {
            client.set(key,value,'EX',time)
        } else {
            client.set(key,value)
        }
    } else if (typeof value === 'object'){
        Object.keys(value).forEach((item) => {
            client.hset(key, item, value[item], redis.print)
        })
    }
}

// setValue('id','24')

function getValue (key) {
    return client.getAsync(key)
}

var getHValue = (key) => {
    return client.hgetallAsync(key)
}

var delValue = (key) => {
    client.del(key, (err, res) => {
        if (res===1){
            console.log('delete successfully');
        } else {
            console.log('delete redis key error:' + err)
        }
    })
}

// export {
//     client,
//     setValue,
//     getValue,
//     getHValue,
//     delValue
// }
module.exports={client,setValue,getValue,getHValue,delValue}