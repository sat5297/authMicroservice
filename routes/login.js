const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.route('/login')
        .get(loginController.loginEmployee)

router.route('/logout')
        .post(loginController.logoutEmployee)

router.route('/register')
        .post(loginController.registerEmployee)

router.route('/update')
        .patch(loginController.updatePassword)

router.route('/delete')
        .delete(loginController.deleteEmployee)

module.exports = router;