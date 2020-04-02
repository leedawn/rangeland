const { checkCode, getJWTPayload } = require('../common/Utils')
const User = require('../model/User')
const Comments = require('../model/Comments')

async function addComment (ctx) {
    const { body } = ctx.request
    console.log("addComment -> body", body)
    const sid = body.sid
    const code = body.code
    const result = await checkCode(sid, code)
    if (result) {
        const obj = await getJWTPayload(ctx.header.authorization)
        const user = await User.findById({ _id: obj._id })
        console.log("addPost -> user", user)
        // if(user.favs<body.fav) {
        //     ctx.body = {
        //         code:501,
        //         msg:'积分不足'
        //     }
        //     return 
        // } else {
        //     await User.updateOne({_id:obj._id},{$inc:{favs:-body.fav}})
        // }
        const newComments = new Comments(body)
        newComments.uid = obj._id
        const result = await newComments.save()
        ctx.body = {
            code: 200,
            msg: '成功发表评论',
            date: result
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '图片验证码验证失败'

        }
    }
}

// 获取评论列表
async function getComments (ctx) {
    const params = ctx.query
    const tid = params.tid
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    let result = await Comments.getCommentsList(tid, page, limit)
    console.log("getComments -> result", result)
    // 判断用户是否登录，已登录的用户才去判断点赞信息
    // let obj = {}
    // if (typeof ctx.header.authorization !== 'undefined') {
    //     obj = await getJWTPayload(ctx.header.authorization)
    // }
    // if (typeof obj._id !== 'undefined') {
    //     result = result.map(item => item.toJSON())
    //     for (let i = 0; i < result.length; i++) {
    //         let item = result[i]
    //         item.handed = '0'
    //         const commentsHands = await CommentsHands.findOne({ cid: item._id, uid: obj._id })
    //         if (commentsHands && commentsHands.cid) {
    //             if (commentsHands.uid === obj._id) {
    //                 item.handed = '1'
    //             }
    //         }
    //     }
    // }
    const total = await Comment.queryCount(tid)
    console.log("getComments -> total", total)
    ctx.body = {
        code: 200,
        total,
        data: result,
        msg: '查询成功'
    }
}

module.exports = { addComment, getComments }