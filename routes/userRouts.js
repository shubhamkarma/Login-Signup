const {Router} = require('express')
const userController = require('../controller/userController')
const authentication = require('../middleware/authenticateToken')
const isAdmin = require('../middleware/isAdmin')

const router = Router()

router.post('/signup',userController.signup)
router.get('/login',userController.login)
router.get('/alluser',authentication, isAdmin, userController.allUser)
router.post('/createpost',authentication,userController.createPost)
router.get('/postbyuser',authentication,userController.postByUser)

module.exports = router