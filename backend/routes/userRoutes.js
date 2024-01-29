const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.get('/', userCtrl.show)

// Create Route
router.post('/anime', userCtrl.create);

// Delete Route
router.delete('/anime', userCtrl.remove)

module.exports = router