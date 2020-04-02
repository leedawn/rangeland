const Router = require("koa-router")
const { userSign, updateUserInfo, changePassword } = require('../../api/UserController')

const router = new Router()
router.prefix('/user')
router.get('/fav', userSign)

router.post('/basic', updateUserInfo)
router.post('/changePassword', changePassword)

// router.get('/account',userController.userAccount)
// router.get('/permission',userController.userPermission)

module.exports = router