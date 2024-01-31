const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.get('/', userCtrl.show)

// Create Route
router.post('/anime', userCtrl.create);

// Delete Route
router.delete('/anime', userCtrl.remove)

// Update Route
router.put('/anime', userCtrl.update)

module.exports = router