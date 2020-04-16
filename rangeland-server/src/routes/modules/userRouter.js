const Router = require("koa-router")
const { userSign, updateUserInfo, changePassword, getMsg, setMsg, addCollect, getCollectByUid } = require('../../api/UserController')
const { getPostListByUid, deletePostByUid } = require('../../api/ContentController')

const router = new Router()
router.prefix('/user')
router.get('/fav', userSign)

router.post('/basic', updateUserInfo)
router.post('/changePassword', changePassword)

router.get('/getMsg', getMsg)
router.get('/setMsg', setMsg)

router.get('/post', getPostListByUid)
router.post('/deletePost', deletePostByUid)

router.post('/setCollect', addCollect)
router.get('/collect', getCollectByUid)

// router.get('/account',userController.userAccount)
// router.get('/permission',userController.userPermission)

module.exports = router