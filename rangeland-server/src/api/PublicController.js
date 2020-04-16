const svgCaptcha=require('svg-captcha')
const redisConfig=require('../config/RedisConfig')
// const redisConfig=require('@/config/RedisConfig')
// import svgCaptcha from 'svg-captcha'     es6


// class PublicController{
//     constructor() {}
//     async getCaptcha(ctx) {
//         const body = ctx.request.query
//         console.log(body.sid)
//         const newCaptcha=svgCaptcha.create({
//             size: 4,
//             ignoreChars: '0olil',
//             color: true,
//             noise: Math.floor(Math.random() * 5),
//             width: 150,
//             height: 50
//         })
//         // console.log(newCaptcha)
//         ctx.body={
//             code: 200,
//             data: newCaptcha.data,
//         }
//     }
// }
module.exports=function(ctx){
    const body = ctx.request.query
    console.log(body.sid)
    const newCaptcha=svgCaptcha.create({
        size: 4,
        ignoreChars: '0olil',
        color: true,
        noise: Math.floor(Math.random() * 5),
        width: 150,
        height: 50
    })
    // console.log(newCaptcha)
    redisConfig.setValue(body.sid, newCaptcha.text,10 * 60) //save for 10m
    // redisConfig.getValue(body.sid).then((res) => {
    //     console.log(res)
    // })
    ctx.body={
        code:200,
        data:newCaptcha.data,
    }
}