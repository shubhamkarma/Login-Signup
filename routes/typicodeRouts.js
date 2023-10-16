const {Router} = require('express')
const typicodeController = require('../controller/typicodeController')

const router = Router()

router.get('/posts', typicodeController.posts)

module.exports = router