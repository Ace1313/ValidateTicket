const { Router } = require('express');
const router = new Router();

const { login, getLoginStatus } = require('../controller/authController');
const { user } = require('../middleware/auth');

router.post('/admin', login);
router.get('/loggedin', user, getLoginStatus);

module.exports = router;
