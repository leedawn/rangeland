const send = require('../config/MailConfig.js')
const bcrypt = require('bcrypt')
const moment = require('dayjs')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../config/index')
// const checkCode=require('../common/Utils')
const Utils = require('../common/Utils')
const User = require('../model/User')

const forget = function (ctx) {
    const { body } = ctx.request
    if (typeof body.username !== 'undefined') {
        try {
            let result = send({
                code: '1234',
                expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                email: body.username,
                user: 'echo',
            })
            ctx.body = {
                code: 200,
                data: result,
                msg: '邮件发送成功'
            }
        } catch (e) {
            console.log(e)
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '服务器异常'
        }
    }
}
async function login (ctx) {
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    let result = await Utils.checkCode(sid, code)
    console.log(result)
    if (result) {
        let checkUserPasswd = false
        let user = await User.findOne({ username: body.username })
        if (await bcrypt.compare(body.password, user.password)) {
            checkUserPasswd = true
        }
        if (checkUserPasswd) {
            const userObj = user.toJSON()
            const arr = ['password'] //和源码有不同，这里没有删除邮箱了。
            arr.map((item) => {
                delete userObj[item]
            })
            let token = jsonwebtoken.sign({ _id: userObj._id }, config.JWT_SECRET, { expiresIn: '1d' }) //
            ctx.body = {
                code: 200,
                data: userObj,
                token: token
            }
        } else {
            ctx.body = {
                code: 404,
                msg: '用户名或密码错误'
            }
        }
    } else {
        ctx.body = {
            code: 401,
            msg: '图片验证码不正确，请检查！'
        }
    }
}

async function reg (ctx) {
    const { body } = ctx.request
    console.log("reg -> body", body)
    let sid = body.sid
    let code = body.code
    let msg = {}
    let result = await Utils.checkCode(sid, code)
    console.log("result:" + result)
    let check = true
    if (result) {
        let user1 = await User.findOne({ username: body.username })
        if (user1 !== null && typeof user1.username !== 'undefined') {
            console.log("user1" + user1)
            msg.username = ['此邮箱已经被注册，可以通过邮箱找回密码']
            check = false
        }
        check = true
        let user2 = await User.findOne({ name: body.name })
        if (user2 !== null && typeof user2.name !== 'undefined') {
            msg.name = ['此昵称已经被注册，请修改']
            check = false
        }
        if (check) {
            body.password = await bcrypt.hash(body.password, 5)
            let user = new User({
                username: body.username,
                name: body.name,
                password: body.password,
                created: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            let result = await user.save()
            ctx.body = {
                code: 200,
                data: result,
                msg: '注册成功'
            }
            return
        }
    } else {
        msg.code = ['验证码已经失效，请重新获取！']
    }
    ctx.body = {
        code: 500,
        msg: msg
    }
}

async function reset (ctx) {
    const { body } = ctx.request
    console.log("reset -> body", body, body.username)
    let sid = body.sid
    let code = body.code
    let msg = {}
    const result = await Utils.checkCode(sid, code)
    if (result) {
        let user = await User.findOne({ username: body.username })
        if (user === null && user.username === 'undefined') {
            msg.username = ['此邮箱未注册，请确认']
            ctx.body = {
                code: 500,
                msg: msg
            }
        } else {
            user.password = await bcrypt.hash(body.password, 5)
            user.updated=moment().format('YYYY-MM-DD HH:mm:ss')
            let result = await user.save()
            const userObj = result.toJSON()
            const arr = ['password'] 
            arr.map((item) => {
                delete userObj[item]
            })
            let token = jsonwebtoken.sign({ _id: userObj._id }, config.JWT_SECRET, { expiresIn: '1d' }) //
            ctx.body = {
                code: 200,
                data: userObj,
                token: token,
                msg:'更新密码成功！'
            }
        }
    } else {
        ctx.body = {
            code: 401,
            msg: '图片验证码不正确，请检查！'
        }
    }
}

module.exports = { forget, login, reg, reset }