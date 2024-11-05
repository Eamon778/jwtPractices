const express = require('express')
const {getAllData, login, register, newAccessToken} = require('../controllers/controller')

const router = express.Router()

router.route('/products').get(getAllData)

//for login and register
router.route('/register').post(register).get((req, res)=>{
    res.status(200).json({message:"all okay"})
})
router.route('/login').post(login)
router.route('/refresh-token').post(newAccessToken)


module.exports = router