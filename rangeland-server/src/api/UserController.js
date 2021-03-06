const SignRecord = require('../model/SignRecord')
const User = require('../model/User')
const Utils = require('../common/Utils')
const { setValue } = require('../config/RedisConfig')
const { send } = require('../config/MailConfig')
const config = require('../config/index')
const { getJWTPayload } = require('../common/Utils')
const Comments = require('../model/Comments')
const UserCollect = require('../model/UserCollect')

const moment = require('dayjs')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function userSign (ctx) {
    const obj = await Utils.getJWTPayload(ctx.header.authorization)
    const record = await SignRecord.findByUid(obj._id)
    console.log("userSign -> record", record)
    const user = await User.findByID(obj._id)
    let newRecord = {}
    let result = ''
    record.created = '2020-03-14T02:54:41.000Z'
    if (record !== null) {
        if (moment(record.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            ctx.body = {
                code: 500,
                favs: user.favs,
                count: user.count,
                lastSign: record.created,
                msg: '用户已经签到'
            }
            return
        } else {
            let count = user.count
            console.log("userSign -> count", count)
            let fav = 0
            if (moment(record.created).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
                count += 1
                if (count < 5) {
                    fav = 5
                } else if (count >= 5 && count < 15) {
                    fav = 10
                } else if (count >= 15 && count < 30) {
                    fav = 15
                } else if (count >= 30 && count < 100) {
                    fav = 20
                } else if (count >= 100 && count < 365) {
                    fav = 30
                } else if (count >= 365) {
                    fav = 50
                }
                await User.updateOne(
                    { _id: obj._id },
                    { $inc: { favs: fav, count: 1 } }
                )
                result = {
                    favs: user.favs + fav,
                    count: user.count + 1
                }
            } else {
                fav = 5
                await User.updateOne(
                    { _id: obj._id },
                    {
                        $set: { count: 1 },
                        $inc: { favs: fav }
                    }
                )
                result = {
                    favs: user.favs + fav,
                    count: 1
                }
            }
            newRecord = new SignRecord({
                uid: obj._id,
                favs: fav
            })
            await newRecord.save()
        }
    } else {
        await User.updateOne({
            _id: obj._id
        },
            {
                $set: { count: 1 },
                $inc: { favs: 5 }
            })
        newRecord = new SignRecord({
            uid: obj._id,
            favs: 5
            // lastSign: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        await newRecord.save()
        result = {
            favs: user.favs + 5,
            count: 1
        }
    }
    ctx.body = {
        code: 200,
        msg: '请求成功',
        ...result,
        lastSign: newRecord.created
    }
}

async function updateUserInfo (ctx) {
    const { body } = ctx.request
    const obj = await Utils.getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id })
    let msg = ''
    if (body.username && body.username !== user.username) {
        const tmpUser = await User.findOne({ username: body.username })
        console.log("updateUserInfo -> tmpUser", tmpUser)
        if (tmpUser && tmpUser.password) {
            ctx.body = {
                code: 501,
                msg: '邮箱已经注册'
            }
            return
        }
        const key = uuid()
        setValue(
            key,
            jwt.sign({ _id: obj._id }, config.JWT_SECRET, {
                expiresIn: '30m'
            })
        )
        await send({
            type: 'email',
            data: {
                key: key,
                username: body.username
            },
            code: '',
            expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
            email: user.username,
            user: user.name
        })
        msg = '更新基本资料成功，账号修改需要邮件确认，请查收邮件'
    }
    const arr = ['username', 'mobile', 'password']
    arr.map(item => {
        delete body[item]
    })
    const result = await User.updateOne({ _id: obj._id }, body)
    console.log("result", result)
    if (result.n === 1 && result.ok === 1) {
        ctx.body = {
            code: 200,
            msg: msg === '' ? '更新成功' : msg
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '更新失败'
        }
    }
}

async function changePassword (ctx) {
    const { body } = ctx.request
    console.log("changePassword -> body", body)
    const obj = await Utils.getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id })
    console.log("changePassword -> user", user)
    let msg = ''
    if (await bcrypt.compare(body.oldPassword, user.password)) {
        body.newPassword = await bcrypt.hash(body.newPassword, 5)
        console.log("changePassword ->  body.newPassword", body.newPassword)
        const result = await User.updateOne({ _id: obj._id }, { password: body.newPassword })
        console.log("result", result)
        if (result.n === 1 && result.ok === 1) {
            ctx.body = {
                code: 200,
                msg: msg === '' ? '更新成功' : msg
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新失败'
            }
        }
    } else {
        ctx.body = {
            code: 501,
            msg: '原来的密码填写错误'
        }
        return
    }

}

async function getMsg (ctx) {
    const params = ctx.query
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0

    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await Comments.getMsgList(obj._id, page, limit)
    const num = await Comments.getTotal(obj._id)

    console.log("getMsg -> result", result)

    ctx.body = {
        code: 200,
        data: result,
        total: num
    }
}

async function setMsg (ctx) {
    const params = ctx.query
    if (params.id) {
        const result = await Comments.updateOne(
            { _id: params.id },
            { isRead: '1' }
        )
        if (result.ok === 1) {
            ctx.body = {
                code: 200
            }
        }
    } else {
        const obj = await getJWTPayload(ctx.header.authorization)
        const result = await Comments.updateMany(
            { uid: obj._id },
            { isRead: '1' }
        )
        if (result.ok === 1) {
            ctx.body = {
                code: 200
            }
        }
    }
}

async function addCollect (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    if (body.isFav) {
        await UserCollect.deleteOne({ uid: obj._id, tid: body.tid })
        ctx.body = {
            code: 200,
            msg: '帖子已经取消收藏！'
        }
    } else {
        const userCollect = new UserCollect({
            uid: obj._id,
            tid: body.tid,
            title: body.title
        })
        const result = await userCollect.save()
        if (result.uid) {
            ctx.body = {
                code: 200,
                msg: '帖子收藏成功！'
            }
        }

    }
}

async function getCollectByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const userId = obj._id
    const page = parseInt(params.page)
    const limit = parseInt(params.limit)
    const results = await UserCollect.getListByUid(userId, page, limit)
    const nums = await UserCollect.countByUid(obj._id)
    if (results.length > 0) {
        ctx.body = {
            code: 200,
            data: results,
            nums,
            msg: '查询收藏的帖子成功'
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '查询失败'
        }
    }
}


module.exports = { userSign, updateUserInfo, changePassword, getMsg, setMsg, addCollect, getCollectByUid }