const redisConfig = require('../config/RedisConfig')
const config = require('../config/index')
const jwt = require('jsonwebtoken')

var getJWTPayload = function (token) {
    console.log("secret->secret", token.split('')[1])
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET)
}

async function checkCode (key, value) {
    const redisData = await redisConfig.getValue(key)
    if (redisData != null) {
        if (redisData.toLowerCase() === value.toLowerCase()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

// exports.getJWTPayload = getJWTPayload;
// exports.checkCode = checkCode;
module.exports={getJWTPayload,checkCode}