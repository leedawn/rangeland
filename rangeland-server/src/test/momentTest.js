// const moment=require('moment')
const moment=require('moment-timezone')

const time=moment().tz('Asia/Shanghai').format('MMMM Do YYYY,h:mm:ss a')
console.log(time)