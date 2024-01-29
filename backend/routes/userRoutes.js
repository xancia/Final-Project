const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.get('/', userCtrl.show)

// Create Route
router.post('/anime', userCtrl.create);

module.exports = router