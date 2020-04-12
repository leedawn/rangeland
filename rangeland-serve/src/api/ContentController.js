// import Post from '../model/Post'
const Post = require('../model/Post')
const config = require('../config/index')
const User = require('../model/User')
// const Comments = require('../model/Comments')
const { checkCode, getJWTPayload } = require('../common/Utils')
const UserCollect = require('../model/UserCollect')

const moment = require('dayjs')
const mkdir = require('make-dir')
const uuid = require("uuid/v4")
const fs = require('fs')

async function getPostList (ctx) {
    // const post = new Post({
    //     uid:'5e6db4551418c95ecec41ac8',  //现在插入需要 uid ，之前不知道是怎么插入成功的
    //     title:'test title5',
    //     content:'test content 1',
    //     catalog:'share',
    //     fav:20,
    //     isEnd:'0',
    //     reads:'0',
    //     answer:'0',
    //     status:'0',
    //     isTop:'0',
    //     sort:'0',
    //     tags:[{
    //         name:'精华',
    //         class: ''
    //     }]
    // })
    // const tmp=await post.save()
    // console.log("module.exports -> tmp", tmp)


    const body = ctx.query
    const sort = body.sort ? body.sort : 'created'
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.limit ? parseInt(body.limit) : 20
    const options = {}

    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
        options.catalog = body.catalog
    }
    if (typeof body.isTop !== 'undefined') {
        options.isTop = body.isTop
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
        options.isEnd = body.status
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
        options.tags = { $elemMatch: { name: body.tag } }
    }
    // const result = await Post.getList(options, sort, page, limit)
    // const result = Post.getList(options, sort, page, limit)
    const result = await Post.getList(options, sort, page, limit)
    console.log(result)

    ctx.body = {
        code: 200,
        data: result,
        msg: '获取文章列表成功'
    }
}

async function uploadImg (ctx) {
    const file = ctx.request.files.file
    console.log("uploadImg -> file", file)
    const ext = file.name.split('.').pop() //删除并返回最后一个元素
    const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`
    await mkdir(dir)
    const picname = uuid()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path)  //文件路径
    const upStream = fs.createWriteStream(destPath) //目标路径
    const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`  //日期/uuid.png
    reader.pipe(upStream)
    ctx.body = {
        code: 200,
        msg: '图片上传成功',
        data: filePath
    }
}

async function addPost (ctx) {
    const { body } = ctx.request
    console.log("addPost -> body", body)
    const sid = body.sid
    const code = body.code
    const result = await checkCode(sid, code)
    if (result) {
        const obj = await getJWTPayload(ctx.header.authorization)
        const user = await User.findById({ _id: obj._id })
        console.log("addPost -> user", user)
        if (user.favs < body.fav) {
            ctx.body = {
                code: 501,
                msg: '积分不足'
            }
            return
        } else {
            await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.fav } })
        }
        const newPost = new Post(body)
        newPost.uid = obj._id
        const result = await newPost.save()
        ctx.body = {
            code: 200,
            msg: '成功保存的文章',
            date: result
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '图片验证码验证失败'

        }
    }
}

async function getPostDetail (ctx) {
    const params = ctx.query
    if (!params.tid) {
        ctx.body = {
            code: 500,
            msg: '文章id为空'
        }
        return
    }
    const post = await Post.findByTid(params.tid)
    let isFav = 0
    if (
        typeof ctx.header.authorization !== 'undefined' && ctx.header.authorization !== ''
    ) {
        const obj = await getJWTPayload(ctx.header.authorization)
        const userCollect = await UserCollect.findOne({
            uid: obj._id,
            tid: params.tid
        })
        if (userCollect && userCollect.tid) {
            isFav = 1
        }
    }
    const newPost = post.toJSON()
    newPost.isFav = isFav
    const result = await Post.updateOne(
        { _id: params.tid },
        { $inc: { reads: 1 } }
    )
    if (post._id && result.ok === 1) {
        ctx.body = {
            code: 200,
            data: newPost,
            msg: '查询文章详情成功'
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '获取文章详情失败'
        }
    }
}

async function getPostListByUid(ctx){
    const params=ctx.query
    const page=params.page?parseInt(params.page):0
    const limit=params.limit?parseInt(params.limit):20
    const obj=await getJWTPayload(ctx.header.authorization)
    const userId=obj._id

    const result=await Post.getListByUid(userId,page,limit)
    const nums=await Post.countByUid(userId)

    if(result.length>=0){
        ctx.body={
            code:200,
            data:result,
            nums,
            msg:'成功获取用户的文章列表'
        }
    } else {
        ctx.body={
            code:500,
            msg:'无法获取用户的文章'
        }
    }
}

async function deletePostByUid(){

}


module.exports = { getPostList, uploadImg, addPost, getPostDetail, getPostListByUid,deletePostByUid }