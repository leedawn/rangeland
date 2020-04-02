const Router=require('koa-router')
const contentController=require('../../api/ContentController')

const router=new Router()
router.prefix('/content')

router.post('/upload',contentController.uploadImg)

router.post('/add',contentController.addPost)
module.exports=router