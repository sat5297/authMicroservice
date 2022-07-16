const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.route('/login')
        .post(loginController.loginEmployee)

router.route('/logout')
        .post(loginController.logoutEmployee)

router.route('/register')
        .post(loginController.registerEmployee)

router.route('/update')
        .post(loginController.updatePassword)

router.route('/delete')
        .post(loginController.deleteEmployee)

module.exports = router;