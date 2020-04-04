const { checkCode, getJWTPayload } = require('../common/Utils')
// const User = require('../model/User')
const Comments = require('../model/Comments')
const Post = require('../model/Post')

async function addComment (ctx) {
    const { body } = ctx.request
    console.log("addComment -> body", body)
    const sid = body.sid
    const code = body.code
    const result = await checkCode(sid, code)
    if (result) {
        const newComments = new Comments(body)
        const obj = await getJWTPayload(ctx.header.authorization)
        newComments.cuid = obj._id

        const post = await Post.findOne({ _id: body.tid })
        newComments.uid = post.uid
        const comment = await newComments.save()
        // const num = await Comments.getTotal(post.uid)

        const updatePostresult = await Post.updateOne({ _id: body.tid }, { $inc: { answer: 1 } })

        // const user = await User.findById({ _id: obj._id })
        // if(user.favs<body.fav) {
        //     ctx.body = {
        //         code:501,
        //         msg:'积分不足'
        //     }
        //     return 
        // } else {
        //     await User.updateOne({_id:obj._id},{$inc:{favs:-body.fav}})
        // }

        if (comment._id && updatePostresult.ok === 1) {
            ctx.body = {
                code: 200,
                msg: '成功发表评论',
                date: comment
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '评论失败'
            }
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
    console.log('getComments')
    const params = ctx.query
    const tid = params.tid
    console.log("getComments -> tid", tid)
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
    const total = await Comments.queryCount(tid)
    console.log("getComments -> total", total)
    ctx.body = {
        code: 200,
        total,
        data: result,
        msg: '查询成功'
    }
}

module.exports = { addComment, getComments }