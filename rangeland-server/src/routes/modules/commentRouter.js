const Router=require('koa-router')
const { addComment }=require('../../api/CommentController')

const router=new Router()

router.prefix('/comments')
router.post('/reply',addComment)

module.exports=router