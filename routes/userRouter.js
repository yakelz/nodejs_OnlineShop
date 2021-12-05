const express = require ('express');
const router = express.Router(); 
const userController = require('../controllers/userController');

router.get ('/register', userController.register_get);
router.post ('/register', userController.register_post);
router.get ('/login', userController.login_get);
router.post ('/login', userController.login_post);
router.get ('/logout', userController.logout_get);
router.post ('/logout', userController.logout_post);

module.exports = router;