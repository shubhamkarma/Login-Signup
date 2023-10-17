const {Router} = require('express')
const typicodeController = require('../controller/typicodeController')
const authentication = require('../middleware/authenticateToken')

const router = Router()

router.get('/posts', typicodeController.posts)

module.exports = router