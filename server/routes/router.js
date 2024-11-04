const express = require('express')
const {getAllData, login, register} = require('../controllers/controller')

const router = express.Router()

router.route('/products').get(getAllData)

//for login and register
router.route('/register').post(register)
router.route('/login').post(login)


module.exports = router