const Router=require('koa-router')
const loginController=require('../../api/LoginController')

const router=new Router()

router.prefix('/login')
// router.post('/forget',loginController.forget)
router.post('/login',loginController.login)
router.post('/reg',loginController.reg)
router.post('/forget',loginController.forget)
router.post('/reset',loginController.reset)

module.exports= router