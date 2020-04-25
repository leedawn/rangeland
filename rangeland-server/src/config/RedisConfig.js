const redis = require("redis")
// import redis from 'redis'
const config = require("./index")
var Promise = require('bluebird')

var options = {
    host: config.REDIS.host,
    port: config.REDIS.port,
    password: config.REDIS.password,
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

module.exports={client,setValue,getValue,getHValue,delValue}