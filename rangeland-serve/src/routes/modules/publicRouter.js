const Router=require('koa-router')
const publicController=require('../../api/PublicController')
const contentController=require('../../api/ContentController')
const commentController=require('../../api/CommentController')

const router=new Router()

router.prefix('/public')
router.get('/getCaptcha',publicController)

router.get('/list', contentController.getPostList)

router.get('/content/detail',contentController.getPostDetail)

router.get('/comments',commentController.getComments)

module.exports=router