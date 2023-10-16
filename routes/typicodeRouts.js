const {Router} = require('express')
const typicodeController = require('../controller/typicodeController')
const authentication = require('../middleware/authenticateToken')

const router = Router()

router.get('/posts',authentication, typicodeController.posts)

module.exports = router