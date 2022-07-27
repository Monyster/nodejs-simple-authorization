const Router = require('express')
const router = new Router();
const controller = require('../Controllers/authController')
const { check } = require('express-validator')

router.post('/registration', [
    check('username', 'Field username cant be empty').notEmpty(),
    check('password', 'Password >4 and <16').isLength({ min: 4, max: 16 })
], controller.registration)

router.post('/login', controller.login)

router.get('/users', controller.getUsers)

module.exports = router
