const redisConfig = require('../config/RedisConfig')
const config = require('../config/index')
const jwt = require('jsonwebtoken')

var getJWTPayload = function (token) {
    console.log("secret->secret", token.split('')[1])
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET)
}

async function checkCode (key, value) {
    console.log("checkCode -> checkCode", checkCode)
    const redisData = await redisConfig.getValue(key)
    console.log("checkCode -> redisData", redisData)
    if (redisData != null) {
        debugger
        if (redisData.toLowerCase() === value.toLowerCase()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

exports.getJWTPayload = getJWTPayload;
exports.checkCode = checkCode;